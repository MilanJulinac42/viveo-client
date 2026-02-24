"use client";

import { useState } from "react";
import { cn, formatPrice } from "@/lib/utils";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import type { Celebrity, DashboardTab, EarningsSummary } from "@/lib/types";

interface DashboardSidebarProps {
  celebrity: Celebrity;
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  earnings: EarningsSummary;
}

type NavItem = {
  tab: DashboardTab;
  label: string;
  icon: string;
};

type NavGroup = {
  label: string;
  icon: string;
  children: NavItem[];
};

type NavEntry = NavItem | NavGroup;

function isGroup(entry: NavEntry): entry is NavGroup {
  return "children" in entry;
}

const NAV_ENTRIES: NavEntry[] = [
  { tab: "requests", label: "Pregled zahteva", icon: "clipboard" },
  {
    label: "Merch",
    icon: "shop",
    children: [
      { tab: "products", label: "Proizvodi", icon: "shop" },
      { tab: "merch-orders", label: "Narudžbine", icon: "package" },
    ],
  },
  {
    label: "Digitalno",
    icon: "download",
    children: [
      { tab: "digital-products", label: "Proizvodi", icon: "download" },
      { tab: "digital-orders", label: "Narudžbine", icon: "file" },
    ],
  },
  { tab: "earnings", label: "Statistika zarade", icon: "chart" },
  { tab: "profile", label: "Podešavanja profila", icon: "user" },
  { tab: "calendar", label: "Kalendar", icon: "calendar" },
];

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
    case "shop":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      );
    case "package":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      );
    case "download":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
      );
    case "file":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      );
    default:
      return null;
  }
}

function NavIconSmall({ icon, className }: { icon: string; className?: string }) {
  return <NavIcon icon={icon} className={cn("!h-4 !w-4", className)} />;
}

export default function DashboardSidebar({
  celebrity,
  activeTab,
  onTabChange,
  earnings,
}: DashboardSidebarProps) {
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => {
    // Auto-open group that contains the active tab
    const initial = new Set<string>();
    NAV_ENTRIES.forEach((entry) => {
      if (isGroup(entry) && entry.children.some((c) => c.tab === activeTab)) {
        initial.add(entry.label);
      }
    });
    return initial;
  });

  function toggleGroup(label: string) {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  }

  function isGroupActive(group: NavGroup) {
    return group.children.some((c) => c.tab === activeTab);
  }

  function handleTabChange(tab: DashboardTab, groupLabel?: string) {
    // Auto-open the group when clicking a child
    if (groupLabel) {
      setOpenGroups((prev) => new Set(prev).add(groupLabel));
    }
    onTabChange(tab);
  }

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
          {NAV_ENTRIES.map((entry) => {
            if (isGroup(entry)) {
              const isOpen = openGroups.has(entry.label);
              const groupActive = isGroupActive(entry);

              return (
                <li key={entry.label}>
                  <button
                    type="button"
                    onClick={() => toggleGroup(entry.label)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 cursor-pointer",
                      groupActive
                        ? "text-primary-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <NavIcon
                      icon={entry.icon}
                      className={groupActive ? "text-primary-600" : "text-slate-400"}
                    />
                    <span className="flex-1 text-left">{entry.label}</span>
                    <svg
                      className={cn(
                        "h-4 w-4 text-slate-400 transition-transform duration-200",
                        isOpen && "rotate-90"
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>

                  {/* Submenu */}
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-200",
                      isOpen ? "max-h-32 opacity-100 mt-0.5" : "max-h-0 opacity-0"
                    )}
                  >
                    <ul className="ml-5 pl-3 border-l-2 border-slate-100 space-y-0.5">
                      {entry.children.map((child) => {
                        const isActive = activeTab === child.tab;
                        return (
                          <li key={child.tab}>
                            <button
                              type="button"
                              onClick={() => handleTabChange(child.tab, entry.label)}
                              className={cn(
                                "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                                isActive
                                  ? "bg-primary-50 text-primary-700 font-medium"
                                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                              )}
                            >
                              <NavIconSmall
                                icon={child.icon}
                                className={isActive ? "text-primary-600" : "text-slate-400"}
                              />
                              {child.label}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              );
            }

            // Regular nav item
            const isActive = activeTab === entry.tab;
            return (
              <li key={entry.tab}>
                <button
                  type="button"
                  onClick={() => onTabChange(entry.tab)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary-50 text-primary-700 border-l-4 border-primary-500 pl-3"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <NavIcon icon={entry.icon} />
                  {entry.label}
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
