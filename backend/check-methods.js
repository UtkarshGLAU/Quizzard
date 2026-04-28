import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

console.log("Methods on genAI:");
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(genAI)));

process.exit(0);
