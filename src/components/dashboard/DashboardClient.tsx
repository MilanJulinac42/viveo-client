/**
 * @fileoverview Main dashboard orchestrator component.
 * Fetches dashboard data from API and manages tab navigation.
 */

"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Container from "@/components/layout/Container";
import DashboardSidebar from "./DashboardSidebar";
import RequestsSection from "./RequestsSection";
import EarningsSection from "./EarningsSection";
import ProfileSettingsSection from "./ProfileSettingsSection";
import CalendarSection from "./CalendarSection";
import {
  getDashboardRequests,
  getDashboardEarnings,
  getDashboardAvailability,
} from "@/lib/api/dashboard";
import { getCelebrity } from "@/lib/api/celebrities";
import { useAuth } from "@/context/AuthContext";
import type {
  Celebrity,
  VideoRequest,
  EarningsSummary,
  AvailabilitySlot,
  DashboardTab,
} from "@/lib/types";

/** Mobile tab configuration */
const MOBILE_TABS: { tab: DashboardTab; label: string; emoji: string }[] = [
  { tab: "requests", label: "Zahtevi", emoji: "📋" },
  { tab: "earnings", label: "Zarada", emoji: "📊" },
  { tab: "profile", label: "Profil", emoji: "👤" },
  { tab: "calendar", label: "Kalendar", emoji: "📅" },
];

export default function DashboardClient() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<DashboardTab>("requests");
  const [loading, setLoading] = useState(true);
  const [celebrity, setCelebrity] = useState<Celebrity | null>(null);
  const [requests, setRequests] = useState<VideoRequest[]>([]);
  const [earnings, setEarnings] = useState<EarningsSummary | null>(null);
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [reqData, earnData, availData] = await Promise.all([
          getDashboardRequests().catch(() => []),
          getDashboardEarnings().catch(() => null),
          getDashboardAvailability().catch(() => []),
        ]);
        setRequests(reqData);
        setEarnings(earnData);
        setAvailability(availData);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container size="full">
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-primary-500" />
            <p className="mt-4 text-sm text-slate-500">Učitavanje panela...</p>
          </div>
        </div>
      </Container>
    );
  }

  // Build a minimal celebrity object from auth user for sidebar
  const celebrityData: Celebrity = celebrity || {
    id: user?.id || "",
    name: user?.fullName || "Zvezda",
    slug: "",
    image: user?.avatarUrl || "",
    category: "",
    price: 0,
    rating: earnings?.averageRating || 0,
    reviewCount: 0,
    verified: true,
    bio: "",
    responseTime: 24,
  };

  const defaultEarnings: EarningsSummary = earnings || {
    totalEarnings: 0,
    completedRequests: 0,
    pendingRequests: 0,
    averageRating: 0,
    weeklyEarnings: [],
    monthlyEarnings: [],
    earningsByType: [],
  };

  return (
    <Container size="full">
      <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row">
        {/* Desktop sidebar */}
        <DashboardSidebar
          celebrity={celebrityData}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          earnings={defaultEarnings}
        />

        {/* Main content area */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Mobile tab bar */}
          <div className="mb-6 lg:hidden">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {MOBILE_TABS.map((tab) => (
                <button
                  key={tab.tab}
                  onClick={() => setActiveTab(tab.tab)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200",
                    activeTab === tab.tab
                      ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                      : "border border-slate-200 bg-white/80 text-slate-600 hover:bg-primary-50 hover:text-primary-700"
                  )}
                >
                  <span>{tab.emoji}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active section */}
          {activeTab === "requests" && <RequestsSection requests={requests} />}
          {activeTab === "earnings" && (
            <EarningsSection earnings={defaultEarnings} celebrity={celebrityData} />
          )}
          {activeTab === "profile" && (
            <ProfileSettingsSection celebrity={celebrityData} />
          )}
          {activeTab === "calendar" && (
            <CalendarSection availability={availability} />
          )}
        </div>
      </div>
    </Container>
  );
}
