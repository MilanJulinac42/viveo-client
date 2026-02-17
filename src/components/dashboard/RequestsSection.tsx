/**
 * @fileoverview Requests management section for the celebrity dashboard.
 * Provides filtering by status, search, and action buttons with API integration.
 */

"use client";

import { useState, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { STATUS_LABELS } from "@/lib/constants";
import { updateRequestStatus } from "@/lib/api/dashboard";
import SearchInput from "@/components/catalog/SearchInput";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Badge from "@/components/ui/Badge";
import RequestCard from "./RequestCard";
import VideoUploadModal from "./VideoUploadModal";
import type { VideoRequest, RequestStatus } from "@/lib/types";

interface RequestsSectionProps {
  /** List of video requests */
  requests: VideoRequest[];
}

/** Filter tab configuration */
const FILTER_TABS: { label: string; value: RequestStatus | "all" }[] = [
  { label: "Svi", value: "all" },
  { label: "Na \u010dekanju", value: "pending" },
  { label: "Prihva\u0107eni", value: "approved" },
  { label: "Zavr\u0161eni", value: "completed" },
  { label: "Odbijeni", value: "rejected" },
];

/**
 * Dashboard section for managing incoming video requests.
 */
export default function RequestsSection({ requests: initialRequests }: RequestsSectionProps) {
  const [requests, setRequests] = useState(initialRequests);
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [uploadingRequestId, setUploadingRequestId] = useState<string | null>(null);

  // Filter and search logic
  const filteredRequests = useMemo(() => {
    let result = requests;

    // Filter by status
    if (statusFilter !== "all") {
      result = result.filter((r) => r.status === statusFilter);
    }

    // Search by buyer name, recipient name, or video type
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.buyerName.toLowerCase().includes(q) ||
          r.recipientName.toLowerCase().includes(q) ||
          r.videoType.toLowerCase().includes(q)
      );
    }

    return result;
  }, [requests, statusFilter, searchQuery]);

  // Count per status for badges
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: requests.length };
    for (const r of requests) {
      counts[r.status] = (counts[r.status] || 0) + 1;
    }
    return counts;
  }, [requests]);

  // Actions with API calls
  const handleStatusChange = useCallback(async (id: string, status: "approved" | "rejected") => {
    setActionLoading(id);
    setActionError(null);
    try {
      await updateRequestStatus(id, status);
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: status as RequestStatus } : r))
      );
    } catch {
      setActionError("Greška pri ažuriranju zahteva. Pokušajte ponovo.");
      setTimeout(() => setActionError(null), 4000);
    } finally {
      setActionLoading(null);
    }
  }, []);

  const handleApprove = useCallback((id: string) => handleStatusChange(id, "approved"), [handleStatusChange]);
  const handleReject = useCallback((id: string) => handleStatusChange(id, "rejected"), [handleStatusChange]);
  const handleUploadVideo = useCallback((id: string) => setUploadingRequestId(id), []);
  const handleUploadSuccess = useCallback(() => {
    if (uploadingRequestId) {
      setRequests((prev) =>
        prev.map((r) => (r.id === uploadingRequestId ? { ...r, status: "completed" as RequestStatus } : r))
      );
    }
    setUploadingRequestId(null);
  }, [uploadingRequestId]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Pregled zahteva</h2>
        <p className="mt-1 text-sm text-slate-500">
          Upravljajte zahtevima za video poruke
        </p>
      </div>

      {/* Error message */}
      {actionError && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-medium text-red-700">
          {actionError}
        </div>
      )}

      {/* Search + Filter bar */}
      <div className="space-y-4">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Pretra\u017ei po imenu, primaocu ili tipu..."
        />

        {/* Status filter tabs */}
        <div className="flex flex-wrap gap-2">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                statusFilter === tab.value
                  ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                  : "border border-slate-200 bg-white/80 text-slate-600 hover:bg-primary-50 hover:text-primary-700"
              )}
            >
              {tab.label}
              <span
                className={cn(
                  "ml-0.5 rounded-full px-1.5 py-0.5 text-xs font-bold",
                  statusFilter === tab.value
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-500"
                )}
              >
                {statusCounts[tab.value] || 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Request list */}
      {filteredRequests.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filteredRequests.map((request, i) => (
            <ScrollReveal key={request.id} delay={i * 0.05}>
              <RequestCard
                request={request}
                onApprove={handleApprove}
                onReject={handleReject}
                onUploadVideo={handleUploadVideo}
                loading={actionLoading === request.id}
              />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="py-16 text-center">
          <span className="text-5xl">&#128237;</span>
          <h3 className="mt-4 text-lg font-bold text-slate-900">
            Nema zahteva
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            {searchQuery || statusFilter !== "all"
              ? "Poku\u0161ajte sa druga\u010dijim filterima ili pretragom."
              : "Trenutno nemate aktivnih zahteva za video poruke."}
          </p>
          {(searchQuery || statusFilter !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
              }}
              className="mt-4 text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              Obri\u0161i filtere
            </button>
          )}
        </div>
      )}

      {/* Video upload modal */}
      {uploadingRequestId && (() => {
        const req = requests.find((r) => r.id === uploadingRequestId);
        if (!req) return null;
        return (
          <VideoUploadModal
            requestId={uploadingRequestId}
            buyerName={req.buyerName}
            recipientName={req.recipientName}
            onClose={() => setUploadingRequestId(null)}
            onUploaded={handleUploadSuccess}
          />
        );
      })()}
    </div>
  );
}
