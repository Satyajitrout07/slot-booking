import { prisma } from "../../config/prisma";
import { redis } from "../../config/redis";

import {
  sendAdminWhatsApp,
} from "../whatsapp/whatsapp.service";

export const bookSlot = async (
  userId: number,
  slotId: number
) => {
  //
  // CHECK LOCK
  //
  const lock =
    await redis.get(
      `slot_lock:${slotId}`
    );

  if (
    lock &&
    Number(lock) !== userId
  ) {
    throw new Error(
      "Locked"
    );
  }

  return prisma.$transaction(
    async (tx) => {
      //
      // GET SLOT
      //
      const slot =
        await tx.slot.findUnique({
          where: {
            id: slotId,
          },
        });

      if (
        !slot ||
        slot.isBooked
      ) {
        throw new Error(
          "Already booked"
        );
      }

      //
      // CREATE BOOKING
      //
      const booking =
        await tx.booking.create({
          data: {
            userId,
            slotId,
          },
        });

      //
      // UPDATE SLOT
      //
      await tx.slot.update({
        where: {
          id: slotId,
        },

        data: {
          isBooked: true,
        },
      });

      //
      // GET USER
      //
      const user =
        await tx.user.findUnique({
          where: {
            id: userId,
          },
        });

      //
      // SEND WHATSAPP
      //
      if (user) {
        try {
          await sendAdminWhatsApp({
            name:
              user.name,

            email:
              user.email,

            date:
              slot.startTime.toLocaleDateString(
                "en-IN"
              ),

            time:
              slot.startTime.toLocaleTimeString(
                "en-IN",
                {
                  hour:
                    "2-digit",

                  minute:
                    "2-digit",
                }
              ),
          });

          console.log(
            "WhatsApp sent successfully"
          );
        } catch (
          whatsappError
        ) {
          console.log(
            "WhatsApp Error:",
            whatsappError
          );
        }
      }

      //
      // REMOVE LOCK
      //
      await redis.del(
        `slot_lock:${slotId}`
      );

      //
      // SOCKET EVENT
      //
      (global as any).io.emit(
        "slot_booked",
        {
          slotId,
        }
      );

      //
      // RESPONSE
      //
      return {
        success: true,

        message:
          "Slot booked successfully",

        booking,
      };
    }
  );
};