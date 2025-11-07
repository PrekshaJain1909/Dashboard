import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import JobForm from "./JobForm";
import JobList from "./JobList";
import Profile from "./Profile";
import CustomerAnalysis from "./CustomerAnalysis";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    MySwal.fire({
      title: "Logout Confirmation",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0ea5e9",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Logout",
      background: "#1f2937",
      color: "#f9fafb",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        MySwal.fire({
          title: "Logged Out!",
          text: "You have been logged out successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          background: "#1f2937",
          color: "#f9fafb",
          willClose: () => navigate("/login"),
        });
      }
    });
  };

  if (!token) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen flex bg-gray-900 text-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} />

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 transition-all duration-500">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-800 to-purple-700 text-white rounded-2xl shadow-lg p-6 mb-8 flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-3xl font-bold tracking-wide">
            Welcome to Your Dashboard 👋
          </h1>
          <p className="text-lg opacity-90 mt-2 md:mt-0">
            Manage your jobs and analytics seamlessly ✨
          </p>
        </div>

        {/* Main Container */}
        <div className="bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-700 p-8 transition-all duration-300 hover:shadow-indigo-500/50">
          <Routes>
            <Route
              path="/"
              element={
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Post Job Section */}
                  <div className="bg-gray-700/80 p-6 rounded-2xl shadow-inner border border-gray-600 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                    <h3 className="text-2xl font-semibold text-indigo-300 mb-4">
                      📝 Post a New Job
                    </h3>
                    <JobForm />
                  </div>

                  {/* Job List Section */}
                  <div className="bg-gray-700/80 p-6 rounded-2xl shadow-inner border border-gray-600 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                    <h3 className="text-2xl font-semibold text-indigo-300 mb-4">
                      📋 Your Job Listings
                    </h3>
                    <JobList />
                  </div>
                </div>
              }
            />
            <Route path="jobs" element={<JobList />} />
            <Route path="post" element={<JobForm />} />
            <Route path="profile" element={<Profile />} />
            <Route path="analysis" element={<CustomerAnalysis />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="mt-10 text-center text-gray-400">
          <p className="text-sm">
            Made with 💙 by{" "}
            <span className="font-semibold text-indigo-300">Preksha Jain</span>
          </p>
        </footer>
      </main>
    </div>
  );
}
