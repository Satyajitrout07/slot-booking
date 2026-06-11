import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      if (res.data.user.role !== "CANDIDATE") {
        return alert("Please login from admin panel");
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center overflow-hidden relative">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-black to-slate-950"></div>

      {/* GLOW */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-indigo-500 opacity-20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-cyan-500 opacity-20 blur-[120px] rounded-full"></div>

      {/* CARD */}
      <div className="relative z-10 w-[950px] h-[600px] rounded-[40px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl grid grid-cols-2">
        {/* LEFT */}
        <div className="p-14 flex flex-col justify-center">
          <div>
            <p className="text-indigo-400 font-semibold tracking-widest uppercase mb-4">
              SkillUpLift 🛩️ Interview Portal
            </p>

            <h1 className="text-6xl font-bold leading-tight">
              Smart <br />
              Slot Booking
            </h1>

            <p className="text-slate-400 mt-6 text-lg leading-8">
              Real-time interview slot booking
              platform with live scheduling,
              admin management and instant
              updates.
            </p>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                <p className="text-slate-300">
                  Live Slot Availability
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                <p className="text-slate-300">
                  Real-time Notifications
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                <p className="text-slate-300">
                  Enterprise HR Workflow
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white/5 border-l border-white/10 flex items-center justify-center p-10">
          <div className="w-full max-w-[380px]">
            <h1 className="text-5xl font-bold text-center mb-3">
              Welcome
            </h1>

            <p className="text-center text-slate-400 mb-10">
              Login to continue
            </p>

            {/* EMAIL */}
            <div className="mb-5">
              <input
                aria-label="Email Address"
                type="email"
                placeholder="Email Address"
                className="w-full bg-slate-900/80 border border-white/5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all p-5 rounded-2xl outline-none text-white"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-8">
              <input
                aria-label="Password"
                type="password"
                placeholder="Password"
                className="w-full bg-slate-900/80 border border-white/5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all p-5 rounded-2xl outline-none text-white"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="button"
              onClick={login}
              className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:scale-[1.02] transition-all duration-300 py-5 rounded-2xl text-lg font-semibold shadow-lg shadow-indigo-500/20"
            >
              Login
            </button>

            {/* LINKS */}
            <div className="mt-8 text-center space-y-4">
              <button
                type="button"
                onClick={() =>
                  navigate("/register")
                }
                className="block w-full text-slate-400 hover:text-white transition-all"
              >
                Create Account
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/admin/login")
                }
                className="block w-full text-emerald-400 hover:text-emerald-300 transition-all"
              >
                Admin Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}