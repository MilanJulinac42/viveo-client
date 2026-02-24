"use client";

import { useState, useEffect } from "react";
import { cn, formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  getDashboardDigitalOrders,
  updateDashboardDigitalOrderStatus,
} from "@/lib/api/dashboard-digital";
import type { StarDigitalOrder, DigitalOrderStatus } from "@/lib/types";

const FILTER_TABS: { key: string; label: string }[] = [
  { key: "all", label: "Sve" },
  { key: "pending", label: "Na cekanju" },
  { key: "confirmed", label: "Potvrdene" },
  { key: "completed", label: "Zavrsene" },
  { key: "cancelled", label: "Otkazane" },
];

const STATUS_LABELS: Record<DigitalOrderStatus, string> = {
  pending: "Na cekanju",
  confirmed: "Potvrdeno",
  completed: "Zavrseno",
  cancelled: "Otkazano",
};

function getStatusBadgeVariant(status: DigitalOrderStatus): "default" | "primary" | "secondary" | "accent" {
  switch (status) {
    case "pending": return "secondary";
    case "confirmed": return "primary";
    case "completed": return "accent";
    case "cancelled": return "default";
  }
}

export default function DigitalOrdersSection() {
  const [orders, setOrders] = useState<StarDigitalOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  async function fetchOrders() {
    setLoading(true);
    try {
      const data = await getDashboardDigitalOrders(filter === "all" ? undefined : filter);
      setOrders(data);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusUpdate(orderId: string, status: string) {
    setUpdating(orderId);
    try {
      await updateDashboardDigitalOrderStatus(orderId, { status });
      fetchOrders();
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(null);
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-slate-100" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Digitalne narudzbine</h2>
        <p className="text-sm text-slate-500">Upravljanje digitalnim narudzbinama</p>
      </div>

      {/* Filter tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
              filter === tab.key
                ? "bg-primary-500 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center">
          <p className="text-3xl mb-3">📬</p>
          <p className="text-slate-500">Nema digitalnih narudzbina</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-2xl border border-slate-100 bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-900">{order.buyerName}</h3>
                    <Badge variant={getStatusBadgeVariant(order.status)} size="sm">
                      {STATUS_LABELS[order.status]}
                    </Badge>
                    <Badge variant="primary" size="sm">{order.fileType.toUpperCase()}</Badge>
                  </div>
                  <p className="text-sm text-slate-500">
                    {order.productName} · {formatPrice(order.price)}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {new Date(order.createdAt).toLocaleDateString("sr-RS")}
                    {" · "}{order.buyerEmail}
                  </p>
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                >
                  {expandedId === order.id ? "Zatvori" : "Detalji"}
                </Button>
              </div>

              {expandedId === order.id && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-slate-500">Kupac</p>
                      <p className="text-slate-900">{order.buyerName}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Email</p>
                      <p className="text-slate-900">{order.buyerEmail}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Proizvod</p>
                      <p className="text-slate-900">{order.productName}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Preuzimanja</p>
                      <p className="text-slate-900">{order.downloadCount}</p>
                    </div>
                    {order.status === "completed" && order.downloadToken && (
                      <>
                        <div>
                          <p className="text-slate-500">Download token</p>
                          <p className="text-slate-900 font-mono text-xs break-all">{order.downloadToken}</p>
                        </div>
                        {order.downloadTokenExpiresAt && (
                          <div>
                            <p className="text-slate-500">Token istice</p>
                            <p className="text-slate-900">
                              {new Date(order.downloadTokenExpiresAt).toLocaleString("sr-RS")}
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Actions based on current status */}
                  {order.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleStatusUpdate(order.id, "confirmed")}
                        disabled={updating === order.id}
                      >
                        Potvrdi
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-500 border-red-200 hover:bg-red-50"
                        onClick={() => handleStatusUpdate(order.id, "cancelled")}
                        disabled={updating === order.id}
                      >
                        Otkazi
                      </Button>
                    </div>
                  )}

                  {order.status === "confirmed" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleStatusUpdate(order.id, "completed")}
                        disabled={updating === order.id}
                      >
                        Zavrsi
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-500 border-red-200 hover:bg-red-50"
                        onClick={() => handleStatusUpdate(order.id, "cancelled")}
                        disabled={updating === order.id}
                      >
                        Otkazi
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
