import React from "react";

export default function LeadsTable() {
  const leads = [
    { name: "Riya Sharma", source: "Facebook", score: 89, status: "Pending" },
    { name: "Arjun Das", source: "Instagram", score: 72, status: "Booked" },
  ];

  return (
    <div className="mt-6 bg-white shadow-lg rounded-lg p-4">
      <h2 className="font-semibold mb-2">Lead's Potential Score</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Source</th>
            <th className="px-4 py-2">Score</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, idx) => (
            <tr key={idx} className="text-center border-b hover:bg-gray-50">
              <td className="px-4 py-2">{lead.name}</td>
              <td className="px-4 py-2">{lead.source}</td>
              <td className="px-4 py-2">{lead.score}</td>
              <td className="px-4 py-2">{lead.status}</td>
              <td className="px-4 py-2">
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">
                  Book
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
