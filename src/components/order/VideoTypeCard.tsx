/**
 * @fileoverview Selectable video type card for the order form.
 * Displays a single video type option with gradient accent, emoji, and radio indicator.
 */

"use client";

import { cn } from "@/lib/utils";
import type { VideoType } from "@/lib/types";

interface VideoTypeCardProps {
  /** Video type data */
  videoType: VideoType;
  /** Whether this card is selected */
  selected: boolean;
  /** Selection handler */
  onSelect: (videoType: VideoType) => void;
}

/**
 * Selectable card for choosing a video type in the order form.
 */
export default function VideoTypeCard({
  videoType,
  selected,
  onSelect,
}: VideoTypeCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(videoType)}
      className={cn(
        "group relative flex flex-col items-center gap-3 rounded-2xl p-5 text-center transition-all duration-200 cursor-pointer",
        selected
          ? "border-2 border-primary-500 bg-primary-50/50 shadow-md ring-2 ring-primary-500/20"
          : "border border-slate-200 bg-white hover:border-primary-200 hover:shadow-md"
      )}
    >
      {/* Gradient accent bar */}
      <div
        className={`h-1 w-full rounded-full bg-gradient-to-r ${videoType.accentFrom} ${videoType.accentTo}`}
      />

      {/* Emoji */}
      <span className="text-3xl">{videoType.emoji}</span>

      {/* Title */}
      <h3 className="text-sm font-semibold text-slate-900">{videoType.title}</h3>

      {/* Occasion */}
      <p className="text-xs text-slate-500">{videoType.occasion}</p>

      {/* Radio indicator */}
      <div
        className={cn(
          "absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-200",
          selected
            ? "border-primary-500 bg-primary-500"
            : "border-slate-300 bg-white group-hover:border-primary-300"
        )}
      >
        {selected && (
          <svg
            className="h-3 w-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        )}
      </div>
    </button>
  );
}
