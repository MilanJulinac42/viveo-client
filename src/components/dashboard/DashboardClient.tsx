/**
 * @fileoverview Main dashboard orchestrator component.
 * Manages active tab state and renders sidebar + content sections.
 * Desktop: sidebar + content area. Mobile: top tabs + content.
 */

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Container from "@/components/layout/Container";
import DashboardSidebar from "./DashboardSidebar";
import RequestsSection from "./RequestsSection";
import EarningsSection from "./EarningsSection";
import ProfileSettingsSection from "./ProfileSettingsSection";
import CalendarSection from "./CalendarSection";
import type {
  Celebrity,
  VideoRequest,
  EarningsSummary,
  AvailabilitySlot,
  DashboardTab,
} from "@/lib/types";

interface DashboardClientProps {
  /** Celebrity (logged-in user) data */
  celebrity: Celebrity;
  /** Video requests */
  requests: VideoRequest[];
  /** Earnings summary */
  earnings: EarningsSummary;
  /** Weekly availability */
  availability: AvailabilitySlot[];
}

/** Mobile tab configuration */
const MOBILE_TABS: { tab: DashboardTab; label: string; emoji: string }[] = [
  { tab: "requests", label: "Zahtevi", emoji: "📋" },
  { tab: "earnings", label: "Zarada", emoji: "📊" },
  { tab: "profile", label: "Profil", emoji: "👤" },
  { tab: "calendar", label: "Kalendar", emoji: "📅" },
];

/**
 * Dashboard master orchestrator.
 * Renders sidebar (desktop) or tab bar (mobile) + active section content.
 *
 * @param props - Celebrity data, requests, earnings, and availability
 * @returns Dashboard layout
 */
export default function DashboardClient({
  celebrity,
  requests,
  earnings,
  availability,
}: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<DashboardTab>("requests");

  return (
    <Container size="full">
      <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row">
        {/* Desktop sidebar */}
        <DashboardSidebar
          celebrity={celebrity}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          earnings={earnings}
        />

        {/* Main content area */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Mobile tab bar (hidden on lg+) */}
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
            <EarningsSection earnings={earnings} celebrity={celebrity} />
          )}
          {activeTab === "profile" && (
            <ProfileSettingsSection celebrity={celebrity} />
          )}
          {activeTab === "calendar" && (
            <CalendarSection availability={availability} />
          )}
        </div>
      </div>
    </Container>
  );
}
