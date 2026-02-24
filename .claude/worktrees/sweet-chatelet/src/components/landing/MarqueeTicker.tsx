/**
 * @fileoverview Celebrity name marquee ticker with dual rows.
 * Fetches celebrities and categories from API; falls back to mock data.
 */

import Marquee from "@/components/ui/Marquee";
import { getCelebrities } from "@/lib/api/celebrities";
import { getCategories } from "@/lib/api/categories";
import { MOCK_CELEBRITIES, MOCK_CATEGORIES } from "@/lib/constants";
import type { Celebrity, Category } from "@/lib/types";

/** Colored dots that cycle through brand colors */
const dotColors = [
  "bg-primary-400",
  "bg-secondary-400",
  "bg-accent-400",
];

export default async function MarqueeTicker() {
  let celebrities: Celebrity[] = MOCK_CELEBRITIES;
  let categories: Category[] = MOCK_CATEGORIES;

  try {
    const [celebRes, catData] = await Promise.all([
      getCelebrities({ pageSize: 8 }).catch(() => null),
      getCategories().catch(() => null),
    ]);
    if (celebRes && celebRes.data.length > 0) {
      celebrities = celebRes.data;
    }
    if (catData && catData.length > 0) {
      categories = catData;
    }
  } catch {
    // Fallback to mock data
  }

  return (
    <div className="relative bg-white py-5 sm:py-6">
      {/* Subtle top/bottom borders */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent" />

      {/* Row 1: Celebrity names with avatar initials */}
      <Marquee speed={35} className="from-white">
        {celebrities.map((celebrity) => (
          <span
            key={celebrity.id}
            className="flex shrink-0 items-center gap-2.5 text-sm font-medium text-slate-500"
          >
            {/* Mini avatar with initials */}
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-primary-200 text-[10px] font-bold text-primary-700">
              {celebrity.name.split(" ").map((n) => n[0]).join("")}
            </span>
            <span className="whitespace-nowrap">
              {celebrity.verified && "\u2713 "}{celebrity.name}
            </span>
            <span className="text-slate-300">&bull;</span>
            <span className="text-xs text-slate-400">{celebrity.category}</span>
          </span>
        ))}
      </Marquee>

      {/* Row 2: Categories scrolling in opposite direction */}
      <div className="mt-3">
        <Marquee speed={40} direction="right" className="from-white">
          {categories.map((category, i) => (
            <span
              key={category.id}
              className="flex shrink-0 items-center gap-2 text-xs font-medium text-slate-400"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${dotColors[i % dotColors.length]}`} />
              <span className="whitespace-nowrap">
                {category.icon} {category.name}
              </span>
              <span className="text-slate-200">&mdash;</span>
              <span className="text-slate-300">{category.celebrityCount} zvezda</span>
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
