import React, { useState } from "react";
import Navbar from "./components/Navbar";
import KPICards from "./components/KPICards";
import ChartsPanel from "./components/ChartsPanel";
import LeadsTable from "./components/LeadsTable";
import AIInsightsPanel from "./components/AIInsightsPanel";
import SlotRecommendations from "./components/SlotRecommendations";
import NotificationsPanel from "./components/NotificationsPanel";
import WeeklyBriefCard from "./components/WeeklyBriefCard";
import CSVUploadPanel from "./components/CSVUploadPanel";
import BookingImpactChart from "./components/BookingImpactChart";
import WeeklyFeatureImportance from "./components/WeeklyFeatureImportance";

export default function Dashboard() {
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar toggleNotifications={toggleNotifications} />

      {/* Render NotificationsPanel only if showNotifications is true */}
     
      <div className="max-w-7xl mx-auto px-6 py-6 mt-24">
         {showNotifications && <NotificationsPanel />}
        <KPICards />
        <div className="grid md:grid-cols-2 gap-6">
          <ChartsPanel />
          <LeadsTable />
        </div>
        <BookingImpactChart />
        <div className="grid md:grid-cols-2 gap-6">
          <AIInsightsPanel />
          <SlotRecommendations />
          <WeeklyFeatureImportance />
        </div>
        <WeeklyBriefCard />
      </div>
    </div>
  );
}
