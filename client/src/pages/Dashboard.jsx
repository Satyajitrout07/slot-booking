import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/api";

import socket from "../socket/socket.js";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
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
          onClick={logout}
          className="bg-red-500 px-5 py-3 rounded-2xl"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div
          onClick={() =>
            navigate("/slots/30")
          }
          className="cursor-pointer bg-blue-600 p-10 rounded-3xl hover:scale-105 transition"
        >
          <h2 className="text-3xl font-bold">
            30 Minutes
          </h2>

          <p className="mt-4">
            Quick Screening
          </p>
        </div>

        <div
          onClick={() =>
            navigate("/slots/45")
          }
          className="cursor-pointer bg-purple-600 p-10 rounded-3xl hover:scale-105 transition"
        >
          <h2 className="text-3xl font-bold">
            45 Minutes
          </h2>

          <p className="mt-4">
            Technical Round
          </p>
        </div>

        <div
          onClick={() =>
            navigate("/slots/60")
          }
          className="cursor-pointer bg-green-600 p-10 rounded-3xl hover:scale-105 transition"
        >
          <h2 className="text-3xl font-bold">
            1 Hour
          </h2>

          <p className="mt-4">
            Full Interview
          </p>
        </div>
      </div>
    </div>
  );
}