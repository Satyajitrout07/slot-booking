import { prisma } from "../../config/prisma";
import { bookSlot } from "../booking/booking.service";

export const getSlots = async () => {
  return prisma.slot.findMany({ where: { isBooked: false } });
};

export const bookEarliest = async (userId: number) => {
  const slot = await prisma.slot.findFirst({
    where: { isBooked: false },
    orderBy: { startTime: "asc" }
  });

  if (!slot) return { message: "No slots" };

  await bookSlot(userId, slot.id);

  return { message: "Booked", slotId: slot.id };
};