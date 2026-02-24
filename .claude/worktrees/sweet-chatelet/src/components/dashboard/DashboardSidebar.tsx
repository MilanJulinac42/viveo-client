/**
 * @fileoverview Sidebar navigation for the celebrity dashboard.
 * Shows celebrity identity, nav items, and quick stats on desktop.
 * Hidden on mobile — mobile uses top tab bar in DashboardClient.
 */

"use client";

import { cn, formatPrice } from "@/lib/utils";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import type { Celebrity, DashboardTab, EarningsSummary } from "@/lib/types";

interface DashboardSidebarProps {
  /** Celebrity (logged-in user) data */
  celebrity: Celebrity;
  /** Currently active tab */
  activeTab: DashboardTab;
  /** Tab change handler */
  onTabChange: (tab: DashboardTab) => void;
  /** Earnings for quick stats */
  earnings: EarningsSummary;
}

/** Navigation items configuration */
const NAV_ITEMS: { tab: DashboardTab; label: string; icon: string }[] = [
  { tab: "requests", label: "Pregled zahteva", icon: "clipboard" },
  { tab: "earnings", label: "Statistika zarade", icon: "chart" },
  { tab: "profile", label: "Podešavanja profila", icon: "user" },
  { tab: "calendar", label: "Kalendar", icon: "calendar" },
];

/** SVG icons for nav items */
function NavIcon({ icon, className }: { icon: string; className?: string }) {
  const cls = cn("h-5 w-5", className);
  switch (icon) {
    case "clipboard":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
        </svg>
      );
    case "chart":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      );
    case "user":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      );
    case "calendar":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      );
    default:
      return null;
  }
}

/**
 * Desktop sidebar for the celebrity dashboard.
 * Hidden on screens below lg breakpoint.
 */
export default function DashboardSidebar({
  celebrity,
  activeTab,
  onTabChange,
  earnings,
}: DashboardSidebarProps) {
  return (
    <aside className="hidden lg:flex lg:w-72 lg:shrink-0 lg:flex-col border-r border-white/30 bg-white/60 backdrop-blur-xl">
      {/* Celebrity identity */}
      <div className="border-b border-slate-100 p-6">
        <div className="flex items-center gap-3">
          <Avatar
            src={celebrity.image}
            alt={celebrity.name}
            size="lg"
            verified={celebrity.verified}
          />
          <div className="min-w-0">
            <h2 className="truncate text-base font-bold text-slate-900">
              {celebrity.name}
            </h2>
            <Badge variant="primary" size="sm">
              {celebrity.category}
            </Badge>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <li key={item.tab}>
                <button
                  type="button"
                  onClick={() => onTabChange(item.tab)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary-50 text-primary-700 border-l-4 border-primary-500 pl-3"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <NavIcon icon={item.icon} />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Quick stats */}
      <div className="border-t border-slate-100 p-6">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
          Brzi pregled
        </p>
        <div className="mt-3 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Ukupna zarada</span>
            <span className="text-sm font-bold text-slate-900">
              {formatPrice(earnings.totalEarnings)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Na čekanju</span>
            <span className="text-sm font-bold text-secondary-600">
              {earnings.pendingRequests}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Završenih</span>
            <span className="text-sm font-bold text-accent-600">
              {earnings.completedRequests}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
