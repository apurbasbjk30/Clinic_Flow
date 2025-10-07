import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function WeeklyFeatureImportance() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/weekly-reports")
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          setError(json.error);
        } else {
          setReports(json.reports);
        }
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading report...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Weekly Lead Feature Importance</h2>
      {reports.length === 0 ? (
        <p>No report data available.</p>
      ) : (
        reports.map((report) => (
          <div key={report.week} style={{ marginBottom: "40px" }}>
            <h3>{report.week}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={report.feature_importance} layout="vertical">
                <XAxis type="number" />
                <YAxis type="category" dataKey="Feature" />
                <Tooltip formatter={(value) => value.toFixed(2)} />
                <Bar dataKey="Importance" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ))
      )}
    </div>
  );
}
