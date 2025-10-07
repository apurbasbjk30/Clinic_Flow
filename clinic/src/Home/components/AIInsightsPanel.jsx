import React from "react";
import { LightBulbIcon } from "@heroicons/react/24/outline";

export default function AIInsightsPanel() {
  const insights = [
    { text: "Focus on FB leads from Ad Campaign A for higher conversion", type: "positive" },
    { text: "Instagram leads have lower booking probability", type: "warning" },
    { text: "Leads with score > 80 convert 70% faster", type: "positive" },
  ];

  const colors = {
    positive: "text-green-500",
    warning: "text-yellow-500",
    negative: "text-red-500",
  };

  return (
    <div className="mt-6 bg-white shadow-lg rounded-lg p-4">
      <h2 className="font-semibold mb-2">AI Insights</h2>
      {insights.map((insight, idx) => (
        <div
          key={idx}
          className="flex items-center space-x-2 p-2 mb-2 border rounded hover:bg-gray-50"
        >
          <LightBulbIcon className={`h-5 w-5 ${colors[insight.type]}`} />
          <p className="text-gray-700">{insight.text}</p>
        </div>
      ))}
    </div>
  );
}
