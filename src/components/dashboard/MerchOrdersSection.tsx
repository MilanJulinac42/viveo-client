"use client";

import { useState, useEffect, useMemo } from "react";
import { cn, formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  getDashboardMerchOrders,
  updateDashboardMerchOrder,
} from "@/lib/api/dashboard-products";
import { MERCH_STATUS_LABELS } from "@/lib/constants";
import type { StarMerchOrder, MerchOrderStatus } from "@/lib/types";

const FILTER_TABS: { key: string; label: string }[] = [
  { key: "all", label: "Sve" },
  { key: "pending", label: "Na čekanju" },
  { key: "confirmed", label: "Potvrđeno" },
  { key: "shipped", label: "Poslato" },
  { key: "delivered", label: "Isporučeno" },
  { key: "cancelled", label: "Otkazano" },
];

function getStatusBadgeVariant(status: string): "default" | "primary" | "secondary" | "accent" {
  switch (status) {
    case "confirmed": return "primary";
    case "shipped": return "secondary";
    case "delivered": return "accent";
    case "cancelled": return "default";
    default: return "secondary";
  }
}

export default function MerchOrdersSection() {
  const [orders, setOrders] = useState<StarMerchOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [trackingInput, setTrackingInput] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  async function fetchOrders() {
    setLoading(true);
    try {
      const data = await getDashboardMerchOrders(filter === "all" ? undefined : filter);
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
      const data: { status: string; trackingNumber?: string } = { status };
      if (status === "shipped" && trackingInput) {
        data.trackingNumber = trackingInput;
      }
      await updateDashboardMerchOrder(orderId, data);
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
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Merch narudžbine</h2>
        <p className="text-sm text-slate-500">Upravljanje merch narudžbinama</p>
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
          <p className="text-slate-500">Nema merch narudžbina</p>
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
                      {MERCH_STATUS_LABELS[order.status] || order.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500">
                    {order.productName}
                    {order.variantName && ` — ${order.variantName}`}
                    {" · "}x{order.quantity} · {formatPrice(order.totalPrice)}
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
                      <p className="text-slate-500">Primalac</p>
                      <p className="text-slate-900">{order.shippingName}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Adresa</p>
                      <p className="text-slate-900">{order.shippingAddress}, {order.shippingCity} {order.shippingPostal}</p>
                    </div>
                    {order.shippingNote && (
                      <div className="sm:col-span-2">
                        <p className="text-slate-500">Napomena</p>
                        <p className="text-slate-900">{order.shippingNote}</p>
                      </div>
                    )}
                    {order.buyerPhone && (
                      <div>
                        <p className="text-slate-500">Telefon</p>
                        <p className="text-slate-900">{order.buyerPhone}</p>
                      </div>
                    )}
                    {order.trackingNumber && (
                      <div>
                        <p className="text-slate-500">Broj za praćenje</p>
                        <p className="text-slate-900 font-mono">{order.trackingNumber}</p>
                      </div>
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
                        Otkaži
                      </Button>
                    </div>
                  )}

                  {order.status === "confirmed" && (
                    <div className="space-y-3">
                      <input
                        placeholder="Broj za praćenje (opciono)"
                        value={trackingInput}
                        onChange={(e) => setTrackingInput(e.target.value)}
                        className="w-full sm:w-64 rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(order.id, "shipped")}
                          disabled={updating === order.id}
                        >
                          Označi kao poslato
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-500 border-red-200 hover:bg-red-50"
                          onClick={() => handleStatusUpdate(order.id, "cancelled")}
                          disabled={updating === order.id}
                        >
                          Otkaži
                        </Button>
                      </div>
                    </div>
                  )}

                  {order.status === "shipped" && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(order.id, "delivered")}
                      disabled={updating === order.id}
                    >
                      Označi kao isporučeno
                    </Button>
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
