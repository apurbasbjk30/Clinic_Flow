import React, { useEffect, useState } from "react";
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
import Papa from "papaparse";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BookingImpactChart({ filter }) {
  const [data, setData] = useState(null);

  const getFileName = () => {
    const { year, month, week } = filter || {};
    if (year === "2025" && month === "January") {
      switch (week) {
        case "Week 1": return "./weeklly/2025-01-01.csv";
        case "Week 2": return "./weeklly/2025-01-08.csv";
        case "Week 3": return "./weeklly/2025-01-15.csv";
        case "Week 4": return "./weeklly/2025-01-22.csv";
        default: return null;
      }
    }
    return null;
  };

  useEffect(() => {
    const fileName = getFileName();
    if (!fileName) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`/${fileName}`);
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const rows = results.data;

            // ----- Choose parameters dynamically per week -----
            let parameters = [];
            if (filter.week === "Week 1") {
              parameters = ["Lead Score", "Time of Day", "Previous Booking Status","Treatment_Interest", "Gender", "Preferred_Slot", "Frequency of Visits", "Age Group", "Occupation"];
            } else if (filter.week === "Week 2") {
              parameters = ["Lead Score", "Time of Day", "Previous Booking Status","Treatment_Interest", "Gender", "Preferred_Slot", "Frequency of Visits", "Age Group", "Occupation"];
            } else if (filter.week === "Week 3") {
              parameters = ["Lead Score", "Time of Day", "Previous Booking Status","Treatment_Interest", "Gender", "Preferred_Slot", "Frequency of Visits", "Age Group", "Occupation"];
            } else {
              parameters = ["Lead Score", "Time of Day", "Previous Booking Status","Treatment_Interest", "Gender", "Preferred_Slot", "Frequency of Visits", "Age Group", "Occupation"];
            }

            // Calculate mock impact values
            const impactValues = parameters.map((param) => {
              const total = rows.length;
              const booked = rows.filter((r) => r.Appointment_Booked === "1").length;

              // Random variation to simulate parameter influence
              const randomFactor = Math.random() * 0.15;
              return Math.min(1, booked / total + randomFactor);
            });

            setData({
              labels: parameters,
              datasets: [
                {
                  label: "Impact on Booking Probability",
                  data: impactValues,
                  backgroundColor: ["#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#0EA5E9", "#F87171"],
                  borderRadius: 5,
                },
              ],
            });
          },
        });
      } catch (err) {
        console.error("Error loading CSV:", err);
      }
    };

    fetchData();
  }, [filter]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Parameters Affecting Bookings", font: { size: 18 } },
      tooltip: {
        callbacks: {
          label: (context) => `${(context.raw * 100).toFixed(1)}% impact`,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 1,
        ticks: { callback: (val) => val * 100 + "%" },
      },
    },
  };

  if (!data) return <p className="mt-6 text-gray-500">Loading chart...</p>;

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mt-6" style={{ height: "500px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}
