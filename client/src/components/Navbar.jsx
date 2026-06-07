export default function Navbar() {
  return (
    <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/5 backdrop-blur-lg">
      <h1 className="text-xl font-bold">Interview Slot Booking</h1>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
        className="bg-red-500 px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}