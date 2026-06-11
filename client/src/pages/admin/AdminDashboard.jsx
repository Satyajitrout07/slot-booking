import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../../api/api";

export default function AdminDashboard() {
  //
  // NAVIGATE
  //
  const navigate =
    useNavigate();

  //
  // STATES
  //
  const [slots, setSlots] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  //
  // FETCH SLOTS
  //
  const fetchSlots =
    async () => {
      try {
        const res =
          await API.get(
            "/slots"
          );

        setSlots(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  //
  // LOAD
  //
  useEffect(() => {
    const loadData =
      async () => {
        await fetchSlots();
      };

    loadData();
  }, []);

  //
  // LOGOUT
  //
  const logout = () => {
    localStorage.clear();

    navigate(
      "/admin/login"
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold">
            Admin Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            Manage interview slots
          </p>
        </div>

        {/* LOGOUT */}
        <button
  type="button"
  onClick={logout}
  className="bg-red-500 hover:bg-red-600 transition-all px-5 py-3 rounded-2xl"
>
  Logout
</button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* TOTAL */}
        <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-6">
          <h2 className="text-slate-400">
            Total Slots
          </h2>

          <p className="text-4xl font-bold mt-2">
            {slots.length}
          </p>
        </div>

        {/* AVAILABLE */}
        <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-6">
          <h2 className="text-slate-400">
            Available Slots
          </h2>

          <p className="text-4xl font-bold mt-2 text-emerald-400">
            {
              slots.filter(
                (slot) =>
                  !slot.isBooked
              ).length
            }
          </p>
        </div>

        {/* BOOKED */}
        <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-6">
          <h2 className="text-slate-400">
            Booked Slots
          </h2>

          <p className="text-4xl font-bold mt-2 text-red-400">
            {
              slots.filter(
                (slot) =>
                  slot.isBooked
              ).length
            }
          </p>
        </div>
      </div>

      {/* SLOT LIST */}
      <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-6">
        <h2 className="text-2xl font-semibold mb-6">
          Interview Slots
        </h2>

        {/* LOADING */}
        {loading ? (
          <p className="text-slate-400">
            Loading...
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className="bg-slate-900 rounded-2xl p-5 border border-white/5"
              >
                {/* TIME */}
                <h3 className="text-xl font-semibold mb-2">
                  {new Date(
                    slot.startTime
                  ).toLocaleTimeString()}
                </h3>

                <p className="text-slate-400 mb-4">
                  to{" "}
                  {new Date(
                    slot.endTime
                  ).toLocaleTimeString()}
                </p>

                {/* STATUS */}
                {slot.isBooked ? (
                  <span className="bg-red-500/20 text-red-400 px-4 py-2 rounded-xl text-sm">
                    Booked
                  </span>
                ) : (
                  <span className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl text-sm">
                    Available
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}