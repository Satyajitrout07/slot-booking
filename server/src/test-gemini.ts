import "dotenv/config";

import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

const genAI =
  new GoogleGenerativeAI(
    process.env
      .GEMINI_API_KEY!
  );

const model =
  genAI.getGenerativeModel({
    model:
      "gemini-2.0-flash",
  });

async function test() {
  try {
    const result =
      await model.generateContent(
        "Hello Gemini"
      );

    console.log(
      result.response.text()
    );
  } catch (error) {
    console.log(error);
  }
}

test();