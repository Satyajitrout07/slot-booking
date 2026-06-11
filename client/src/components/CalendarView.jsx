import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = dayjsLocalizer(dayjs);

export default function CalendarView({ slots }) {
  const events = slots.map((slot) => ({
    title: slot.isBooked ? "Booked" : "Available",
    start: new Date(slot.startTime),
    end: new Date(slot.endTime),
  }));

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5 h-[500px] text-black">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 450 }}
      />
    </div>
  );
}