import React from "react";

export default function SlotRecommendations() {
  const slots = [
    { time: "10:00 AM", available: true },
    { time: "11:00 AM", available: false },
    { time: "12:00 PM", available: true },
    { time: "01:00 PM", available: true },
  ];

  return (
    <div className="mt-6 bg-white shadow-lg rounded-lg p-4">
      <h2 className="font-semibold mb-2">Recommended Slots</h2>
      <div className="flex flex-wrap gap-2">
        {slots.map((slot, idx) => (
          <button
            key={idx}
            className={`px-3 py-1 rounded-md ${
              slot.available ? "bg-green-500 text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!slot.available}
          >
            {slot.time}
          </button>
        ))}
      </div>
    </div>
  );
}
