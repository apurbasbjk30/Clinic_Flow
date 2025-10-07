import React from "react";

export default function WeeklyBriefCard() {
  const brief = {
    totalLeads: 120,
    totalBookings: 45,
    conversionRate: "37.5%",
    avgLeadScore: 82,
    topActions: [
      "Focus on Facebook leads from Campaign A",
      "Send follow-up reminders for pending leads",
      "Optimize Instagram ad creatives",
    ],
  };

  return (
    <div className="mt-6 bg-white shadow-lg rounded-lg p-4">
      <h2 className="font-semibold mb-2">Weekly Growth Brief</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-gray-500 text-sm">Total Leads</p>
          <p className="text-lg font-bold">{brief.totalLeads}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-gray-500 text-sm">Total Bookings</p>
          <p className="text-lg font-bold">{brief.totalBookings}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-gray-500 text-sm">Conversion Rate</p>
          <p className="text-lg font-bold">{brief.conversionRate}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-gray-500 text-sm">Avg Lead Score</p>
          <p className="text-lg font-bold">{brief.avgLeadScore}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="font-semibold">Top 3 Actions:</p>
        <ol className="list-decimal list-inside">
          {brief.topActions.map((action, idx) => (
            <li key={idx}>{action}</li>
          ))}
        </ol>
      </div>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        Export PDF/HTML
      </button>
    </div>
  );
}
