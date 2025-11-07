import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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

  const handleLogout = () => {
    MySwal.fire({
      title: "Logout Confirmation",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0ea5e9",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Logout",
      background: "#f0f9ff",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        MySwal.fire({
          title: "Logged Out!",
          text: "You have been logged out successfully.",
          icon: "success",
          confirmButtonColor: "#0ea5e9",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/login");
      }
    });
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} />

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 transition-all duration-500">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-2xl shadow-lg p-6 mb-8 flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-3xl font-bold tracking-wide">
            Welcome to Your Dashboard 👋
          </h1>
          <p className="text-lg opacity-90 mt-2 md:mt-0">
            Manage your jobs and analytics seamlessly ✨
          </p>
        </div>

        {/* Main Container */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-sky-100 p-8 transition-all duration-300 hover:shadow-blue-200/50">
          <Routes>
            <Route
              path="/"
              element={
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Post Job Section */}
                  <div className="bg-gradient-to-br from-sky-50 via-white to-blue-50 p-6 rounded-2xl shadow-inner border border-blue-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                    <h3 className="text-2xl font-semibold text-sky-700 mb-4">
                      📝 Post a New Job
                    </h3>
                    <JobForm />
                  </div>

                  {/* Job List Section */}
                  <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6 rounded-2xl shadow-inner border border-indigo-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                    <h3 className="text-2xl font-semibold text-indigo-700 mb-4">
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
        <footer className="mt-10 text-center text-gray-600">
          <p className="text-sm">
            Made with 💙 by{" "}
            <span className="font-semibold text-sky-600">Preksha Jain</span>
          </p>
        </footer>
      </main>
    </div>
  );
}
