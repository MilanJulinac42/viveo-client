"use client";

import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { formatPrice, getPlaceholderImage } from "@/lib/utils";
import { MERCH_STATUS_LABELS } from "@/lib/constants";
import type { FanMerchOrder } from "@/lib/types";

function getStatusBadgeVariant(status: string): "default" | "primary" | "secondary" | "accent" {
  switch (status) {
    case "confirmed": return "primary";
    case "shipped": return "secondary";
    case "delivered": return "accent";
    case "cancelled": return "default";
    default: return "secondary";
  }
}

interface FanMerchOrderCardProps {
  order: FanMerchOrder;
}

export default function FanMerchOrderCard({ order }: FanMerchOrderCardProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 transition-all hover:shadow-md">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-slate-100">
          <img
            src={order.productImageUrl || getPlaceholderImage(order.productName, 80)}
            alt={order.productName}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-slate-900 truncate">{order.productName}</h3>
            <Badge variant={getStatusBadgeVariant(order.status)} size="sm">
              {MERCH_STATUS_LABELS[order.status] || order.status}
            </Badge>
          </div>
          <p className="text-xs text-slate-500">
            <Link href={`/zvezda/${order.celebritySlug}`} className="hover:text-primary-600 transition-colors">
              {order.celebrityName}
            </Link>
            {order.variantName && ` · ${order.variantName}`}
            {` · x${order.quantity}`}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm font-bold text-primary-600">{formatPrice(order.totalPrice)}</p>
            <p className="text-xs text-slate-400">
              {new Date(order.createdAt).toLocaleDateString("sr-RS")}
            </p>
          </div>
          {order.trackingNumber && (
            <p className="mt-1 text-xs text-slate-500">
              Broj za praćenje: <span className="font-mono">{order.trackingNumber}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
