import { prisma } from "../../config/prisma";

//
// GET SLOTS BY DURATION
//
export const getSlotsByDuration =
  async (duration: number) => {
    return prisma.slot.findMany({
      where: {
        duration,
        isBooked: false,
      },

      orderBy: {
        startTime: "asc",
      },
    });
  };

//
// GENERATE SLOTS
//
export const generateSlots =
  async () => {
    const durations = [
      30,
      45,
      60,
    ];

    const today =
      new Date();

    const slots: any[] = [];

    //
    // NEXT 7 DAYS
    //
    for (
      let day = 0;
      day < 7;
      day++
    ) {
      const current =
        new Date(today);

      current.setDate(
        today.getDate() +
          day
      );

      //
      // MONDAY-FRIDAY
      //
      const weekDay =
        current.getDay();

      if (
        weekDay === 0 ||
        weekDay === 6
      ) {
        continue;
      }

      //
      // DURATIONS
      //
      for (const duration of durations) {
        let start =
          new Date(current);

        start.setHours(
          10,
          0,
          0,
          0
        );

        const endDay =
          new Date(current);

        endDay.setHours(
          18,
          0,
          0,
          0
        );

        while (
          start < endDay
        ) {
          const end =
            new Date(start);

          end.setMinutes(
            end.getMinutes() +
              duration
          );

          if (
            end <= endDay
          ) {
            const exists =
              await prisma.slot.findFirst(
                {
                  where: {
                    startTime:
                      start,

                    duration,
                  },
                }
              );

            if (!exists) {
              slots.push({
                startTime:
                  new Date(
                    start
                  ),

                endTime:
                  new Date(
                    end
                  ),

                duration,

                isBooked:
                  false,
              });
            }
          }

          start = end;
        }
      }
    }

    if (
      slots.length > 0
    ) {
      await prisma.slot.createMany(
        {
          data: slots,
        }
      );
    }

    return {
      success: true,

      created:
        slots.length,
    };
  };