import React, { useState, useEffect } from "react";
import Papa from "papaparse";

export default function LeadsTable({ searchQuery }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCSV = async () => {
      setLoading(true);
      const response = await fetch("../../../public/clinic_facebook_leads (1).csv");
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const processedLeads = results.data.map((lead) => {
            const score = calculateLeadScore(lead);
            return {
              name: lead.Name || "N/A",
              score,
              status: lead.Appointment_Booked === "1" ? "Booked" : "Pending",
            };
          });

          setLeads(processedLeads);
          setLoading(false);
        },
      });
    };

    fetchCSV();
  }, []);

  const calculateLeadScore = (lead) => {
    const engagement = parseFloat(lead.Engagement_Score) || 0;
    const responseTime = parseFloat(lead["Response_Time (mins)"]) || 0;
    const followups = parseFloat(lead.No_of_Followups) || 0;
    let score = 0.4 * engagement + 0.3 * (100 - responseTime / 2) + 0.3 * (5 - followups) * 10;
    return Math.max(0, Math.min(100, score));
  };

  const handleBook = (index) => {
    setLeads((prevLeads) => {
      const updatedLeads = [...prevLeads];
      updatedLeads[index].status = "Booked";
      return updatedLeads;
    });
  };

  // ✅ Filter by search
  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-24 bg-white shadow-lg rounded-lg p-4">
      <h2 className="font-semibold mb-2">Lead's Potential Score</h2>
      {loading && <p>Processing leads...</p>}

      {!loading && filteredLeads.length === 0 && (
        <p className="text-gray-500">No leads found for "{searchQuery}"</p>
      )}

      {filteredLeads.length > 0 && (
        <div className="overflow-x-auto border rounded-lg border-gray-200">
          <div className="max-h-[700px] overflow-y-auto">
            <table className="min-w-full table-auto text-sm">
              <thead className="sticky top-0 bg-gray-100 z-10">
                <tr>
                  <th className="px-12 py-2 text-left">Name</th>
                  <th className="px-12 py-2 text-left">Score</th>
                  <th className="px-12 py-2 text-left">Status</th>
                  <th className="px-12 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50 transition-colors text-center">
                    <td className="px-4 py-2">{lead.name}</td>
                    <td className="px-4 py-2">{lead.score.toFixed(2)}</td>
                    <td
                      className={`px-4 py-2 font-medium ${
                        lead.status === "Booked"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {lead.status}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleBook(idx)}
                        className={`px-3 py-1 rounded-md transition ${
                          lead.status === "Booked"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                        disabled={lead.status === "Booked"}
                      >
                        {lead.status === "Booked" ? "Booked" : "Book"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
