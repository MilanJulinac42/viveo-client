/**
 * @fileoverview Fan order card for the fan dashboard.
 * Shows celebrity info, order details, expandable instructions,
 * and status-specific actions from the buyer perspective.
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn, formatPrice } from "@/lib/utils";
import { STATUS_LABELS } from "@/lib/constants";
import { Card, CardBody, CardFooter } from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import type { FanOrder, RequestStatus } from "@/lib/types";

interface FanOrderCardProps {
  /** The fan order data */
  order: FanOrder;
}

/** Badge variant mapping for order statuses */
const statusVariant: Record<RequestStatus, "default" | "primary" | "secondary" | "accent"> = {
  pending: "secondary",
  approved: "primary",
  completed: "accent",
  rejected: "default",
};

/** Gradient accent strip colors by status */
const statusGradient: Record<RequestStatus, string> = {
  pending: "from-secondary-400 to-secondary-500",
  approved: "from-primary-400 to-primary-500",
  completed: "from-accent-400 to-accent-500",
  rejected: "from-slate-300 to-slate-400",
};

/**
 * Fan dashboard order card with expandable instructions and status-specific actions.
 */
export default function FanOrderCard({ order }: FanOrderCardProps) {
  const [expanded, setExpanded] = useState(false);

  const deadlineDate = new Date(order.deadline);
  const formattedDeadline = deadlineDate.toLocaleDateString("sr-RS", {
    day: "numeric",
    month: "short",
  });
  const formattedCreated = new Date(order.createdAt).toLocaleDateString("sr-RS", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card glass hoverable>
      {/* Status accent strip */}
      <div className={`h-1 bg-gradient-to-r ${statusGradient[order.status]}`} />

      <CardBody className="space-y-3 py-4">
        {/* Row 1: Celebrity info + status */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar src={order.celebrityImage} alt={order.celebrityName} size="sm" />
            <div className="min-w-0">
              <Link
                href={`/zvezda/${order.celebritySlug}`}
                className="truncate text-sm font-semibold text-slate-900 hover:text-primary-600 transition-colors"
              >
                {order.celebrityName}
              </Link>
              <p className="text-xs text-slate-400">{formattedCreated}</p>
            </div>
          </div>
          <Badge variant={statusVariant[order.status]} size="sm">
            {STATUS_LABELS[order.status]}
          </Badge>
        </div>

        {/* Row 2: Video type + recipient */}
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-medium text-slate-700">{order.videoType}</span>
          <span className="text-slate-300">&bull;</span>
          <span className="text-slate-500">za {order.recipientName}</span>
        </div>

        {/* Row 3: Instructions (expandable) */}
        <div>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex w-full items-center gap-1.5 text-left text-sm text-primary-600 hover:text-primary-700 transition-colors"
          >
            <svg
              className={cn(
                "h-4 w-4 shrink-0 transition-transform duration-200",
                expanded && "rotate-90"
              )}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            {expanded ? "Sakrij instrukcije" : "Prikaži instrukcije"}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" as const }}
                className="overflow-hidden"
              >
                <p className="mt-2 rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-slate-600">
                  &ldquo;{order.instructions}&rdquo;
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Row 4: Price + Status-specific info */}
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold text-primary-600">{formatPrice(order.price)}</span>
          {order.status === "completed" && (
            <span className="text-xs font-medium text-accent-600">Video je spreman!</span>
          )}
          {order.status === "rejected" && (
            <span className="text-xs text-slate-400">Povraćaj novca u toku</span>
          )}
          {(order.status === "pending" || order.status === "approved") && (
            <span className="text-xs text-slate-400">Rok: {formattedDeadline}</span>
          )}
        </div>
      </CardBody>

      {/* Footer: actions for completed orders */}
      {order.status === "completed" && (
        <CardFooter className="flex items-center justify-end gap-2">
          <Link href={`/naruci/${order.celebritySlug}`}>
            <Button variant="ghost" size="sm">
              Naruči ponovo
            </Button>
          </Link>
          <Button variant="outline" size="sm">
            Pogledaj video
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
