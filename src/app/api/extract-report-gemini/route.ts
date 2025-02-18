import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL! });

// const prompt = `Attached is an image of a clinical report. Go over the clinical report and identify biomarkers that show slight or large abnormalities. then summarize in 100 words. You may increase the word limit if the report has multiple pages. Do not output patient name, date etc. Make sure to include numerical values and key details from the report, including report title
// ## summary:`;

const prompt = `The attached image contains a clinical report. Review the report and identify biomarkers that show abnormalities, both slight and significant. Summarize the key findings in 100 words. If the report has multiple pages, you may increase the word limit. Do not include personal information such as the patient’s name or date. Ensure that numerical values and other key details from the report, including the report title, are included in the summary.

## summary:
`;

export const POST = async (req: Request) => {
  try {
    const { base64, type } = await req.json();
    if (!base64) return new Response("No file provided", { status: 400 });

    const filePart = fileToGenerativePart(base64, type);
    const generatedContent = await model.generateContent([prompt, filePart]);

    // Ensure response.text() is awaited
    const reportText = await generatedContent.response.text();

    return new Response(reportText, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response("Internal server error", { status: 500 });
  }
};

function fileToGenerativePart(base64: string, type: string) {
  return {
    inlineData: {
      data: base64.split(",")[1],
      mimeType:
        type === "pdf"
          ? "application/pdf"
          : base64.match(/:(.*?);/)?.[1] || "image/png",
    },
  };
}
