import React, { useEffect, useState } from "react";
import API from "../../api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.error(err);
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load profile. Please try again.",
        });
      }
    };
    fetchProfile();
  }, []);

  if (!user)
    return (
      <div className="flex justify-center items-center h-60 text-sky-700 font-semibold text-lg animate-pulse">
        Loading profile...
      </div>
    );

  return (
    <div className="bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100 border border-sky-200 shadow-lg rounded-2xl p-8 max-w-lg mx-auto mt-6">
      <div className="text-center mb-6">
        <div className="mx-auto bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold shadow-md">
          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
        <h3 className="text-2xl font-semibold text-sky-700 mt-3">
          {user.name}
        </h3>
        <p className="text-gray-600 text-sm">{user.email}</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
          <span className="text-gray-600 font-medium">Full Name:</span>
          <span className="text-sky-800 font-semibold">{user.name}</span>
        </div>
        <div className="flex justify-between bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
          <span className="text-gray-600 font-medium">Email:</span>
          <span className="text-sky-800 font-semibold">{user.email}</span>
        </div>
        <div className="flex justify-between bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
          <span className="text-gray-600 font-medium">Joined On:</span>
          <span className="text-sky-800 font-semibold">
            {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() =>
            MySwal.fire({
              icon: "info",
              title: "Profile Details",
              html: `<strong>Name:</strong> ${user.name}<br/><strong>Email:</strong> ${user.email}<br/><strong>Joined:</strong> ${new Date(
                user.createdAt
              ).toLocaleDateString()}`,
              confirmButtonColor: "#3085d6",
            })
          }
          className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 shadow-md transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
