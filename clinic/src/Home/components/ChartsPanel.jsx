import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

// Register chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartsPanel() {
  // Line Chart - Leads vs Bookings
  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      { label: "Leads", data: [12, 19, 15, 22, 18, 25, 20], borderColor: "blue", fill: false },
      { label: "Bookings", data: [5, 7, 6, 10, 8, 12, 9], borderColor: "green", fill: false },
    ],
  };
  const lineOptions = { responsive: true, plugins: { legend: { position: "top" } } };

  // Bar Chart - Slot Popularity Heatmap (simulated)
  const slotData = {
    labels: ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM"],
    datasets: [
      {
        label: "Bookings",
        data: [5, 12, 8, 15, 10, 7, 4],
        backgroundColor: [
          "#DBEAFE",
          "#BFDBFE",
          "#93C5FD",
          "#60A5FA",
          "#3B82F6",
          "#2563EB",
          "#1D4ED8",
        ],
      },
    ],
  };
  const slotOptions = { responsive: true, plugins: { legend: { display: false } } };

  return (
    <div className="mt-6 grid grid-cols-1 gap-6">
      {/* Leads vs Bookings Line Chart */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="font-semibold mb-2">Leads vs Bookings (Weekly)</h2>
        <Line data={lineData} options={lineOptions} redraw />
      </div>

      {/* Slot Popularity Heatmap */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="font-semibold mb-2">Slot Popularity</h2>
        <Bar data={slotData} options={slotOptions} />
      </div>
    </div>
  );
}
