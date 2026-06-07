import { prisma } from "../../config/prisma";

//
// DASHBOARD STATS
//
export const getDashboardStats =
  async () => {
    //
    // TOTAL USERS
    //
    const totalUsers =
      await prisma.user.count();

    //
    // TOTAL BOOKINGS
    //
    const totalBookings =
      await prisma.booking.count();

    //
    // TOTAL SLOTS
    //
    const totalSlots =
      await prisma.slot.count();

    //
    // AVAILABLE SLOTS
    //
    const availableSlots =
      await prisma.slot.count({
        where: {
          isBooked: false,
        },
      });

    return {
      totalUsers,

      totalBookings,

      totalSlots,

      availableSlots,
    };
  };

//
// GET BOOKINGS
//
export const getAllBookings =
  async () => {
    return prisma.booking.findMany({
      include: {
        user: true,

        slot: true,
      },
    });
  };

//
// GET USERS
//
export const getAllUsers =
  async () => {
    return prisma.user.findMany();
  };

//
// CREATE SINGLE SLOT
//
export const createInterviewSlot =
  async (data: any) => {
    return prisma.slot.create({
      data: {
        startTime:
          data.startTime,

        endTime:
          data.endTime,
      },
    });
  };

//
// GET ALL SLOTS
//
export const getAllSlots =
  async () => {
    return prisma.slot.findMany({
      orderBy: {
        startTime: "asc",
      },
    });
  };

//
// AUTO GENERATE WEEKLY SLOTS
//
export const generateWeeklySlots =
  async (data: any) => {
    //
    // BODY
    //
    const {
      startDate,
      startHour,
      endHour,
    } = data;

    //
    // STORE ALL SLOTS
    //
    const slots = [];

    //
    // START DATE
    //
    const baseDate =
      new Date(startDate);

    //
    // MONDAY → FRIDAY
    //
    for (
      let day = 0;
      day < 5;
      day++
    ) {
      //
      // CURRENT DATE
      //
      const currentDate =
        new Date(baseDate);

      currentDate.setDate(
        baseDate.getDate() + day
      );

      //
      // HOURS LOOP
      //
      for (
        let hour =
          startHour;
        hour < endHour;
        hour++
      ) {
        //
        // START TIME
        //
        const startTime =
          new Date(currentDate);

        startTime.setHours(
          hour,
          0,
          0,
          0
        );

        //
        // END TIME
        //
        const endTime =
          new Date(currentDate);

        endTime.setHours(
          hour + 1,
          0,
          0,
          0
        );

        //
        // CREATE SLOT
        //
        const slot =
          await prisma.slot.create({
            data: {
              startTime,

              endTime,
            },
          });

        slots.push(slot);
      }
    }

    return slots;
  };