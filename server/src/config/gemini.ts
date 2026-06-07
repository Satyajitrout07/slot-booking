import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

//
// INIT GEMINI
//
const genAI =
  new GoogleGenerativeAI(
    process.env
      .GEMINI_API_KEY!
  );

//
// MODEL
//
export const model =
  genAI.getGenerativeModel({
    model:
      "gemini-2.0-flash",
  });