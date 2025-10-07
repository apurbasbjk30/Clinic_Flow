import React from "react";
import { BellIcon } from "@heroicons/react/24/outline";

export default function NotificationsPanel() {
  const notifications = [
    { text: "New lead from Facebook: Riya Sharma", type: "new" },
    { text: "Booking reminder: Arjun Das at 11:00 AM", type: "reminder" },
  ];

  const colors = {
    new: "bg-blue-100 text-blue-700",
    reminder: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="mt-6 bg-white shadow-lg rounded-lg p-4">
      <h2 className="font-semibold mb-2 flex items-center space-x-2">
        <BellIcon className="h-5 w-5 text-gray-600" />
        Notifications
      </h2>
      {notifications.map((n, idx) => (
        <div key={idx} className={`p-2 mb-2 rounded ${colors[n.type]}`}>
          {n.text}
        </div>
      ))}
    </div>
  );
}
