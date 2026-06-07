import { useEffect, useState } from "react";

import API from "../api/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import StatsCards from "./StatsCards";
import CreateSlot from "./CreateSlot";
import BookingTable from "./BookingTable";

export default function AdminDashboard() {
  //
  // STATES
  //
  const [stats, setStats] =
    useState({});

  const [bookings, setBookings] =
    useState([]);

  //
  // ADMIN PROTECTION
  //
  useEffect(() => {
    const role =
      localStorage.getItem("role");

    if (role !== "ADMIN") {
      alert("Access denied");

      localStorage.clear();

      window.location.reload();
    }
  }, []);

  //
  // LOAD DATA
  //
  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          statsRes,
          bookingsRes,
        ] = await Promise.all([
          API.get("/admin/stats"),

          API.get(
            "/admin/bookings"
          ),
        ]);

        setStats(statsRes.data);

        setBookings(
          bookingsRes.data
        );
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, []);

  //
  // REFRESH STATS
  //
  const refreshStats =
    async () => {
      try {
        const res =
          await API.get(
            "/admin/stats"
          );

        setStats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="flex bg-slate-900 text-white">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 min-h-screen overflow-y-auto">
        {/* NAVBAR */}
        <Navbar />

        <div className="p-6">
          {/* TITLE */}
          <h1 className="text-3xl font-bold mb-8">
            Admin Dashboard
          </h1>

          {/* STATS */}
          <StatsCards
            stats={stats}
          />

          {/* CREATE SLOT */}
          <CreateSlot
            refresh={refreshStats}
          />

          {/* BOOKINGS */}
          <BookingTable
            bookings={bookings}
          />
        </div>
      </div>
    </div>
  );
}