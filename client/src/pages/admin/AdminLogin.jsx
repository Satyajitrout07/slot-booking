import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

import portalBg from "../../assets/portal-bg.jpg";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const login = async () => {
    try {
      const res = await API.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      if (
        res.data.user.role !==
        "ADMIN"
      ) {
        return alert(
          "Not admin account"
        );
      }

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.user.role
      );

      navigate(
        "/admin/dashboard"
      );
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${portalBg})`,
      }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>

      {/* GLOW EFFECTS */}
      <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-red-500/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-indigo-500/20 blur-[120px] rounded-full"></div>

      {/* CARD */}
      <div className="relative z-10 w-[450px] bg-black/30 border border-white/10 backdrop-blur-2xl rounded-[35px] p-10 shadow-2xl">
        {/* BADGE */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-500/20 border border-red-500/20 text-red-400 px-5 py-2 rounded-full text-sm tracking-widest uppercase">
            HR Admin Portal
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-5xl font-bold text-center text-white mb-3">
          Admin Login
        </h1>

        <p className="text-center text-slate-300 mb-10">
          Secure HR Interview Management
        </p>

        {/* EMAIL */}
        <label
          htmlFor="admin-email"
          className="block text-white mb-2"
        >
          Admin Email
        </label>

        <input
          id="admin-email"
          type="email"
          aria-label="Admin Email"
          value={email}
          placeholder="Admin Email"
          className="w-full bg-slate-900/60 border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/30 transition-all p-5 rounded-2xl mb-5 outline-none text-white placeholder:text-slate-400"
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        {/* PASSWORD */}
        <label
          htmlFor="admin-password"
          className="block text-white mb-2"
        >
          Password
        </label>

        <input
          id="admin-password"
          type="password"
          aria-label="Password"
          value={password}
          placeholder="Password"
          className="w-full bg-slate-900/60 border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/30 transition-all p-5 rounded-2xl mb-8 outline-none text-white placeholder:text-slate-400"
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        {/* LOGIN BUTTON */}
        <button
          type="button"
          onClick={login}
          className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 py-5 rounded-2xl text-lg font-semibold text-white"
        >
          Access Admin Panel
        </button>

        {/* LINKS */}
        <div className="mt-8 space-y-4">
          <button
            type="button"
            onClick={() =>
              navigate(
                "/admin/register"
              )
            }
            className="w-full text-slate-300 hover:text-white transition-all"
          >
            Create HR Account
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/login"
              )
            }
            className="w-full text-cyan-400 hover:text-cyan-300 transition-all"
          >
            User Login
          </button>
        </div>
      </div>
    </div>
  );
}