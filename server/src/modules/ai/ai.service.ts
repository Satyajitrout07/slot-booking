import { model } from "../../config/gemini";

//
// GENERATE QUESTIONS
//
export const generateQuestions =
  async (data: any) => {
    //
    // DATA
    //
    const {
      role,
      experience,
      company,
      skills,
    } = data;

    //
    // PROMPT
    //
    const prompt = `
Generate professional interview questions.

Role: ${role}

Experience: ${experience}

Company: ${company}

Skills: ${skills}

Include:
1. Technical Questions
2. HR Questions
3. Coding Questions
4. System Design Questions

Format clearly.
`;

    //
    // GEMINI RESPONSE
    //
    const result =
      await model.generateContent(
        prompt
      );

    //
    // RETURN
    //
    return result.response.text();
  };

//
// GENERAL AI CHAT
//
export const generateChat =
  async (
    message: string
  ) => {
    //
    // PROMPT
    //
    const prompt = `
You are an expert HR interview assistant.

User Message:
${message}

Provide helpful professional guidance.
`;

    //
    // GEMINI RESPONSE
    //
    const result =
      await model.generateContent(
        prompt
      );

    //
    // RETURN
    //
    return result.response.text();
  };