import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket/socket";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket Connected:", socket.id);
    });

    socket.on("slot-booked", () => {
      console.log("A slot was booked");
    });

    socket.on("slot-created", () => {
      console.log("A new slot was created");
    });

    return () => {
      socket.off("connect");
      socket.off("slot-booked");
      socket.off("slot-created");
    };
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold">
            Candidate Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            Select Interview Duration
          </p>
        </div>

        <button
          type="button"
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-2xl transition"
        >
          Logout
        </button>
      </div>

      {/* Duration Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* 30 MIN */}
        <button
          type="button"
          onClick={() => navigate("/slots/30")}
          className="text-left bg-blue-600 p-10 rounded-3xl hover:scale-105 transition cursor-pointer"
        >
          <h2 className="text-3xl font-bold">
            30 Minutes
          </h2>

          <p className="mt-4">
            Quick Screening
          </p>
        </button>

        {/* 45 MIN */}
        <button
          type="button"
          onClick={() => navigate("/slots/45")}
          className="text-left bg-purple-600 p-10 rounded-3xl hover:scale-105 transition cursor-pointer"
        >
          <h2 className="text-3xl font-bold">
            45 Minutes
          </h2>

          <p className="mt-4">
            Technical Round
          </p>
        </button>

        {/* 60 MIN */}
        <button
          type="button"
          onClick={() => navigate("/slots/60")}
          className="text-left bg-green-600 p-10 rounded-3xl hover:scale-105 transition cursor-pointer"
        >
          <h2 className="text-3xl font-bold">
            1 Hour
          </h2>

          <p className="mt-4">
            Full Interview
          </p>
        </button>
      </div>
    </div>
  );
}