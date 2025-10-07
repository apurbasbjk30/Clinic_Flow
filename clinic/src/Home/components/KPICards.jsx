//  "../../assets/social_media_ad_optimization.csv"
 import React, { useEffect, useState } from "react";
import Papa from "papaparse";

export default function KPICards() {
  const [kpi, setKpi] = useState({
    totalLeads: 0,
    bookingsConfirmed: 0,
    conversionRate: "0%",
    avgLeadScore: 0,
    consentRate: "0%",
  });

  useEffect(() => {
    Papa.parse("../../assets/clinic_facebook_leads.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        let data = result.data;
        if (!data || data.length === 0) return;

        // Clean headers and handle string conversions
        data = data.map((d) => ({
          Lead_ID: d["Lead_ID"]?.trim(),
          Lead_Score: parseFloat(d["Lead_Score"]) || 0,
          Appointment_Booked:
            d["Appointment_Booked"] === "1" ||
            d["Appointment_Booked"] === 1
              ? 1
              : 0,
          Consent_Status:
            d["Consent_Status"] === true ||
            d["Consent_Status"] === "TRUE" ||
            d["Consent_Status"] === "True" ||
            d["Consent_Status"] === "1",
        }));

        const totalLeads = data.filter((d) => d.Lead_ID).length;
        const bookingsConfirmed = data.filter((d) => d.Appointment_Booked === 1).length;
        const conversionRate =
          totalLeads > 0 ? ((bookingsConfirmed / totalLeads) * 100).toFixed(1) + "%" : "0%";

        const avgLeadScore =
          totalLeads > 0
            ? (data.reduce((sum, d) => sum + d.Lead_Score, 0) / totalLeads).toFixed(1)
            : 0;

        const consentCount = data.filter((d) => d.Consent_Status).length;
        const consentRate =
          totalLeads > 0 ? ((consentCount / totalLeads) * 100).toFixed(1) + "%" : "0%";

        setKpi({
          totalLeads,
          bookingsConfirmed,
          conversionRate,
          avgLeadScore,
          consentRate,
        });
      },
    });
  }, []);

  const cards = [
    { title: "Total Leads", value: kpi.totalLeads },
    { title: "Bookings Confirmed", value: kpi.bookingsConfirmed },
    { title: "Conversion Rate", value: kpi.conversionRate },
    { title: "Avg Lead Score", value: kpi.avgLeadScore },
    { title: "Consent Rate", value: kpi.consentRate },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-24">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center"
        >
          <h2 className="text-gray-500 text-sm">{card.title}</h2>
          <p className="text-2xl font-bold text-blue-600">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
