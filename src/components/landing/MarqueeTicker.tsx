/**
 * @fileoverview Celebrity name marquee ticker with dual rows.
 * Auto-scrolling horizontal strip showing celebrity names (row 1)
 * and categories (row 2, opposite direction).
 */

import Marquee from "@/components/ui/Marquee";
import { MOCK_CELEBRITIES, MOCK_CATEGORIES } from "@/lib/constants";

/** Colored dots that cycle through brand colors */
const dotColors = [
  "bg-primary-400",
  "bg-secondary-400",
  "bg-accent-400",
];

export default function MarqueeTicker() {
  return (
    <div className="relative bg-white py-5 sm:py-6">
      {/* Subtle top/bottom borders */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent" />

      {/* Row 1: Celebrity names with avatar initials */}
      <Marquee speed={35} className="from-white">
        {MOCK_CELEBRITIES.map((celebrity, i) => (
          <span
            key={celebrity.id}
            className="flex shrink-0 items-center gap-2.5 text-sm font-medium text-slate-500"
          >
            {/* Mini avatar with initials */}
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-primary-200 text-[10px] font-bold text-primary-700">
              {celebrity.name.split(" ").map((n) => n[0]).join("")}
            </span>
            <span className="whitespace-nowrap">
              {celebrity.verified && "✓ "}{celebrity.name}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-400">{celebrity.category}</span>
          </span>
        ))}
      </Marquee>

      {/* Row 2: Categories scrolling in opposite direction */}
      <div className="mt-3">
        <Marquee speed={40} direction="right" className="from-white">
          {MOCK_CATEGORIES.map((category, i) => (
            <span
              key={category.id}
              className="flex shrink-0 items-center gap-2 text-xs font-medium text-slate-400"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${dotColors[i % dotColors.length]}`} />
              <span className="whitespace-nowrap">
                {category.icon} {category.name}
              </span>
              <span className="text-slate-200">—</span>
              <span className="text-slate-300">{category.celebrityCount} zvezda</span>
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
