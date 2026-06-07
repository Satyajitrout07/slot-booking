import { useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import API from "../api/api";

export default function Register() {
  //
  // NAVIGATE
  //
  const navigate =
    useNavigate();

  //
  // FORM
  //
  const [form, setForm] =
    useState({
      name: "",

      email: "",

      password: "",

      role: "CANDIDATE",
    });

  //
  // LOADING
  //
  const [loading,
    setLoading] =
    useState(false);

  //
  // REGISTER
  //
  const register = async (
    e
  ) => {
    //
    // STOP REFRESH
    //
    e.preventDefault();

    //
    // PREVENT DOUBLE CLICK
    //
    if (loading) return;

    try {
      setLoading(true);

      //
      // API
      //
      const res =
        await API.post(
          "/auth/register",
          form
        );

      //
      // SUCCESS
      //
      if (
        res.data.success
      ) {
        alert(
          res.data.message
        );

        //
        // REDIRECT
        //
        navigate("/login");
      }
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={register}
        className="w-full max-w-[420px] bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
      >
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-4 rounded-2xl bg-slate-800 text-white mb-4 outline-none"
          onChange={(e) =>
            setForm({
              ...form,

              name:
                e.target.value,
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 rounded-2xl bg-slate-800 text-white mb-4 outline-none"
          onChange={(e) =>
            setForm({
              ...form,

              email:
                e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 rounded-2xl bg-slate-800 text-white mb-6 outline-none"
          onChange={(e) =>
            setForm({
              ...form,

              password:
                e.target.value,
            })
          }
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 py-4 rounded-2xl text-white font-semibold"
        >
          {loading
            ? "Creating..."
            : "Register"}
        </button>
      </form>
    </div>
  );
}