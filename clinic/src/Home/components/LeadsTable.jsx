import React, { useState, useEffect } from "react";
import Papa from "papaparse";
// import data from "../../../public/clinic_facebook_leads.csv";
export default function LeadsTable() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCSV = async () => {
      setLoading(true);
      const response = await fetch("../../../public/clinic_facebook_leads (1).csv"); // public folder
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const processedLeads = results.data.map((lead) => {
            const score = calculateLeadScore(lead);
            return {
              name: lead.Name || "N/A",
              // source: lead.Lead_Source || "Facebook",
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

  // Lead score function
  const calculateLeadScore = (lead) => {
    const engagement = parseFloat(lead.Engagement_Score) || 0;
    const responseTime = parseFloat(lead["Response_Time (mins)"]) || 0;
    const followups = parseFloat(lead.No_of_Followups) || 0;

    let score = 0.4 * engagement + 0.3 * (100 - responseTime / 2) + 0.3 * (5 - followups) * 10;
    score = Math.max(0, Math.min(100, score)); // clip 0-100
    return score;
  };
const handleBook = (index) => {
  // Update the status of the lead to "Booked"
  setLeads((prevLeads) => {
    const updatedLeads = [...prevLeads];
    updatedLeads[index].status = "Booked";
    return updatedLeads;
  });

  // Optional: You can also send a request to your backend to update database
  // fetch("/update_appointment", { method: "POST", body: JSON.stringify({lead_id: lead.id}) })
};

  return (
  <div className="mt-6 bg-white shadow-lg rounded-lg p-4">
    <h2 className="font-semibold mb-2">Lead's Potential Score</h2>
    {loading && <p>Processing leads...</p>}

    {leads.length > 0 && (
      <div className="overflow-x-auto border rounded-lg border-gray-200">
        {/* Set max height and enable vertical scrolling */}
        <div className="max-h-[700px] overflow-y-auto">
          <table className="min-w-full table-auto text-sm">
            <thead className="sticky top-0 bg-gray-100 z-10">
              <tr>
                <th className="px-12 py-2 text-left">Name</th>
                {/* <th className="px-4 py-2 text-left">Source</th> */}
                <th className="px-12 py-2 text-left">Score</th>
                <th className="px-12 py-2 text-left">Status</th>
                <th className="px-12 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, idx) => (
                <tr
                  key={idx}
                  className="border-b hover:bg-gray-50 transition-colors text-center"
                >
                  <td className="px-4 py-2">{lead.name}</td>
                  {/* <td className="px-4 py-2">{lead.source}</td> */}
                  <td className="px-4 py-2">
                    {lead.score !== null ? lead.score.toFixed(2) : "N/A"}
                  </td>
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
                      disabled={lead.status === "Booked"} // Disable if already booked
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