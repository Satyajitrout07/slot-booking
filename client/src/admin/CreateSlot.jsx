import { useState } from "react";
import API from "../api/api";

export default function CreateSlot({ refresh }) {
  const [time, setTime] = useState("");

  const createSlot = async () => {
    if (!time) {
      alert("Please select a date and time");
      return;
    }

    try {
      const start = new Date(time);

      const end = new Date(start);
      end.setHours(end.getHours() + 1);

      await API.post("/admin/slots", {
        startTime: start,
        endTime: end,
      });

      alert("Slot Created");

      setTime("");

      refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to create slot");
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5 mb-8">
      <h2 className="text-xl font-semibold mb-5">
        Create Interview Slot
      </h2>

      <label
        htmlFor="slot-time"
        className="block mb-2 text-sm text-slate-300"
      >
        Select Date & Time
      </label>

      <input
        id="slot-time"
        aria-label="Interview Slot Date and Time"
        type="datetime-local"
        value={time}
        className="w-full bg-slate-800 p-3 rounded-xl text-white outline-none"
        onChange={(e) => setTime(e.target.value)}
      />

      <button
        type="button"
        onClick={createSlot}
        className="mt-5 bg-indigo-600 hover:opacity-90 px-5 py-3 rounded-xl transition-all"
      >
        Create 1 Hour Slot
      </button>
    </div>
  );
}