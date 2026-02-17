/**
 * @fileoverview Video player component for completed orders.
 * Fetches a signed URL from the API and renders a native video player
 * with download functionality.
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { getVideoUrl } from "@/lib/api/orders";
import Button from "@/components/ui/Button";

interface VideoPlayerProps {
  /** Order ID to fetch video for */
  orderId: string;
}

export default function VideoPlayer({ orderId }: VideoPlayerProps) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUrl = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getVideoUrl(orderId);
      setSignedUrl(data.signedUrl);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Greška pri učitavanju videa"
      );
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchUrl();
  }, [fetchUrl]);

  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-xl bg-slate-50 p-6">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <svg
            className="h-4 w-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Učitavanje videa...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center">
        <p className="text-sm text-red-600">{error}</p>
        <button
          onClick={fetchUrl}
          className="mt-2 text-xs font-medium text-primary-600 hover:text-primary-700"
        >
          Pokušaj ponovo
        </button>
      </div>
    );
  }

  if (!signedUrl) return null;

  return (
    <div className="space-y-3">
      <video
        src={signedUrl}
        controls
        playsInline
        className="w-full rounded-xl bg-black"
        style={{ maxHeight: "400px" }}
      >
        Vaš pregledač ne podržava video element.
      </video>

      <div className="flex justify-end">
        <a href={signedUrl} download target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="sm">
            <svg
              className="mr-1.5 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            Preuzmi video
          </Button>
        </a>
      </div>
    </div>
  );
}
