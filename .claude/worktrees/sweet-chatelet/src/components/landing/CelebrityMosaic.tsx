/**
 * @fileoverview Decorative mosaic of celebrity avatars for CTA background.
 * Fetches celebrities from API; falls back to mock data.
 */

import { getCelebrities } from "@/lib/api/celebrities";
import { MOCK_CELEBRITIES } from "@/lib/constants";
import type { Celebrity } from "@/lib/types";

export default async function CelebrityMosaic() {
  let celebrities: Celebrity[] = MOCK_CELEBRITIES;
  try {
    const res = await getCelebrities({ pageSize: 8 });
    if (res.data.length > 0) {
      celebrities = res.data;
    }
  } catch {
    // Fallback to mock data
  }

  // Repeat the list to fill a grid
  const repeated = [...celebrities, ...celebrities, ...celebrities];

  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.06]">
      <div className="grid grid-cols-8 gap-4 p-8 sm:grid-cols-10 lg:grid-cols-12">
        {repeated.map((celeb, i) => (
          <div
            key={`${celeb.id}-${i}`}
            className="flex aspect-square items-center justify-center rounded-full bg-white grayscale"
          >
            <svg viewBox="0 0 100 100" className="h-full w-full text-white">
              <circle cx="50" cy="35" r="18" fill="currentColor" />
              <ellipse cx="50" cy="80" rx="28" ry="22" fill="currentColor" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
