import { useState } from "react";

import API from "../api/api";

export default function CreateSlot({
  refresh,
}) {
  //
  // STATE
  //
  const [time, setTime] =
    useState("");

  //
  // CREATE SLOT
  //
  const createSlot = async () => {
    try {
      //
      // START TIME
      //
      const start =
        new Date(time);

      //
      // END TIME (1 HOUR)
      //
      const end =
        new Date(start);

      end.setHours(
        end.getHours() + 1
      );

      //
      // API CALL
      //
      await API.post(
        "/admin/slots",
        {
          startTime: start,
          endTime: end,
        }
      );

      //
      // SUCCESS
      //
      alert("Slot Created");

      //
      // REFRESH DASHBOARD
      //
      refresh();
    } catch {
      alert(
        "Failed to create slot"
      );
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5 mb-8">
      <h2 className="text-xl font-semibold mb-5">
        Create Interview Slot
      </h2>

      <input
        type="datetime-local"
        className="w-full bg-slate-800 p-3 rounded-xl text-white outline-none"
        onChange={(e) =>
          setTime(e.target.value)
        }
      />

      <button
        onClick={createSlot}
        className="mt-5 bg-indigo-600 hover:opacity-90 px-5 py-3 rounded-xl transition-all"
      >
        Create 1 Hour Slot
      </button>
    </div>
  );
}