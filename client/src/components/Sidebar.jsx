import { FaCalendarAlt, FaRobot, FaUser } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 h-screen">
      <h1 className="text-2xl font-bold mb-10 text-indigo-400">
        SlotAI
      </h1>

      <div className="space-y-6 text-sm">
        <div className="flex items-center gap-3 hover:text-indigo-400 cursor-pointer transition-all">
          <FaCalendarAlt /> Dashboard
        </div>

        <div className="flex items-center gap-3 hover:text-indigo-400 cursor-pointer transition-all">
          <FaRobot /> AI Assistant
        </div>

        <div className="flex items-center gap-3 hover:text-indigo-400 cursor-pointer transition-all">
          <FaUser /> Profile
        </div>
      </div>
    </div>
  );
}