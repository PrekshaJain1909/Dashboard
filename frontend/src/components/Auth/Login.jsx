import React, { useState } from "react";
import API from "../../api";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);

      Swal.fire({
        title: "Welcome Back 🎉",
        text: "You’ve successfully logged in!",
        icon: "success",
        confirmButtonColor: "#0284c7",
        background: "#f0faff",
        color: "#0c4a6e",
      }).then(() => navigate("/dashboard"));
    } catch (err) {
      Swal.fire({
        title: "Login Failed 😔",
        text: err.response?.data?.msg || "Invalid email or password.",
        icon: "error",
        confirmButtonColor: "#ef4444",
        background: "#fef2f2",
        color: "#7f1d1d",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-sky-100 via-white to-sky-200 relative overflow-hidden">
      {/* Subtle glowing circles in background */}
      <div className="absolute w-72 h-72 bg-sky-300/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-sky-400/10 rounded-full blur-2xl bottom-10 right-10 animate-pulse"></div>

      {/* Login card */}
      <div className="relative w-full max-w-md bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-10 transform hover:scale-[1.01] transition-transform duration-500">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-sky-700 drop-shadow-sm">
            Welcome Back 👋
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Login to access your personalized dashboard
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={onChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-sky-100 focus:border-sky-400 focus:ring-2 focus:ring-sky-300 outline-none transition-all duration-300 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={onChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-sky-100 focus:border-sky-400 focus:ring-2 focus:ring-sky-300 outline-none transition-all duration-300 placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg hover:from-sky-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-sky-700 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">© 2025 Preksha Jain. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}
