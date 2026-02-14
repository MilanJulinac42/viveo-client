"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

interface VideoShowcaseMockupProps {
  emoji: string;
  celebrityName: string;
  category: string;
  accentFrom: string;
  accentTo: string;
  message: string;
  delay?: number;
}

export default function VideoShowcaseMockup({
  emoji,
  celebrityName,
  category,
  accentFrom,
  accentTo,
  message,
  delay = 0,
}: VideoShowcaseMockupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      className="relative mx-auto w-[200px] sm:w-[220px] lg:w-[240px]"
      style={{
        transform: isInView ? "translateY(0)" : "translateY(30px)",
        opacity: isInView ? 1 : 0,
        transition: `all 0.8s ease-out ${delay}s`,
      }}
    >
      {/* Subtle glow */}
      <div className={`absolute -inset-6 rounded-full bg-gradient-to-br ${accentFrom} ${accentTo} opacity-10 blur-2xl`} />

      {/* Phone frame */}
      <div
        className="relative rounded-[2rem] border-[3px] border-slate-200 bg-white p-1.5 shadow-xl"
        style={{ animation: `hero-float 6s ease-in-out ${delay}s infinite` }}
      >
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
          <div className="h-4 w-16 rounded-b-xl bg-white" />
        </div>

        {/* Screen */}
        <div className={`relative overflow-hidden rounded-[1.6rem] bg-gradient-to-br ${accentFrom} ${accentTo}`}>
          <div className="relative aspect-[9/16]">
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              {/* Occasion emoji */}
              <div className="mb-3 text-4xl">{emoji}</div>

              {/* Avatar */}
              <div className="h-16 w-16 rounded-full border-2 border-white/30 bg-white/20">
                <svg viewBox="0 0 100 100" className="h-full w-full text-white/50">
                  <circle cx="50" cy="35" r="18" fill="currentColor" />
                  <ellipse cx="50" cy="80" rx="28" ry="22" fill="currentColor" />
                </svg>
              </div>

              <p className="mt-2 text-xs font-bold text-white">{celebrityName}</p>
              <p className="text-[10px] text-white/60">{category}</p>

              {/* Message bubble */}
              <div className="mt-4 rounded-xl bg-white/15 px-3 py-2 backdrop-blur-sm">
                <p className="text-[10px] leading-relaxed text-white/90">{message}</p>
              </div>

              {/* Play button */}
              <div className="mt-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <svg className="ml-0.5 h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Top bar */}
            <div className="absolute top-0 inset-x-0 flex items-center justify-between px-4 pt-6">
              <span className="text-[8px] font-medium text-white/50">Viveo</span>
              <span className="text-[8px] font-medium text-white/50">●●●</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
