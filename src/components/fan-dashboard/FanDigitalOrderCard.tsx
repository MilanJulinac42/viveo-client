"use client";

import { useState } from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatPrice, getPlaceholderImage, formatFileSize } from "@/lib/utils";
import { downloadDigitalProduct } from "@/lib/api/digital-orders";
import type { FanDigitalOrder, DigitalOrderStatus } from "@/lib/types";

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

interface FanDigitalOrderCardProps {
  order: FanDigitalOrder;
}

export default function FanDigitalOrderCard({ order }: FanDigitalOrderCardProps) {
  const [downloading, setDownloading] = useState(false);

  const canDownload =
    order.status === "completed" &&
    order.downloadToken &&
    order.downloadTokenExpiresAt &&
    new Date(order.downloadTokenExpiresAt) > new Date();

  async function handleDownload() {
    if (!order.downloadToken) return;
    setDownloading(true);
    try {
      const result = await downloadDigitalProduct(order.id, order.downloadToken);
      window.open(result.downloadUrl, "_blank");
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 transition-all hover:shadow-md">
      <div className="flex gap-4">
        {/* Preview Image */}
        <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-slate-100">
          <img
            src={order.previewImageUrl || getPlaceholderImage(order.productName, 80)}
            alt={order.productName}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-slate-900 truncate">{order.productName}</h3>
            <Badge variant={getStatusBadgeVariant(order.status)} size="sm">
              {STATUS_LABELS[order.status]}
            </Badge>
          </div>
          <p className="text-xs text-slate-500">
            <Link href={`/zvezda/${order.celebritySlug}`} className="hover:text-primary-600 transition-colors">
              {order.celebrityName}
            </Link>
          </p>
          <div className="mt-1 flex items-center gap-2">
            <Badge variant="primary" size="sm">{order.fileType.toUpperCase()}</Badge>
            <span className="text-xs text-slate-400">{formatFileSize(order.fileSize)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm font-bold text-primary-600">{formatPrice(order.price)}</p>
            <p className="text-xs text-slate-400">
              {new Date(order.createdAt).toLocaleDateString("sr-RS")}
            </p>
          </div>

          {/* Download button */}
          {canDownload && (
            <div className="mt-3">
              <Button
                size="sm"
                onClick={handleDownload}
                disabled={downloading}
              >
                {downloading ? "Preuzimanje..." : "Preuzmi fajl"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
