import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register chart elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BookingImpactChart() {
  // Updated parameters affecting bookings
  const parameters = [
    // "Lead Source",
    "Lead Score",
    "Time of Day",
    "Previous Booking Status",
    "Frequency of Visits",
    "Age Group",
    "Occupation",
  ];

  // Mock influence values (0-1) for each parameter
  const impactValues = [ 0.5, 0.2, 0.45, 0.3, 0.25, 0.15];

  const data = {
    labels: parameters,
    datasets: [
      {
        label: "Impact on Booking Probability",
        data: impactValues,
        backgroundColor: [
        //   "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#0EA5E9",
          "#F87171",
        ],
        borderRadius: 5,
      },
    ],
  };

  const options = {
    indexAxis: "y", // horizontal bars
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Parameters Affecting Bookings",
        font: { size: 18 },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw * 100;
            return `${value.toFixed(1)}% impact`;
          },
        },
      },
    },
    scales: {
      x: {
        min: 0,
        max: 1,
        ticks: {
          callback: function (val) {
            return val * 100 + "%";
          },
        },
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mt-6">
      <Bar data={data} options={options} />
    </div>
  );
}
