import React, { useState, useEffect } from "react";
import Papa from "papaparse";

export default function LeadsTable() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCSV = async () => {
      setLoading(true);
      const response = await fetch("../../assets/clinic_facebook_leads.csv"); // public/leads.csv
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: async function (results) {
          const processedLeads = [];

          for (const lead of results.data) {
            const leadData = {
              Ad_Campaign_Name: 0,
              Ad_Set_Name: 0,
              Gender: lead.Gender === "Male" ? 0 : lead.Gender === "Female" ? 1 : 2,
              Age: parseInt(lead.Age),
              Location: 0,
              Treatment_Interest: 0,
              Preferred_Slot: 0,
              Ad_Spend: parseFloat(lead.Ad_Spend || 0),
              Impressions: parseInt(lead.Impressions || 0),
              Clicks: parseInt(lead.Clicks || 0),
              CTR: parseFloat(lead.CTR || 0),
              CPC: parseFloat(lead.CPC || 0),
              Response_Time: parseInt(lead.Response_Time || 0),
              No_of_Followups: parseInt(lead.No_of_Followups || 0),
              Engagement_Score: parseInt(lead.Engagement_Score || 0),
              Consent_Status: lead.Consent_Status === "True" ? 1 : 0,
              Appointment_Booked: lead.Appointment_Booked === "1" ? 1 : 0,
            };

            // Call backend API
            const response = await fetch("http://127.0.0.1:8000/predict_lead_score", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(leadData),
            });
            const data = await response.json();

            processedLeads.push({
              name: lead.Name || "N/A",
              source: lead.Source || "Facebook",
              score: data.lead_score,
              status: lead.Appointment_Booked === "1" ? "Booked" : "Pending",
            });
          }

          setLeads(processedLeads);
          setLoading(false);
        },
      });
    };

    fetchCSV();
  }, []); // empty dependency → runs once on mount

  return (
    <div className="mt-6 bg-white shadow-lg rounded-lg p-4">
      <h2 className="font-semibold mb-2">Lead's Potential Score</h2>
      {loading && <p>Processing leads...</p>}

      {leads.length > 0 && (
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
                <td className="px-4 py-2">{lead.score.toFixed(2)}</td>
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
      )}
    </div>
  );
}