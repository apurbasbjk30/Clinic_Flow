import React from "react";

export default function KPICards() {
  const cards = [
    { title: "Total Leads", value: 120 },
    { title: "Bookings Confirmed", value: 45 },
    { title: "Conversion Rate", value: "37.5%" },
    { title: "Avg Lead Score", value: 82 },
    { title: "Consent Rate", value: "95%" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-24">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
          <h2 className="text-gray-500 text-sm">{card.title}</h2>
          <p className="text-2xl font-bold text-blue-600">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
