import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

console.log("API Key:", process.env.GEMINI_API_KEY ? "Set" : "Not set");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    console.log("Attempting to list models...");
    const models = await genAI.listModels();
    console.log("Available models:");
    for (const model of models.models) {
      console.log(`- ${model.name}`);
    }
  } catch (error) {
    console.error("Error:", error.message);
    console.error("Full error:", error);
  }
  process.exit(0);
}

listModels();
