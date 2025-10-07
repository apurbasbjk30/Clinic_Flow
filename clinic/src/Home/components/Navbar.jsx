import React from "react";
import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-white shadow px-6 py-4 fixed top-0 w-full z-50">
      <div className="flex items-center space-x-3">
        <h1 className="text-2xl font-bold text-blue-600">ClinicFlow</h1>
        <span className="text-gray-500">Dashboard</span>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search leads..."
          className="border rounded-md p-2 w-64"
        />
        <div className="relative cursor-pointer">
          <BellIcon className="h-6 w-6 text-gray-600" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>
        <UserCircleIcon className="h-6 w-6 text-gray-600 cursor-pointer" />
      </div>
    </nav>
  );
}
