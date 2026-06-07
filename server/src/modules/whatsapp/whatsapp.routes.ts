import express from "express";
import { sendAdminWhatsApp } from "./whatsapp.service";

const router = express.Router();

router.post("/test", async (req, res) => {
  try {
    await sendAdminWhatsApp({
      name: "Test User",
      email: "test@gmail.com",
      date: "15-05-2026",
      time: "10:00 AM",
    });

    res.json({
      success: true,
      message: "WhatsApp sent successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "WhatsApp failed",
    });
  }
});

export default router;