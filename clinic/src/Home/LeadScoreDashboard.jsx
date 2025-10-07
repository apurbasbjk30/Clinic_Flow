import React, { useState } from "react";

export default function LeadScoreDashboard() {
  const [leadData, setLeadData] = useState({});
  const [leadScore, setLeadScore] = useState(null);

  const handleChange = (e) => {
    setLeadData({ ...leadData, [e.target.name]: e.target.value });
  };

  const handlePredict = async () => {
    const response = await fetch("http://127.0.0.1:8000/predict_lead_score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...leadData,
        Gender: parseInt(leadData.Gender),
        Age: parseInt(leadData.Age),
        Ad_Spend: parseFloat(leadData.Ad_Spend),
        Impressions: parseInt(leadData.Impressions),
        Clicks: parseInt(leadData.Clicks),
        CTR: parseFloat(leadData.CTR),
        CPC: parseFloat(leadData.CPC),
        Response_Time: parseInt(leadData.Response_Time),
        No_of_Followups: parseInt(leadData.No_of_Followups),
        Engagement_Score: parseInt(leadData.Engagement_Score),
        Consent_Status: parseInt(leadData.Consent_Status),
        Appointment_Booked: parseInt(leadData.Appointment_Booked)
      })
    });

    const data = await response.json();
    setLeadScore(data.lead_score);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lead Score Prediction</h2>
      <input name="Age" placeholder="Age" onChange={handleChange} />
      <input name="Gender" placeholder="Gender (0/1)" onChange={handleChange} />
      <input name="Ad_Spend" placeholder="Ad Spend" onChange={handleChange} />
      <input name="Impressions" placeholder="Impressions" onChange={handleChange} />
      <input name="Clicks" placeholder="Clicks" onChange={handleChange} />
      <input name="CTR" placeholder="CTR" onChange={handleChange} />
      <input name="CPC" placeholder="CPC" onChange={handleChange} />
      <input name="Response_Time" placeholder="Response Time" onChange={handleChange} />
      <input name="No_of_Followups" placeholder="No of Followups" onChange={handleChange} />
      <input name="Engagement_Score" placeholder="Engagement Score" onChange={handleChange} />
      <input name="Consent_Status" placeholder="Consent Status (0/1)" onChange={handleChange} />
      <input name="Appointment_Booked" placeholder="Booked (0/1)" onChange={handleChange} />
      <button onClick={handlePredict}>Predict Lead Score</button>

      {leadScore !== null && (
        <div>
          <h3>Predicted Lead Score: {leadScore.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
}