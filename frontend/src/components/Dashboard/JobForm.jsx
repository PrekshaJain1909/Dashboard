import React, { useState } from "react";
import API from "../../api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function JobForm({ onSaved }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    lastDate: "",
    company: "",
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/jobs", form);
      setForm({ title: "", description: "", lastDate: "", company: "" });
      if (onSaved) onSaved();
      MySwal.fire({
        icon: "success",
        title: "Job Posted 🎉",
        text: "Your job has been successfully listed.",
        confirmButtonColor: "#0ea5e9",
      });
    } catch (err) {
      console.error(err);
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to post the job. Please try again.",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <section className="mb-8 bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100 p-8 rounded-2xl shadow-lg border border-sky-200 hover:shadow-xl transition-all duration-300">
      <h3 className="text-2xl font-bold text-sky-700 mb-6 text-center">
        🚀 Post a New Job Opening
      </h3>

      <form
        onSubmit={onSubmit}
        className="grid gap-5 text-gray-700 font-medium"
      >
        <div>
          <label className="block mb-1 text-sm text-sky-700 font-semibold">
            Job Title
          </label>
          <input
            name="title"
            placeholder="e.g. Frontend Developer"
            value={form.title}
            onChange={onChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-300 shadow-sm transition"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-sky-700 font-semibold">
            Job Description
          </label>
          <textarea
            name="description"
            placeholder="Describe the role and responsibilities..."
            value={form.description}
            onChange={onChange}
            rows={4}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-300 shadow-sm transition"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block mb-1 text-sm text-sky-700 font-semibold">
              Application Deadline
            </label>
            <input
              name="lastDate"
              type="date"
              value={form.lastDate}
              onChange={onChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-300 shadow-sm transition"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-sky-700 font-semibold">
              Company Name
            </label>
            <input
              name="company"
              placeholder="e.g. Google, Infosys"
              value={form.company}
              onChange={onChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-300 shadow-sm transition"
            />
          </div>
        </div>

        <button
          type="submit"a
          className="py-3 mt-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-lg font-semibold hover:from-sky-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-[1.02]"
        >
          ✨ Submit Job
        </button>
      </form>
    </section>
  );
}
