export default function StatsCards({
  stats,
}) {
  return (
    <div className="grid grid-cols-4 gap-5 mb-10">
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
        <h2 className="text-slate-400">
          Total Slots
        </h2>

        <p className="text-3xl font-bold mt-3">
          {stats.totalSlots || 0}
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
        <h2 className="text-slate-400">
          Booked
        </h2>

        <p className="text-3xl font-bold mt-3">
          {stats.bookedSlots || 0}
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
        <h2 className="text-slate-400">
          Available
        </h2>

        <p className="text-3xl font-bold mt-3">
          {stats.availableSlots || 0}
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
        <h2 className="text-slate-400">
          Users
        </h2>

        <p className="text-3xl font-bold mt-3">
          {stats.users || 0}
        </p>
      </div>
    </div>
  );
}