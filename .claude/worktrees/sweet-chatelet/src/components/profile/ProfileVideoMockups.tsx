/**
 * @fileoverview ProfileVideoMockups — Client component that renders animated
 * phone-frame mockups for each available video type. Uses framer-motion's
 * useInView hook to trigger a staggered slide-up animation when the component
 * scrolls into the viewport. Each mockup displays the video type's emoji,
 * title, occasion label, message preview, and a decorative play button inside
 * a rounded phone frame with a notch and gradient screen.
 */

"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import type { VideoType } from "@/lib/types";

interface ProfileVideoMockupsProps {
  videoTypes: VideoType[];
}

export default function ProfileVideoMockups({ videoTypes }: ProfileVideoMockupsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      {videoTypes.map((vt, i) => (
        <div
          key={vt.id}
          className="flex justify-center"
          style={{
            transform: isInView ? "translateY(0)" : "translateY(30px)",
            opacity: isInView ? 1 : 0,
            transition: `all 0.8s ease-out ${i * 0.15}s`,
          }}
        >
          {/* Phone frame */}
          <div className="relative w-[180px] sm:w-[200px]">
            {/* Subtle glow */}
            <div
              className={`absolute -inset-6 rounded-full bg-gradient-to-br ${vt.accentFrom} ${vt.accentTo} opacity-10 blur-2xl`}
            />

            <div className="relative rounded-[2rem] border-[3px] border-slate-200 bg-white p-1.5 shadow-xl">
              {/* Notch */}
              <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
                <div className="h-4 w-14 rounded-b-xl bg-white" />
              </div>

              {/* Screen */}
              <div
                className={`relative overflow-hidden rounded-[1.6rem] bg-gradient-to-br ${vt.accentFrom} ${vt.accentTo}`}
              >
                <div className="relative aspect-[9/16]">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    {/* Emoji */}
                    <div className="mb-3 text-4xl">{vt.emoji}</div>

                    {/* Title */}
                    <p className="text-sm font-bold text-white">{vt.title}</p>
                    <p className="mt-0.5 text-[10px] text-white/60">{vt.occasion}</p>

                    {/* Message bubble */}
                    <div className="mt-4 rounded-xl bg-white/15 px-3 py-2 backdrop-blur-sm">
                      <p className="text-[10px] leading-relaxed text-white/90">
                        {vt.message}
                      </p>
                    </div>

                    {/* Play button */}
                    <div className="mt-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                      <svg
                        className="ml-0.5 h-4 w-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Top bar */}
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 pt-6">
                    <span className="text-[8px] font-medium text-white/50">Viveo</span>
                    <span className="text-[8px] font-medium text-white/50">●●●</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
