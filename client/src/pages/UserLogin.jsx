import { useState } from "react";

import API from "../api/api";

export default function UserLogin({
  setAuth,
  goRegister,
  goHome,
}) {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  //
  // USER LOGIN
  //
  const login = async () => {
    try {
      const res = await API.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      //
      // ONLY USER
      //
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

        <input
          placeholder="Email"
          className="w-full bg-slate-800 p-3 rounded-xl mb-4 text-white"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full bg-slate-800 p-3 rounded-xl mb-6 text-white"
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          onClick={login}
          className="w-full bg-indigo-600 py-3 rounded-xl text-white"
        >
          Login
        </button>

        <p
          onClick={goRegister}
          className="text-center mt-5 text-indigo-400 cursor-pointer"
        >
          Create Account
        </p>

        <p
          onClick={goHome}
          className="text-center mt-3 text-slate-400 cursor-pointer"
        >
          Back
        </p>
      </div>
    </div>
  );
}