import React, { useState } from "react";
import LeadsTable from "./LeadsTable";

export default function CSVUploadPanel() {
  const [file, setFile] = useState(null);
  const [leads, setLeads] = useState([]);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = () => {
    if (!file) {
      alert("Please select a CSV file first!");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      const text = event.target.result;
      const rows = text.split("\n").slice(1); // skip header
      const parsedLeads = rows.map((row) => {
        const cols = row.split(",");
        return {
          name: cols[1],
          source: cols[4],
          score: parseInt(cols[5], 10),
          status: cols[9] === "1" ? "Booked" : "Pending",
        };
      });
      setLeads(parsedLeads);
    };
    reader.readAsText(file);

    alert("CSV Uploaded Successfully!");
  };

  return (
    <div className="mt-6">
      <div className="bg-white shadow-lg rounded-lg p-4 flex items-center">
        <h2 className="font-semibold mr-4">Upload Leads CSV</h2>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button
          onClick={handleUpload}
          className="ml-4 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
        >
          Upload
        </button>
      </div>
      {file && <p className="mt-2 text-gray-600">Selected: {file.name}</p>}
      {leads.length > 0 && <LeadsTable leads={leads} />}
    </div>
  );
}
