/**
 * ProfileStats — Horizontal glassmorphic stat pills for the celebrity profile hero.
 *
 * Server Component (no "use client" directive).
 * Displays response time, star rating, and review count in a rounded pill container
 * with glassmorphism styling. Designed to sit on a dark gradient background.
 */

import StarRating from "@/components/ui/StarRating";
import { formatResponseTime } from "@/lib/utils";

interface ProfileStatsProps {
  responseTime: number;
  rating: number;
  reviewCount: number;
}

export default function ProfileStats({ responseTime, rating, reviewCount }: ProfileStatsProps) {
  return (
    <div className="inline-flex items-center gap-0 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl">
      {/* Response time */}
      <div className="flex items-center gap-1.5 px-4 py-2">
        <span className="text-base">⏱</span>
        <span className="text-sm font-medium text-white/90">{formatResponseTime(responseTime)}</span>
      </div>

      <div className="h-5 w-px bg-white/20" />

      {/* Rating */}
      <div className="flex items-center gap-1.5 px-4 py-2">
        <StarRating rating={rating} size="sm" showValue className="[&_span]:text-white/90 [&_svg]:text-secondary-400" />
      </div>

      <div className="h-5 w-px bg-white/20" />

      {/* Review count */}
      <div className="flex items-center gap-1.5 px-4 py-2">
        <span className="text-base">📝</span>
        <span className="text-sm font-medium text-white/90">{reviewCount} utisaka</span>
      </div>
    </div>
  );
}
