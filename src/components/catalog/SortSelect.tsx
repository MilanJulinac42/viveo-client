/**
 * @fileoverview Styled sort dropdown for ordering search/catalog results.
 * Uses native <select> for full accessibility and keyboard support.
 *
 * @example
 * ```tsx
 * <SortSelect value={sortBy} onChange={setSortBy} />
 * ```
 */

"use client";

import { cn } from "@/lib/utils";

/** Available sort options */
export type SortOption = "popularity" | "price-asc" | "price-desc" | "rating";

/** Sort option with Serbian label */
const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "popularity", label: "Popularnost" },
  { value: "price-asc", label: "Cena (rastuća)" },
  { value: "price-desc", label: "Cena (opadajuća)" },
  { value: "rating", label: "Ocena" },
];

interface SortSelectProps {
  /** Current sort value */
  value: SortOption;
  /** Callback when sort changes */
  onChange: (value: SortOption) => void;
  /** Additional CSS classes */
  className?: string;
}

export default function SortSelect({
  value,
  onChange,
  className,
}: SortSelectProps) {
  return (
    <div className={cn("relative", className)}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="w-full appearance-none rounded-xl border border-slate-200 bg-white/80 py-3 pl-4 pr-10 text-sm text-slate-700 backdrop-blur-xl transition-all duration-200 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        aria-label="Sortiraj po"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Chevron icon */}
      <svg
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </div>
  );
}
