import express from "express";
import { prisma } from "../../config/prisma";
import { auth } from "../../middleware/auth";
import { getIO } from "../../socket";
import { sendAdminWhatsApp } from "../whatsapp/whatsapp.service";

const router = express.Router();

//
// CREATE BOOKING
//
router.post("/", auth, async (req: any, res) => {
  try {
    const {
      slotId,
      companyName,
      round,
      hrName,
      hrPhone,
      hrEmail,
    } = req.body;

    //
    // VALIDATION
    //
    if (
      !slotId ||
      !companyName ||
      !round ||
      !hrName ||
      !hrPhone ||
      !hrEmail
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //
    // TRANSACTION
    //
    const result = await prisma.$transaction(
      async (tx) => {
        //
        // CLAIM SLOT
        //
        const updatedSlotResult =
          await tx.slot.updateMany({
            where: {
              id: slotId,
              isBooked: false,
            },
            data: {
              isBooked: true,
            },
          });

        if (updatedSlotResult.count === 0) {
          throw new Error(
            "SLOT_ALREADY_TAKEN"
          );
        }

        //
        // GET SLOT
        //
        const slot =
          await tx.slot.findUnique({
            where: {
              id: slotId,
            },
          });

        if (!slot) {
          throw new Error(
            "SLOT_NOT_FOUND"
          );
        }

        //
        // CREATE BOOKING
        //
        const booking =
          await tx.booking.create({
            data: {
              userId:
                req.user.id,

              slotId,

              companyName,

              round,

              hrName,

              hrPhone,

              hrEmail,
            },
          });

        //
        // GET USER
        //
        const user =
          await tx.user.findUnique({
            where: {
              id: req.user.id,
            },
          });

        return {
          booking,
          slot,
          user,
        };
      }
    );

    //
// SEND WHATSAPP
//
if (result.user) {
  try {
    await sendAdminWhatsApp({
      candidateName: result.user.name,

      candidateEmail: result.user.email,

      companyName,

      round,

      hrName,

      hrPhone,

      hrEmail,

      interviewDate:
        result.slot.startTime.toLocaleDateString(
          "en-IN"
        ),

      interviewTime: `${result.slot.startTime.toLocaleTimeString(
        "en-IN",
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      )} - ${result.slot.endTime.toLocaleTimeString(
        "en-IN",
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      )}`,
    });

    console.log(
      "WhatsApp notification sent successfully"
    );
  } catch (whatsappError) {
    console.error(
      "WhatsApp Error:",
      whatsappError
    );
  }
}
    //
    // SOCKET EVENT
    //
    getIO().emit(
      "slot_booked",
      {
        slotId,
      }
    );

    //
    // RESPONSE
    //
    return res.status(201).json({
      success: true,
      message:
        "Slot booked successfully",
      booking:
        result.booking,
    });
  } catch (error: any) {
    if (
      error.message ===
      "SLOT_ALREADY_TAKEN"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "This slot has already been booked by another user.",
      });
    }

    if (
      error.message ===
      "SLOT_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message:
          "Slot not found",
      });
    }

    console.error(
      "Booking Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Booking failed due to an internal server error",
    });
  }
});

//
// GET USER BOOKINGS
//
router.get(
  "/",
  auth,
  async (req: any, res) => {
    try {
      const bookings =
        await prisma.booking.findMany({
          where: {
            userId:
              req.user.id,
          },

          include: {
            slot: true,
            user: true,
          },

          orderBy: {
            createdAt:
              "desc",
          },
        });

      return res.json(
        bookings
      );
    } catch (error) {
      console.error(
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch bookings",
      });
    }
  }
);

export default router;