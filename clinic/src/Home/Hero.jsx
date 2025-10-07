// src/components/Navbar.jsx
import React from "react";
import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center bg-white shadow px-6 py-4">
      <h1 className="text-xl font-bold text-blue-700">ClinicFlow Dashboard</h1>
      <div className="flex items-center space-x-4">
        <BellIcon className="h-6 w-6 text-gray-600 cursor-pointer" />
        <UserCircleIcon className="h-6 w-6 text-gray-600 cursor-pointer" />
      </div>
    </div>
  );
}
