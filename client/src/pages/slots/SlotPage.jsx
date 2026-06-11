import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import socket from "../../socket/socket";

export default function SlotPage({ duration }) {
  const navigate = useNavigate();

  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [formData, setFormData] = useState({
    companyName: "",
    round: "",
    hrName: "",
    hrPhone: "",
    hrEmail: "",
  });

  useEffect(() => {
    const loadSlots = async () => {
      try {
        setLoading(true);

        const res = await API.get(`/slots/${duration}`);

        setSlots(res.data);
      } catch (error) {
        console.error("Error fetching slots:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSlots();

    const handleSlotBooked = async (data) => {
      console.log("Socket Event Received:", data);

      try {
        const res = await API.get(`/slots/${duration}`);
        setSlots(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    socket.on("slot_booked", handleSlotBooked);

    return () => {
      socket.off("slot_booked", handleSlotBooked);
    };
  }, [duration]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const bookSlot = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await API.post("/bookings", {
        slotId: selectedSlot,
        companyName: formData.companyName,
        round: formData.round,
        hrName: formData.hrName,
        hrPhone: formData.hrPhone,
        hrEmail: formData.hrEmail,
      });

      alert("Slot booked successfully");

      setShowModal(false);

      setFormData({
        companyName: "",
        round: "",
        hrName: "",
        hrPhone: "",
        hrEmail: "",
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Booking failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto text-white">
      <div className="flex items-center justify-between mb-8">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="bg-slate-700 px-5 py-3 rounded-2xl hover:bg-slate-600 transition"
        >
          Back
        </button>

        <h1 className="text-4xl font-bold">
          {duration} Minute Slots
        </h1>

        <div className="w-[84px]" />
      </div>

      {loading ? (
        <p className="text-center text-xl mt-10">
          Loading slots...
        </p>
      ) : slots.length === 0 ? (
        <p className="text-center text-slate-400 text-xl mt-10">
          No available slots for this duration.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="bg-white/10 p-6 rounded-3xl backdrop-blur-sm"
            >
              <h2 className="text-xl font-bold">
                {new Date(slot.startTime).toLocaleDateString(
                  "en-IN",
                  {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </h2>

              <p className="mt-2 text-slate-300">
                {new Date(slot.startTime).toLocaleTimeString(
                  "en-IN",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
                {" - "}
                {new Date(slot.endTime).toLocaleTimeString(
                  "en-IN",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </p>

              <p className="mt-2 text-indigo-400 font-semibold">
                Duration: {slot.duration} Minutes
              </p>

              <button
                type="button"
                onClick={() => {
                  setSelectedSlot(slot.id);
                  setShowModal(true);
                }}
                className="w-full mt-4 bg-emerald-500 py-3 rounded-xl font-semibold text-white hover:bg-emerald-400 transition"
              >
                Book Slot
              </button>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
        >
          <form
            onSubmit={bookSlot}
            className="bg-white text-black p-8 rounded-3xl w-full max-w-md shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-5">
              Interview Details
            </h2>

            <input
              aria-label="Company Name"
              type="text"
              name="companyName"
              placeholder="Company Name"
              required
              value={formData.companyName}
              onChange={handleInputChange}
              className="w-full border p-3 rounded-xl mb-3"
            />

            <input
              aria-label="Interview Round"
              type="text"
              name="round"
              placeholder="Interview Round"
              required
              value={formData.round}
              onChange={handleInputChange}
              className="w-full border p-3 rounded-xl mb-3"
            />

            <input
              aria-label="HR Name"
              type="text"
              name="hrName"
              placeholder="HR Name"
              required
              value={formData.hrName}
              onChange={handleInputChange}
              className="w-full border p-3 rounded-xl mb-3"
            />

            <input
              aria-label="HR Mobile Number"
              type="tel"
              name="hrPhone"
              placeholder="HR Mobile Number"
              required
              value={formData.hrPhone}
              onChange={handleInputChange}
              className="w-full border p-3 rounded-xl mb-3"
            />

            <input
              aria-label="HR Email"
              type="email"
              name="hrEmail"
              placeholder="HR Email"
              required
              value={formData.hrEmail}
              onChange={handleInputChange}
              className="w-full border p-3 rounded-xl mb-5"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-emerald-500 text-white py-3 rounded-xl"
              >
                {isSubmitting ? "Booking..." : "Submit"}
              </button>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 bg-red-500 text-white py-3 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}