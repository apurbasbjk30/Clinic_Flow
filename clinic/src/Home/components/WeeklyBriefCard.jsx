import React, { useEffect, useState } from "react";
import Papa from "papaparse";

export default function WeeklyBriefCard() {
  const [brief, setBrief] = useState(null);

  useEffect(() => {
    const fetchCSV = async () => {
      const response = await fetch("../../../public/clinic_facebook_leads (1).csv");
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data;
          // huhi

          const totalLeads = data.length;
          const totalBookings = data.filter((row) => row.Appointment_Booked === "1").length;
          const conversionRate = totalLeads > 0 ? ((totalBookings / totalLeads) * 100).toFixed(1) + "%" : "0%";

          // Average Lead Score
          const scores = data.map((row) => parseFloat(row.Lead_Score) || 0);
          const avgLeadScore =
            scores.length > 0
              ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
              : 0;

          // Top 3 Actions (simple example)
          const campaignCounts = {};
          data.forEach((row) => {
            if (!campaignCounts[row.Ad_Campaign_Name]) campaignCounts[row.Ad_Campaign_Name] = 0;
            campaignCounts[row.Ad_Campaign_Name] += 1;
          });
          const topCampaign = Object.entries(campaignCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([name]) => name)[0];

          const topActions = [
            `Focus on leads from ${topCampaign}`,
            "Send follow-up reminders for pending leads",
            "Optimize ad creatives based on engagement",
          ];

          setBrief({ totalLeads, totalBookings, conversionRate, avgLeadScore, topActions });
        },
      });
    };

    fetchCSV();
  }, []);

  if (!brief) return <p>Loading Weekly Brief...</p>;

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Weekly Growth Brief", 10, 20);
    doc.setFontSize(12);
    doc.text(`Total Leads: ${brief.totalLeads}`, 10, 40);
    doc.text(`Total Bookings: ${brief.totalBookings}`, 10, 50);
    doc.text(`Conversion Rate: ${brief.conversionRate}`, 10, 60);

    doc.text("Top Actions:", 10, 80);
    brief.topActions.forEach((action, idx) => {
      doc.text(`${idx + 1}. ${action}`, 10, 90 + idx * 10);
    });

    doc.save("weekly_brief.pdf");
  };

  const handleExportHTML = () => {
    const htmlContent = `
      <html>
        <head><title>Weekly Growth Brief</title></head>
        <body>
          <h2>Weekly Growth Brief</h2>
          <p>Total Leads: ${brief.totalLeads}</p>
          <p>Total Bookings: ${brief.totalBookings}</p>
          <p>Conversion Rate: ${brief.conversionRate}</p>
          <h3>Top Actions:</h3>
          <ol>
            ${brief.topActions.map((a) => `<li>${a}</li>`).join("")}
          </ol>
        </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "weekly_brief.html";
    link.click();
  };

  return (
    <div className="mt-6 bg-white shadow-lg rounded-lg p-4">
      <h2 className="font-semibold mb-2">Weekly Growth Brief</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        <div className="bg-gray-100 p-3 rounded">
          <p className="text-gray-500 text-sm">Total Leads</p>
          <p className="text-lg font-bold">{brief.totalLeads}</p>
        </div>
        <div className="bg-gray-100 p-3 rounded">
          <p className="text-gray-500 text-sm">Total Bookings</p>
          <p className="text-lg font-bold">{brief.totalBookings}</p>
        </div>
        <div className="bg-gray-100 p-3 rounded">
          <p className="text-gray-500 text-sm">Conversion Rate</p>
          <p className="text-lg font-bold">{brief.conversionRate}</p>
        </div>
        {/* <div className="bg-gray-50 p-3 rounded">
          <p className="text-gray-500 text-sm">Avg Lead Score</p>
          <p className="text-lg font-bold">{brief.avgLeadScore}</p>
        </div> */}
      </div>
      <div className="mt-4">
        <p className="font-semibold">Top 3 Actions:</p>
        <ol className="list-decimal list-inside">
          {brief.topActions.map((action, idx) => (
            <li key={idx}>{action}</li>
          ))}
        </ol>
      </div>
      <button
        onClick={handleExportPDF}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2"
      >
        Export PDF
      </button>
      <button
        onClick={handleExportHTML}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
      >
        Export HTML
      </button>
    </div>
  );
}
