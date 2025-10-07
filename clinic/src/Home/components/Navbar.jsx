import React, { useState } from "react";
import { BellIcon, CalendarDaysIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function Navbar({ onSearch, toggleNotifications }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <nav className="flex justify-between items-center bg-white shadow px-6 py-4 fixed top-0 w-full z-50">
      <div className="flex items-center space-x-3">
        <h1 className="text-2xl font-bold text-blue-600">ClinicFlow</h1>
        <span className="text-gray-500">Dashboard</span>
      </div>

      <div className="flex items-center space-x-4 relative">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search leads..."
          className="border rounded-md p-2 w-64"
          onChange={(e) => onSearch(e.target.value)}
        />

        {/* Calendar Icon */}
        <div
          className="relative cursor-pointer"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <CalendarDaysIcon className="h-6 w-6 text-gray-600 hover:text-blue-600" />

          {/* Small popup date picker */}
          {showCalendar && (
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="absolute right-0 top-8 border rounded-md shadow-md p-2 bg-white z-50"
            />
          )}
        </div>

        {/* Bell Icon */}
        <div className="relative cursor-pointer" onClick={toggleNotifications}>
          <BellIcon className="h-6 w-6 text-gray-600 hover:text-blue-600" />
        </div>

        {/* User Icon */}
        <UserCircleIcon className="h-6 w-6 text-gray-600 cursor-pointer" />
      </div>
    </nav>
  );
}
