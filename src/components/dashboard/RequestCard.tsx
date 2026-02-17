/**
 * @fileoverview Individual request card for the dashboard.
 * Shows buyer info, request details, expandable instructions, and action buttons.
 */

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn, formatPrice, truncate } from "@/lib/utils";
import { STATUS_LABELS } from "@/lib/constants";
import { Card, CardBody, CardFooter } from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import type { VideoRequest, RequestStatus } from "@/lib/types";

interface RequestCardProps {
  /** The video request data */
  request: VideoRequest;
  /** Callback when request is approved */
  onApprove: (id: string) => void;
  /** Callback when request is rejected */
  onReject: (id: string) => void;
  /** Callback to open video upload modal */
  onUploadVideo: (id: string) => void;
  /** Whether an action is in progress for this card */
  loading?: boolean;
}

/** Badge variant mapping for request statuses */
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
 * Dashboard request card with expandable instructions and action buttons.
 */
export default function RequestCard({
  request,
  onApprove,
  onReject,
  onUploadVideo,
  loading = false,
}: RequestCardProps) {
  const [expanded, setExpanded] = useState(false);

  const deadlineDate = new Date(request.deadline);
  const isOverdue = deadlineDate < new Date() && request.status === "pending";
  const formattedDeadline = deadlineDate.toLocaleDateString("sr-RS", {
    day: "numeric",
    month: "short",
  });
  const formattedCreated = new Date(request.createdAt).toLocaleDateString("sr-RS", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card glass hoverable>
      {/* Status accent strip */}
      <div className={`h-1 bg-gradient-to-r ${statusGradient[request.status]}`} />

      <CardBody className="space-y-3 py-4">
        {/* Row 1: Buyer info + status */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar src={request.buyerAvatar} alt={request.buyerName} size="sm" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                {request.buyerName}
              </p>
              <p className="text-xs text-slate-400">{formattedCreated}</p>
            </div>
          </div>
          <Badge variant={statusVariant[request.status]} size="sm">
            {STATUS_LABELS[request.status]}
          </Badge>
        </div>

        {/* Row 2: Video type + recipient */}
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-medium text-slate-700">{request.videoType}</span>
          <span className="text-slate-300">&bull;</span>
          <span className="text-slate-500">za {request.recipientName}</span>
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
            {expanded ? "Sakrij instrukcije" : "Prika\u017ei instrukcije"}
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
                  &ldquo;{request.instructions}&rdquo;
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Row 4: Price + Deadline */}
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold text-primary-600">{formatPrice(request.price)}</span>
          <span className={cn("text-xs", isOverdue ? "font-medium text-red-500" : "text-slate-400")}>
            {isOverdue ? "\u26a0\ufe0f Istekao rok" : `Rok: ${formattedDeadline}`}
          </span>
        </div>
      </CardBody>

      {/* Actions based on status */}
      {(request.status === "pending" || request.status === "approved") && (
        <CardFooter className="flex items-center justify-end gap-2">
          {request.status === "pending" && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onReject(request.id)}
                disabled={loading}
              >
                {loading ? "..." : "Odbij"}
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onApprove(request.id)}
                disabled={loading}
              >
                {loading ? "Sa\u010dekajte..." : "Prihvati"}
              </Button>
            </>
          )}
          {request.status === "approved" && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onUploadVideo(request.id)}
              disabled={loading}
            >
              {loading ? "Sačekajte..." : "📹 Otpremi video"}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
