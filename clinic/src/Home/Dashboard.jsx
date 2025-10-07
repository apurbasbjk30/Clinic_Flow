import React from "react";
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

export default function Dashboard() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-6 mt-24">
        <CSVUploadPanel />
        <NotificationsPanel />
        <KPICards />
        <div className="grid md:grid-cols-2 gap-6">
          <ChartsPanel />
          <LeadsTable />
        </div>
          <BookingImpactChart />

        <div className="grid md:grid-cols-2 gap-6">
          <AIInsightsPanel />
          <SlotRecommendations />
        </div>
        
        <WeeklyBriefCard />
      </div>
    </div>
  );
}
