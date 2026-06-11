import { useState } from "react";
import API from "../api/api";

export default function UserLogin({
  setAuth,
  goRegister,
  goHome,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        "CANDIDATE"
      ) {
        return alert(
          "Use Admin Login"
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

      setAuth(true);
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-950">
      <div className="w-96 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2 text-white">
          Candidate Login
        </h1>

        <p className="text-center text-slate-400 mb-8">
          Book Interview Slots
        </p>

        {/* EMAIL */}
        <input
          type="email"
          aria-label="Email Address"
          placeholder="Email"
          value={email}
          className="w-full bg-slate-800 p-3 rounded-xl mb-4 text-white"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          aria-label="Password"
          placeholder="Password"
          value={password}
          className="w-full bg-slate-800 p-3 rounded-xl mb-6 text-white"
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        {/* LOGIN */}
        <button
          type="button"
          onClick={login}
          className="w-full bg-indigo-600 py-3 rounded-xl text-white"
        >
          Login
        </button>

        {/* CREATE ACCOUNT */}
        <button
          type="button"
          onClick={goRegister}
          className="w-full mt-5 text-indigo-400 hover:text-indigo-300 transition"
        >
          Create Account
        </button>

        {/* BACK */}
        <button
          type="button"
          onClick={goHome}
          className="w-full mt-3 text-slate-400 hover:text-slate-300 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
}