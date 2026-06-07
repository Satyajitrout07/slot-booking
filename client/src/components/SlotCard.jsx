import { motion } from "framer-motion";
import API from "../api/api";

export default function SlotCard({ slot, refresh }) {
  const lockSlot = async () => {
    await API.post(`/slots/${slot.id}/lock`);
    refresh();
  };

  const bookSlot = async () => {
    await API.post("/bookings", {
      slotId: slot.id,
    });
    refresh();
  };

  const start = new Date(slot.startTime);
  // Removed line 19 (const end = ...) to fix the ESLint warning

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-xl"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">
            {start.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            1 Hour Interview Slot
          </p>

          <p className="text-xs text-slate-500 mt-2">
            {start.toDateString()}
          </p>
        </div>

        <span
          className={`text-xs px-3 py-1 rounded-full ${
            slot.isBooked
              ? "bg-red-500/20 text-red-400"
              : "bg-green-500/20 text-green-400"
          }`}
        >
          {slot.isBooked ? "Booked" : "Available"}
        </span>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={lockSlot}
          className="bg-yellow-500 hover:opacity-80 px-4 py-2 rounded-xl text-sm transition-all"
        >
          Lock
        </button>

        <button
          onClick={bookSlot}
          className="bg-indigo-600 hover:opacity-80 px-4 py-2 rounded-xl text-sm transition-all"
        >
          Book
        </button>
      </div>
    </motion.div>
  );
}


