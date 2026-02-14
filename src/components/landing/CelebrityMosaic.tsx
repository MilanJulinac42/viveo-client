/**
 * @fileoverview Decorative mosaic of celebrity avatars for CTA background.
 * Server component — no interactivity needed.
 */

import { MOCK_CELEBRITIES } from "@/lib/constants";

export default function CelebrityMosaic() {
  // Repeat the list to fill a grid
  const repeated = [...MOCK_CELEBRITIES, ...MOCK_CELEBRITIES, ...MOCK_CELEBRITIES];

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
