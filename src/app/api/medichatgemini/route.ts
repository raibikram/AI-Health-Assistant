import { queryPineconeVictorStore } from "@/utils/queryPineconeVictorStore";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { Pinecone } from "@pinecone-database/pinecone";

import { streamText, StreamTextResult, Message } from "ai";

// Ensure environment variables are loaded
if (!process.env.GEMINI_API_KEY || !process.env.GEMINI_MODEL) {
  throw new Error(
    "Missing GEMINI_API_KEY or GEMINI_MODEL in environment variables."
  );
}
if (!process.env.PINECONE_API_KEY) {
  throw new Error("Missing PINECONE_API_KEY in environment variables.");
}

// Initialize Gemini AI
const google = createGoogleGenerativeAI({
  baseURL: process.env.GEMINI_BASE_URL,
  apiKey: process.env.GEMINI_API_KEY,
});

const model = google(process.env.GEMINI_MODEL!);

export const POST = async (req: Request): Promise<Response> => {
  try {
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });

    const reqBody = await req.json();
    const messages: Message[] = reqBody.messages;
    const userQuestion = messages[messages.length - 1]?.content;
    const reportData: string | undefined = reqBody.data?.reportData;

    // Ensure user question and report data are present
    if (!userQuestion || !reportData) {
      return new Response(
        JSON.stringify({ error: "Missing user query or report data." }),
        { status: 400 }
      );
    }

    const searchQuery = `Represent this for searching relevant passages: 
    Patient medical report says: \n${reportData} \n\n ${userQuestion}`;

    // Query Pinecone index for relevant passages
    const retrievals = await queryPineconeVictorStore(
      pinecone,
      "index-one",
      "ns1",
      searchQuery
    );

    if (!retrievals || retrievals === "<No_Match>") {
      return new Response(
        JSON.stringify({ message: "No relevant matches found in Pinecone." }),
        { status: 200 }
      );
    }

    const finalPrompt = `
      Here is a summary of a patient's clinical report and a user query. Some generic clinical findings are also provided that may or may not be relevant for the report. 

      Carefully analyze the clinical report and answer the user's query.Use the clinical findings to enrich your response.

      **Patient's Clinical Report Summary:**\n${reportData}
      **User Query:**\n${userQuestion}
      **Generic Clinical Findings:**\n${retrievals}

      **Answer:**
    `;
    /*

Here is a summary of a patient's clinical report and a user query. Some generic clinical findings are also provided that may or may not be relevant for the report.

Carefully analyze the clinical report and answer the user's query. Use the clinical findings to enrich your response.

**Patient's Clinical Report Summary:**  
${reportData}

**User Query:**  
${userQuestion}

**Generic Clinical Findings:**  
${retrievals}

**Answer:**
*/
    // Stream response from Gemini
    const resultStream: StreamTextResult<never, never> = await streamText({
      model: model,
      prompt: finalPrompt,
    });

    // Check if the result is a valid stream
    if (resultStream) {
      // Assuming resultStream.toDataStreamResponse() is the correct method for returning a stream
      // console.log("Result stream: ", resultStream.toDataStreamResponse());
      return resultStream.toDataStreamResponse();
    } else {
      throw new Error("Failed to stream response from Gemini.");
    }
  } catch (error: any) {
    console.error("❌ Error in medichatgemini API:", error.message);

    // Enhanced error response
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        message: error.message,
        stack: error.stack, // Optionally include stack trace for debugging
      }),
      { status: 500 }
    );
  }
};
