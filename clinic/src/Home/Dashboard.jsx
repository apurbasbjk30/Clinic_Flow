import React, { useState } from "react";
import Navbar from "./components/Navbar";
import KPICards from "./components/KPICards";
import ChartsPanel from "./components/ChartsPanel";
import LeadsTable from "./components/LeadsTable";
import AIInsightsPanel from "./components/AIInsightsPanel";
import SlotRecommendations from "./components/SlotRecommendations";
import NotificationsPanel from "./components/NotificationsPanel";
import WeeklyBriefCard from "./components/WeeklyBriefCard";
import BookingImpactChart from "./components/BookingImpactChart";
import WeeklyFeatureImportance from "./components/WeeklyFeatureImportance";
import { HeartPulse, Stethoscope } from "lucide-react";

export default function Dashboard() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({
    year: "2025",
    month: "January",
    week: "Week 1",
  });

  const toggleNotifications = () => setShowNotifications((prev) => !prev);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* HEADER DECOR */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-b-[80px] shadow-lg"></div>

      {/* NAVBAR */}
      <Navbar
        onSearch={setSearchQuery}
        toggleNotifications={toggleNotifications}
        onFilterChange={setFilter}
      />

      {/* MAIN DASHBOARD */}
      <div className="relative max-w-7xl mx-auto px-6 py-10 mt-28 space-y-10">
        {/* Title */}
        <div className="flex items-center gap-3 text-blue-800 mb-6">
          <HeartPulse className="w-8 h-8 animate-pulse text-blue-600" />
          <h1 className="text-3xl font-bold tracking-tight">
            Clinic Performance Dashboard
          </h1>
        </div>

        {/* Notifications */}
        {showNotifications && (
          <div className="animate-fadeIn">
            <NotificationsPanel />
          </div>
        )}

        {/* KPI CARDS */}
        <section className="animate-fadeIn">
          <KPICards filter={filter} />
        </section>

        {/* CHARTS + LEADS */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-2xl shadow-md border border-blue-100 hover:shadow-lg transition">
            <ChartsPanel filter={filter} />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-md border border-blue-100 hover:shadow-lg transition">
            <LeadsTable searchQuery={searchQuery} filter={filter} />
          </div>
        </section>

        {/* BOOKING IMPACT */}
        <section className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-2xl shadow-md border border-blue-100 hover:shadow-lg transition">
          <BookingImpactChart filter={filter}/>
        </section>

        {/* INSIGHTS GRID */}
        <section className="grid lg:grid-cols-2 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-md border border-blue-100 hover:shadow-lg transition">
            <AIInsightsPanel />
          </div>
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-md border border-blue-100 hover:shadow-lg transition">
            <SlotRecommendations />
          </div>
          {/* <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-md border border-blue-100 hover:shadow-lg transition">
            <WeeklyFeatureImportance />
          </div> */}
        </section>

        {/* WEEKLY BRIEF */}
        <section className="bg-blue-50 p-8 rounded-3xl shadow-inner border border-blue-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-blue-700">
              Weekly AI Brief
            </h2>
            <p className="text-gray-600 mt-2">
              A concise summary of this week’s top performance drivers, feature
              importance, and AI recommendations.
            </p>
          </div>
          <Stethoscope className="w-12 h-12 text-blue-500" />
        </section>

        <WeeklyBriefCard />
      </div>

      {/* FOOTER */}
      <footer className="mt-16 text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} MedAI Analytics — Empowering Smart Clinics
      </footer>
    </div>
  );
}
