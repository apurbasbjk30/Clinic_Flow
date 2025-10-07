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
  const [lineData, setLineData] = useState(null);
  const [slotData, setSlotData] = useState(null);

  useEffect(() => {
    const fetchCSV = async () => {
      const response = await fetch("../../../public/clinic_facebook_leads (1).csv");
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
            const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1; // convert Sunday=0 to index=6
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
                      backgroundColor: ["#3B82F6", "#60A5FA", "#2563EB"], // different shades for each slot
                    },
                  ],
                });


          // data.forEach((row) => {
          //   const slotIndex = slots.indexOf(row.Preferred_Slot);
          //   if (slotIndex !== -1 && row.Appointment_Booked === "1") {
          //     slotCounts[slotIndex] += 1;
          //   }
          // });

          // setSlotData({
          //   labels: slots,
          //   datasets: [
          //     {
          //       label: "Bookings",
          //       data: slotCounts,
          //       backgroundColor: [
          //         "#DBEAFE",
          //         "#BFDBFE",
          //         "#93C5FD",
          //         "#60A5FA",
          //         "#3B82F6",
          //         "#2563EB",
          //         "#1D4ED8",
          //       ],
          //     },
          //   ],
          // });
        },
      });
    };

    fetchCSV();
  }, []);

  const lineOptions = { responsive: true, plugins: { legend: { position: "top" } } };
  const slotOptions = { responsive: true, plugins: { legend: { display: false } } };

  return (
    <div className="mt-6 grid grid-cols-1 gap-6">
      {/* Leads vs Bookings Line Chart */}
      {lineData && (
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="font-semibold mb-2">Leads vs Bookings (Weekly)</h2>
          <Line data={lineData} options={lineOptions} redraw />
        </div>
      )}

      {/* Slot Popularity Bar Chart */}
      {slotData && (
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="font-semibold mb-2">Slot Popularity</h2>
          <Bar data={slotData} options={slotOptions} />
        </div>
      )}
    </div>
  );
}
