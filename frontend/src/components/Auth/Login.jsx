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
        confirmButtonColor: "#6366f1",
        background: "#1f2937",
        color: "#f9fafb",
      }).then(() => navigate("/dashboard"));
    } catch (err) {
      Swal.fire({
        title: "Login Failed 😔",
        text: err.response?.data?.msg || "Invalid email or password.",
        icon: "error",
        confirmButtonColor: "#ef4444",
        background: "#1f2937",
        color: "#f9fafb",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute w-72 h-72 bg-gray-700/20 rounded-full blur-3xl -top-10 -left-10 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-gray-800/20 rounded-full blur-2xl bottom-10 right-10 animate-pulse"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-lg bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-700 p-12 transform hover:scale-[1.01] transition-transform duration-500">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-100 drop-shadow-md">
            Welcome Back
          </h1>
          <p className="text-gray-400 mt-3 text-base">
            Sign in to access your personalized dashboard
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2 font-medium">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={onChange}
              required
              className="w-full px-5 py-3 rounded-xl bg-gray-700 border border-gray-600 placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2 font-medium">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={onChange}
              required
              className="w-full px-5 py-3 rounded-xl bg-gray-700 border border-gray-600 placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 text-lg"
          >
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-gray-400 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-400 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            © 2025 Dawa-Ware. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
