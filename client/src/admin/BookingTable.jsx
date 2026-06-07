export default function BookingTable({
  bookings,
}) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
      <h2 className="text-xl font-semibold mb-5">
        Bookings
      </h2>

      <table className="w-full">
        <thead>
          <tr className="text-slate-400">
            <th className="text-left py-3">
              Candidate
            </th>

            <th className="text-left py-3">
              Email
            </th>

            <th className="text-left py-3">
              Slot
            </th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr
              key={b.id}
              className="border-t border-white/10"
            >
              <td className="py-4">
                {b.user?.name}
              </td>

              <td>
                {b.user?.email}
              </td>

              <td>
                {new Date(
                  b.slot?.startTime
                ).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}