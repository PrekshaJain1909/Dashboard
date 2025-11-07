import React from "react";
import { NavLink } from "react-router-dom";
import {
  Briefcase,
  User,
  PieChart,
  PlusCircle,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

export default function Sidebar({ onLogout }) {
  const navItems = [
    { path: "/dashboard/", label: "Job Posted", icon: <Briefcase size={18} />, color: "from-sky-400 to-blue-500" },
    { path: "/dashboard/post", label: "Post Job", icon: <PlusCircle size={18} />, color: "from-green-400 to-emerald-500" },
    { path: "/dashboard/profile", label: "Profile", icon: <User size={18} />, color: "from-pink-400 to-rose-500" },
    { path: "/dashboard/analysis", label: "Customer Analysis", icon: <PieChart size={18} />, color: "from-amber-400 to-orange-500" },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-gray-200 p-6 hidden md:flex flex-col justify-between shadow-2xl border-r border-sky-900">
      <div>
        {/* Sidebar Header */}
        <div className="flex items-center gap-3 mb-8">
          <LayoutDashboard size={28} className="text-sky-400 drop-shadow-lg" />
          <h3 className="text-3xl font-extrabold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent tracking-wide">
            Dashboard
          </h3>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-[1.03] hover:shadow-lg ${
                  isActive
                    ? `bg-gradient-to-r ${item.color} text-white font-semibold`
                    : "bg-slate-800/50 text-gray-300 hover:bg-slate-700/70"
                }`
              }
            >
              <div className="p-2 rounded-md bg-slate-700/60">
                {item.icon}
              </div>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="flex items-center justify-center gap-2 mt-8 py-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 rounded-lg text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}
