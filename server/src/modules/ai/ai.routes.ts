import express from "express";

import { auth } from "../../middleware/auth";

import {
  bookEarliest,

  getSlots,
} from "./tools";

import {
  generateQuestions,

  generateChat,
} from "./ai.service";

const router =
  express.Router();

//
// AI CHAT
//
router.post(
  "/chat",
  auth,
  async (req: any, res) => {
    try {
      //
      // MESSAGE
      //
      const msg =
        req.body.message.toLowerCase();

      //
      // BOOK EARLIEST SLOT
      //
      if (
        msg.includes(
          "earliest"
        )
      ) {
        const result =
          await bookEarliest(
            req.user.id
          );

        return res.json({
          success: true,

          type:
            "booking",

          result,
        });
      }

      //
      // SHOW SLOTS
      //
      if (
        msg.includes("slots")
      ) {
        const slots =
          await getSlots();

        return res.json({
          success: true,

          type: "slots",

          slots,
        });
      }

      //
      // INTERVIEW QUESTIONS
      //
      if (
        msg.includes(
          "interview"
        ) ||
        msg.includes(
          "questions"
        )
      ) {
        const result =
          await generateQuestions(
            {
              role:
                req.body.message,

              experience:
                "4 years",

              company:
                "Interview Company",

              skills:
                "React, Node.js",
            }
          );

        return res.json({
          success: true,

          type: "ai",

          message:
            result,
        });
      }

      //
      // GENERAL CHAT
      //
      const response =
        await generateChat(
          req.body.message
        );

      //
      // RESPONSE
      //
      return res.json({
        success: true,

        type: "chat",

        message:
          response,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,

        message:
          "AI request failed",
      });
    }
  }
);

export default router;