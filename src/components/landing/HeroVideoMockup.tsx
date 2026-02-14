/**
 * @fileoverview Animated phone mockup showing a celebrity video message.
 * Pure CSS/SVG — no external assets needed. Creates a realistic phone
 * frame with an animated "video playing" interior.
 *
 * Client component for floating animation.
 */

"use client";

import { useEffect, useState } from "react";

/**
 * Phone mockup with animated video message preview.
 * Floats gently with a CSS animation for visual interest.
 */
export default function HeroVideoMockup() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`relative mx-auto w-[280px] transition-all duration-1000 sm:w-[300px] lg:w-[320px] ${
        mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      {/* Glow behind the phone */}
      <div className="absolute -inset-8 rounded-full bg-secondary-400/20 blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
      <div className="absolute -inset-4 rounded-full bg-primary-300/15 blur-2xl animate-pulse" style={{ animationDuration: "6s" }} />

      {/* Phone frame */}
      <div
        className="relative rounded-[2.5rem] border-[3px] border-white/20 bg-gradient-to-b from-slate-800 to-slate-900 p-2 shadow-2xl shadow-black/40"
        style={{ animation: "hero-float 6s ease-in-out infinite" }}
      >
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
          <div className="h-6 w-28 rounded-b-2xl bg-slate-900" />
        </div>

        {/* Screen */}
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900">
          {/* Video content area */}
          <div className="relative aspect-[9/16]">
            {/* Animated gradient background simulating video */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-primary-500/80 via-primary-700 to-primary-900"
              style={{
                animation: "hero-video-shift 8s ease-in-out infinite",
              }}
            />

            {/* Celebrity avatar circle */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Avatar with ring */}
              <div className="relative">
                <div className="h-24 w-24 rounded-full border-[3px] border-secondary-400 bg-gradient-to-br from-primary-400 to-primary-600 shadow-lg shadow-secondary-400/30 sm:h-28 sm:w-28">
                  {/* Person silhouette */}
                  <svg viewBox="0 0 100 100" className="h-full w-full text-white/40">
                    <circle cx="50" cy="35" r="18" fill="currentColor" />
                    <ellipse cx="50" cy="80" rx="28" ry="22" fill="currentColor" />
                  </svg>
                </div>
                {/* Verified badge */}
                <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-secondary-400 text-white shadow-lg">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              </div>

              {/* Name & category */}
              <p className="mt-4 text-base font-bold text-white">Jelena Petrović</p>
              <p className="mt-1 text-xs text-primary-200">⭐ Muzičarka</p>

              {/* "Recording" indicator */}
              <div className="mt-6 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                </span>
                <span className="text-xs font-medium text-white/90">Snima video poruku...</span>
              </div>
            </div>

            {/* Audio waveform at bottom */}
            <div className="absolute bottom-0 inset-x-0 p-4">
              {/* Progress bar */}
              <div className="mb-3 flex items-center gap-3">
                <span className="text-[10px] text-white/60">0:12</span>
                <div className="relative flex-1 h-1 rounded-full bg-white/20">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-secondary-400"
                    style={{ width: "40%", animation: "hero-progress 8s ease-in-out infinite" }}
                  />
                </div>
                <span className="text-[10px] text-white/60">0:30</span>
              </div>

              {/* Waveform bars */}
              <div className="flex items-end justify-center gap-[3px]">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-[3px] rounded-full bg-white/40"
                    style={{
                      height: `${8 + Math.sin(i * 0.8) * 12 + Math.random() * 8}px`,
                      animation: `hero-wave 1.5s ease-in-out ${i * 0.05}s infinite alternate`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Top bar with time */}
            <div className="absolute top-0 inset-x-0 flex items-center justify-between px-6 pt-8">
              <span className="text-[10px] font-medium text-white/60">Viveo</span>
              <span className="text-[10px] font-medium text-white/60">●●●</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating reaction emojis */}
      <div className="absolute -right-4 top-1/4 animate-bounce text-2xl" style={{ animationDuration: "3s", animationDelay: "0.5s" }}>
        🎉
      </div>
      <div className="absolute -left-6 top-1/3 animate-bounce text-xl" style={{ animationDuration: "4s", animationDelay: "1s" }}>
        ❤️
      </div>
      <div className="absolute -right-6 bottom-1/3 animate-bounce text-xl" style={{ animationDuration: "3.5s", animationDelay: "2s" }}>
        🌟
      </div>
    </div>
  );
}
