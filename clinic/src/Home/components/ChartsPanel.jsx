import React, { useEffect, useState } from "react";
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
import Papa from "papaparse";

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

export default function ChartsPanel({ filter }) {
  const [lineData, setLineData] = useState(null);
  const [slotData, setSlotData] = useState(null);

  const getFileName = () => {
    const { year, month, week } = filter || {};
    if (year === "2025" && month === "January") {
      switch (week) {
        case "Week 1":
          return "./weeklly/2025-01-01.csv";
        case "Week 2":
          return "./weeklly/2025-01-08.csv";
        case "Week 3":
          return "./weeklly/2025-01-15.csv";
        case "Week 4":
          return "./weeklly/2025-01-23.csv";
        default:
          return null;
      }
    }
    return null;
  };

  useEffect(() => {
    const fileName = getFileName();
    if (!fileName) return;

    const fetchCSV = async () => {
      try {
        const response = await fetch(`/${fileName}`);
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const data = results.data;

            // ----- Line Chart: Leads vs Bookings per day -----
            const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
            const leadsPerDay = Array(7).fill(0);
            const bookingsPerDay = Array(7).fill(0);

            data.forEach((row) => {
              const date = new Date(row.Lead_Date);
              const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;
              leadsPerDay[dayIndex] += 1;
              if (row.Appointment_Booked === "1") bookingsPerDay[dayIndex] += 1;
            });

            setLineData({
              labels: days,
              datasets: [
                { label: "Leads", data: leadsPerDay, borderColor: "blue", fill: false },
                { label: "Bookings", data: bookingsPerDay, borderColor: "green", fill: false },
              ],
            });

            // ----- Bar Chart: Slot Popularity -----
            const slots = ["Morning", "Afternoon", "Evening"];
            const slotCounts = Array(slots.length).fill(0);

            data.forEach((row) => {
              const slotIndex = slots.indexOf(row.Preferred_Slot);
              if (slotIndex !== -1 && row.Appointment_Booked === "1") {
                slotCounts[slotIndex] += 1;
              }
            });

            setSlotData({
              labels: slots,
              datasets: [
                {
                  label: "Bookings",
                  data: slotCounts,
                  backgroundColor: ["#3B82F6", "#60A5FA", "#2563EB"],
                },
              ],
            });
          },
        });
      } catch (err) {
        console.error("Error loading CSV:", err);
      }
    };

    fetchCSV();
  }, [filter]);

  const lineOptions = { responsive: true, plugins: { legend: { position: "top" } } };
  const slotOptions = { responsive: true, plugins: { legend: { display: false } } };

  return (
    <div className="mt-6 grid grid-cols-1 gap-6">
      {lineData && (
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="font-semibold mb-2">Leads vs Bookings (Weekly)</h2>
          <Line data={lineData} options={lineOptions} redraw />
        </div>
      )}

      {slotData && (
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="font-semibold mb-2">Slot Popularity</h2>
          <Bar data={slotData} options={slotOptions} />
        </div>
      )}
    </div>
  );
}
