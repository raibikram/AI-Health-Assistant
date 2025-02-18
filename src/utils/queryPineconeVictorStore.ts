import { Pinecone } from "@pinecone-database/pinecone";
import { HfInference } from "@huggingface/inference";

// Ensure Hugging Face API Key is available
if (!process.env.HUGGINGFACE_API_TOKEN) {
  throw new Error(
    "Hugging Face API Key is missing! Please check your .env file."
  );
}

// Initialize Hugging Face Inference with API Key from environment variables
const hf = new HfInference(process.env.HUGGINGFACE_API_TOKEN!);

export async function queryPineconeVictorStore(
  client: Pinecone,
  indexName: string,
  namespace: string,
  searchQuery: string
): Promise<string> {
  try {
    // console.log("Querying Hugging Face with:", searchQuery);
    // console.log("Using Model:", process.env.MODEL_NAME);

    // Perform feature extraction using Hugging Face
    const hfOutput = await hf.featureExtraction({
      model: process.env.MODEL_NAME,
      inputs: searchQuery,
    });

    // Ensure hfOutput is of type array
    const queryEmbedding = Array.isArray(hfOutput) ? hfOutput : [hfOutput]; // Ensure it's an array

    // Query Pinecone with metadata included
    const index = client.Index(indexName);
    const queryResponse = await index.namespace(namespace).query({
      topK: 5,
      vector: queryEmbedding as any,
      includeValues: false,
      includeMetadata: true, // Include metadata in the query response
    });

    // console.log("Pinecone Query Response:", queryResponse);

    if (queryResponse.matches.length > 0) {
      // Combine matched data for response
      const concatRetrievals = queryResponse.matches
        .map(
          (match, index) =>
            `\n Clinical Finding ${index + 1}: \n ${match.metadata?.chunk}`
        )
        .join(`\n\n`);

      // console.log("Retrieved Data:", concatRetrievals);
      return concatRetrievals;
    } else {
      return "<No_Match>";
    }
  } catch (error: any) {
    console.error("Error in queryPineconeVictorStore:", error.message);
    return JSON.stringify({
      error: "Error processing request.",
      message: error.message,
    });
  }
}
