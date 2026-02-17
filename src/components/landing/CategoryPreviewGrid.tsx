/**
 * @fileoverview Hover preview grid showing mini celebrity avatar circles.
 * Displays initials of up to 4 celebrities from the given category,
 * with a "+N" overflow indicator when more exist.
 */

"use client";

import { MOCK_CELEBRITIES } from "@/lib/constants";
import type { Celebrity } from "@/lib/types";

interface CategoryPreviewGridProps {
  categoryName: string;
  celebrities?: Celebrity[];
}

/**
 * Shows a row of small avatar circles for celebrities in the given category.
 * Each circle displays the celebrity's initials. If more than 4 exist,
 * a "+N" circle is appended.
 *
 * @param props - The category name to filter celebrities by, and optional celebrity data
 * @returns Avatar circle row or null if no celebrities match
 */
export default function CategoryPreviewGrid({ categoryName, celebrities }: CategoryPreviewGridProps) {
  const source = celebrities && celebrities.length > 0 ? celebrities : MOCK_CELEBRITIES;
  const allInCategory = source.filter((c) => c.category === categoryName);
  const displayed = allInCategory.slice(0, 4);

  if (displayed.length === 0) return null;

  return (
    <div className="mt-2 flex items-center justify-center -space-x-2">
      {displayed.map((celeb) => (
        <div
          key={celeb.id}
          className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/30 bg-white/20 text-[10px] font-bold text-white backdrop-blur-sm"
          title={celeb.name}
        >
          {celeb.name.split(" ").map((n) => n[0]).join("")}
        </div>
      ))}
      {allInCategory.length > 4 && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/30 bg-white/20 text-[10px] font-bold text-white backdrop-blur-sm">
          +{allInCategory.length - 4}
        </div>
      )}
    </div>
  );
}
