/**
 * @fileoverview Fan dashboard orchestrator with stat cards, filters, and order grid.
 * Fetches fan's order history from API with status filtering and search.
 */

"use client";

import { useState, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { getOrders } from "@/lib/api/orders";
import { getMerchOrders } from "@/lib/api/merch-orders";
import { getDigitalOrders } from "@/lib/api/digital-orders";
import StatCard from "@/components/dashboard/StatCard";
import SearchInput from "@/components/catalog/SearchInput";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import FanOrderCard from "./FanOrderCard";
import FanMerchOrderCard from "./FanMerchOrderCard";
import FanDigitalOrderCard from "./FanDigitalOrderCard";
import type { FanOrder, FanMerchOrder, FanDigitalOrder, RequestStatus } from "@/lib/types";

export default function FanDashboardClient() {
  const [orders, setOrders] = useState<FanOrder[]>([]);
  const [merchOrders, setMerchOrders] = useState<FanMerchOrder[]>([]);
  const [digitalOrders, setDigitalOrders] = useState<FanDigitalOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState<"video" | "merch" | "digital">("video");

  // Fetch orders on mount
  useEffect(() => {
    Promise.all([
      getOrders().catch(() => []),
      getMerchOrders().catch(() => []),
      getDigitalOrders().catch(() => []),
    ])
      .then(([videoData, merchData, digitalData]) => {
        setOrders(videoData);
        setMerchOrders(merchData);
        setDigitalOrders(digitalData);
      })
      .finally(() => setLoading(false));
  }, []);

  // ── Computed values ──────────────────────────────────────────────────

  const statusCounts = useMemo(() => {
    const counts = {
      all: orders.length,
      pending: 0,
      approved: 0,
      completed: 0,
      rejected: 0,
    };
    orders.forEach((o) => {
      counts[o.status]++;
    });
    return counts;
  }, [orders]);

  const totalSpent = useMemo(
    () => orders.reduce((sum, o) => sum + o.price, 0),
    [orders]
  );

  const filteredOrders = useMemo(() => {
    let result = orders;
    if (statusFilter !== "all") {
      result = result.filter((o) => o.status === statusFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.celebrityName.toLowerCase().includes(q) ||
          o.recipientName.toLowerCase().includes(q) ||
          o.videoType.toLowerCase().includes(q)
      );
    }
    return result;
  }, [orders, statusFilter, searchQuery]);

  // ── Filter tabs ──────────────────────────────────────────────────────

  const FILTER_TABS: { key: RequestStatus | "all"; label: string }[] = [
    { key: "all", label: "Svi" },
    { key: "pending", label: "Na čekanju" },
    { key: "approved", label: "Prihvaćeni" },
    { key: "completed", label: "Završeni" },
    { key: "rejected", label: "Odbijeni" },
  ];

  // ── Render ───────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="py-8">
        <div className="mb-8">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-100" />
          <div className="mt-2 h-4 w-64 animate-pulse rounded-lg bg-slate-100" />
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Moje porudžbine
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Pregled vaših narudžbina
        </p>
      </div>

      {/* Section toggle */}
      <div className="mb-8 flex gap-3">
        <button
          onClick={() => setActiveSection("video")}
          className={cn(
            "rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer",
            activeSection === "video"
              ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
              : "border border-slate-200 bg-white/80 text-slate-600 hover:bg-primary-50"
          )}
        >
          Video poruke ({orders.length})
        </button>
        <button
          onClick={() => setActiveSection("merch")}
          className={cn(
            "rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer",
            activeSection === "merch"
              ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
              : "border border-slate-200 bg-white/80 text-slate-600 hover:bg-primary-50"
          )}
        >
          Merch ({merchOrders.length})
        </button>
        <button
          onClick={() => setActiveSection("digital")}
          className={cn(
            "rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer",
            activeSection === "digital"
              ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
              : "border border-slate-200 bg-white/80 text-slate-600 hover:bg-primary-50"
          )}
        >
          Digitalni ({digitalOrders.length})
        </button>
      </div>

      {/* ── Video orders section ── */}
      {activeSection === "video" && (
        <>
          {/* Stat cards */}
          <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard
              label="Ukupno narudžbina"
              value={orders.length}
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
              }
            />
            <StatCard
              label="Primljeni videi"
              value={statusCounts.completed}
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <StatCard
              label="Na čekanju"
              value={statusCounts.pending + statusCounts.approved}
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <StatCard
              label="Ukupno potrošeno"
              value={totalSpent}
              prefix=""
              suffix=" RSD"
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
              }
            />
          </div>

          {/* Filters + Search */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none sm:pb-0">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setStatusFilter(tab.key)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                    statusFilter === tab.key
                      ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                      : "border border-slate-200 bg-white/80 text-slate-600 hover:bg-primary-50 hover:text-primary-700"
                  )}
                >
                  {tab.label}
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-xs font-bold",
                      statusFilter === tab.key
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-500"
                    )}
                  >
                    {statusCounts[tab.key]}
                  </span>
                </button>
              ))}
            </div>

            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Pretražite po imenu zvezde..."
              className="sm:w-72"
            />
          </div>

          {/* Orders grid */}
          {filteredOrders.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {filteredOrders.map((order, i) => (
                <ScrollReveal key={order.id} delay={i * 0.05}>
                  <FanOrderCard order={order} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <span className="text-5xl">📦</span>
              <h3 className="mt-4 text-lg font-semibold text-slate-700">
                Nema narudžbina
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                {searchQuery || statusFilter !== "all"
                  ? "Pokušajte sa drugim filterom ili pretragom"
                  : "Još uvek nemate narudžbine video poruka"}
              </p>
              {(searchQuery || statusFilter !== "all") && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => {
                    setStatusFilter("all");
                    setSearchQuery("");
                  }}
                >
                  Obriši filtere
                </Button>
              )}
            </div>
          )}
        </>
      )}

      {/* ── Merch orders section ── */}
      {activeSection === "merch" && (
        <>
          {merchOrders.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {merchOrders.map((order, i) => (
                <ScrollReveal key={order.id} delay={i * 0.05}>
                  <FanMerchOrderCard order={order} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <span className="text-5xl">🛍️</span>
              <h3 className="mt-4 text-lg font-semibold text-slate-700">
                Nema merch narudžbina
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Još uvek nemate narudžbine proizvoda
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => window.location.href = "/prodavnica"}
              >
                Pogledajte prodavnicu
              </Button>
            </div>
          )}
        </>
      )}

      {/* ── Digital orders section ── */}
      {activeSection === "digital" && (
        <>
          {digitalOrders.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {digitalOrders.map((order, i) => (
                <ScrollReveal key={order.id} delay={i * 0.05}>
                  <FanDigitalOrderCard order={order} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <span className="text-5xl">💾</span>
              <h3 className="mt-4 text-lg font-semibold text-slate-700">
                Nema digitalnih narudžbina
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Još uvek nemate narudžbine digitalnih proizvoda
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => window.location.href = "/digitalni-proizvodi"}
              >
                Pogledajte digitalne proizvode
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
