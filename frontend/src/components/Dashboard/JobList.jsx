import React, { useEffect, useState } from "react";
import API from "../../api";
import { format } from "date-fns";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    lastDate: "",
    company: "",
  });

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const startEdit = (job) => {
    setEditing(job._id);
    setForm({
      title: job.title,
      description: job.description || "",
      lastDate: job.lastDate ? job.lastDate.split("T")[0] : "",
      company: job.company || "",
    });
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm({ title: "", description: "", lastDate: "", company: "" });
  };

  const saveEdit = async (id) => {
    try {
      await API.put("/jobs/" + id, form);
      await fetchJobs();
      cancelEdit();
      MySwal.fire({
        icon: "success",
        title: "Updated Successfully!",
        text: "The job details have been updated.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      MySwal.fire("Error", "Failed to update job.", "error");
    }
  };

  const deleteJob = async (id) => {
    const result = await MySwal.fire({
      title: "Delete Job?",
      text: "Are you sure you want to delete this job?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
    });

    if (result.isConfirmed) {
      try {
        await API.delete("/jobs/" + id);
        fetchJobs();
        MySwal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The job has been removed.",
          timer: 1200,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error(err);
        MySwal.fire("Error", "Failed to delete job.", "error");
      }
    }
  };

  return (
    <section className="bg-gradient-to-br from-sky-50 via-white to-blue-50 p-8 rounded-2xl shadow-lg border border-sky-100">
      <h3 className="text-3xl font-extrabold text-sky-700 mb-6 text-center tracking-tight">
        🌟 Your Posted Jobs
      </h3>

      {jobs.length === 0 ? (
        <p className="text-gray-500 text-center italic">
          No jobs posted yet. Start adding some amazing roles!
        </p>
      ) : (
        <ul className="space-y-6">
          {jobs.map((job) => (
            <li
              key={job._id}
              className="bg-white p-6 border border-sky-100 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out"
            >
              {editing === job._id ? (
                <div className="grid gap-3">
                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                  <input
                    type="date"
                    value={form.lastDate}
                    onChange={(e) =>
                      setForm({ ...form, lastDate: e.target.value })
                    }
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                  <input
                    value={form.company}
                    onChange={(e) =>
                      setForm({ ...form, company: e.target.value })
                    }
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    rows={3}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />

                  <div className="flex gap-4 mt-3">
                    <button
                      onClick={() => saveEdit(job._id)}
                      className="flex-1 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all shadow-sm"
                    >
                      💾 Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex-1 py-2 bg-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-400 transition-all shadow-sm"
                    >
                      ✖ Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h4 className="text-2xl font-bold text-sky-800 mb-1">
                    {job.title}
                  </h4>
                  <p className="text-gray-700 mb-2">{job.description}</p>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <strong className="text-sky-600">🏢 Company:</strong>{" "}
                      {job.company}
                    </p>
                    <p>
                      <strong className="text-sky-600">📅 Last Date:</strong>{" "}
                      {job.lastDate
                        ? format(new Date(job.lastDate), "dd MMM yyyy")
                        : "—"}
                    </p>
                  </div>

                  <div className="mt-4 flex gap-4">
                    <button
                      onClick={() => startEdit(job)}
                      className="flex-1 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-semibold rounded-lg shadow-md hover:from-yellow-500 hover:to-amber-600 transition-all"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => deleteJob(job._id)}
                      className="flex-1 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-pink-700 transition-all"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
