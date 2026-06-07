// import "dotenv/config";

// import OpenAI from "openai";

// const openai =
//   new OpenAI({
//     apiKey:
//       process.env.OPENAI_API_KEY,
//   });

// async function test() {
//   try {
//     const response =
//       await openai.chat.completions.create(
//         {
//           model:
//             "gpt-4o-mini",

//           messages: [
//             {
//               role:
//                 "user",

//               content:
//                 "Hello",
//             },
//           ],
//         }
//       );

//     console.log(
//       response.choices[0]
//         .message.content
//     );
//   } catch (error) {
//     console.log(error);
//   }
// }

// test();