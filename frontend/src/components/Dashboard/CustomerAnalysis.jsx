import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function CustomerAnalysis() {
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "New Users",
        data: [12, 19, 7, 15, 22, 30],
        backgroundColor: "rgba(14,165,233,0.6)",
        borderRadius: 8,
      },
    ],
  };

  const pieData = {
    labels: ["Direct", "Referral", "Social"],
    datasets: [
      {
        data: [55, 25, 20],
        backgroundColor: [
          "rgba(14,165,233,0.8)",
          "rgba(59,130,246,0.7)",
          "rgba(96,165,250,0.6)",
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Applications",
        data: [20, 30, 25, 40],
        fill: false,
        borderColor: "rgba(14,165,233,0.9)",
        backgroundColor: "rgba(14,165,233,0.9)",
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, labels: { color: "#0c4a6e" } },
      tooltip: { backgroundColor: "#0ea5e9", titleColor: "#fff" },
    },
    scales: {
      x: { ticks: { color: "#0369a1" }, grid: { color: "#e0f2fe" } },
      y: { ticks: { color: "#0369a1" }, grid: { color: "#f0f9ff" } },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-100 p-6 rounded-2xl">
      <h2 className="text-3xl font-bold text-sky-700 mb-6 text-center drop-shadow-sm">
        Customer Analytics Dashboard 📊
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Bar Chart */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-sky-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
          <h4 className="text-sky-700 font-semibold mb-4 text-lg text-center">
            📈 Users Growth
          </h4>
          <Bar data={barData} options={chartOptions} />
        </div>

        {/* Pie Chart */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-sky-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
          <h4 className="text-sky-700 font-semibold mb-4 text-lg text-center">
            🌐 Traffic Sources
          </h4>
          <Pie data={pieData} options={chartOptions} />
        </div>

        {/* Line Chart */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-sky-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
          <h4 className="text-sky-700 font-semibold mb-4 text-lg text-center">
            🗓️ Applications by Week
          </h4>
          <Line data={lineData} options={chartOptions} />
        </div>
      </div>

      <footer className="text-center text-gray-500 text-sm mt-8">
        © 2025 Preksha Jain Dashboard — Insights that Empower 🚀
      </footer>
    </div>
  );
}
