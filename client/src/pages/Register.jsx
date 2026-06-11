import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "CANDIDATE",
  });

  const [loading, setLoading] = useState(false);

  const register = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const res = await API.post(
        "/auth/register",
        form
      );

      if (res.data.success) {
        alert(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
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

        {/* NAME */}
        <label
          htmlFor="name"
          className="block text-white mb-2"
        >
          Name
        </label>

        <input
          id="name"
          type="text"
          aria-label="Name"
          value={form.name}
          placeholder="Enter your name"
          className="w-full p-4 rounded-2xl bg-slate-800 text-white mb-4 outline-none"
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        {/* EMAIL */}
        <label
          htmlFor="email"
          className="block text-white mb-2"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          aria-label="Email Address"
          value={form.email}
          placeholder="Enter your email"
          className="w-full p-4 rounded-2xl bg-slate-800 text-white mb-4 outline-none"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        {/* PASSWORD */}
        <label
          htmlFor="password"
          className="block text-white mb-2"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          aria-label="Password"
          value={form.password}
          placeholder="Enter your password"
          className="w-full p-4 rounded-2xl bg-slate-800 text-white mb-6 outline-none"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
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

        <button
          type="button"
          onClick={() =>
            navigate("/login")
          }
          className="w-full mt-4 text-slate-300 hover:text-white"
        >
          Already have an account? Login
        </button>
      </form>
    </div>
  );
}