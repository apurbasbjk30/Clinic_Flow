import React, { useState } from "react";
import { BellIcon, FunnelIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function Navbar({ onSearch, toggleNotifications, onFilterChange }) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [week, setWeek] = useState("");

  // Generate years dynamically (e.g., 2022–2025)
  const years = [2022, 2023, 2024, 2025];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

  // Handle filter updates
  const handleFilterChange = (type, value) => {
    if (type === "year") setYear(value);
    if (type === "month") setMonth(value);
    if (type === "week") setWeek(value);

    onFilterChange?.({
      year: type === "year" ? value : year,
      month: type === "month" ? value : month,
      week: type === "week" ? value : week,
    });
  };

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

        {/* Filter Dropdown */}
        <div className="relative cursor-pointer" onClick={() => setFilterOpen(!filterOpen)}>
          <FunnelIcon className="h-6 w-6 text-gray-600 hover:text-blue-600" />
          {filterOpen && (
            <div className="absolute right-0 top-8 border rounded-md shadow-md p-3 bg-white w-60 z-50 space-y-2">
              <label className="block text-sm text-gray-600 font-medium">Year</label>
              <select
                value={year}
                onChange={(e) => handleFilterChange("year", e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="">Select Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>

              <label className="block text-sm text-gray-600 font-medium">Month</label>
              <select
                value={month}
                onChange={(e) => handleFilterChange("month", e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="">Select Month</option>
                {months.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>

              <label className="block text-sm text-gray-600 font-medium">Week</label>
              <select
                value={week}
                onChange={(e) => handleFilterChange("week", e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="">Select Week</option>
                {weeks.map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative cursor-pointer" onClick={toggleNotifications}>
          <BellIcon className="h-6 w-6 text-gray-600 hover:text-blue-600" />
        </div>

        {/* User Icon */}
        <UserCircleIcon className="h-6 w-6 text-gray-600 cursor-pointer" />
      </div>
    </nav>
  );
}
