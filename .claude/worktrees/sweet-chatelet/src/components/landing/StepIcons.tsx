"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

/** Animated search icon — magnifying glass handle rotates */
function SearchIcon({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full" fill="none">
      <circle
        cx="20" cy="20" r="12"
        stroke="#6C3CE1" strokeWidth="3" fill="#f3f0ff"
      />
      <line
        x1="29" y1="29" x2="40" y2="40"
        stroke="#6C3CE1" strokeWidth="3" strokeLinecap="round"
        style={{
          transformOrigin: "29px 29px",
          animation: animate ? "icon-search-wiggle 2s ease-in-out infinite" : "none",
        }}
      />
      <circle cx="17" cy="17" r="2" fill="#6C3CE1" opacity={0.5} />
    </svg>
  );
}

/** Animated write icon — pen draws a line */
function WriteIcon({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full" fill="none">
      <rect x="8" y="6" width="24" height="32" rx="3" stroke="#6C3CE1" strokeWidth="2.5" fill="#f3f0ff" />
      {/* Lines of text */}
      <line x1="14" y1="14" x2="26" y2="14" stroke="#d4c4ff" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="20" x2="24" y2="20" stroke="#d4c4ff" strokeWidth="2" strokeLinecap="round" />
      {/* Animated writing line */}
      <line
        x1="14" y1="26" x2="22" y2="26"
        stroke="#6C3CE1" strokeWidth="2" strokeLinecap="round"
        strokeDasharray="12"
        strokeDashoffset={animate ? "0" : "12"}
        style={{ transition: "stroke-dashoffset 1s ease-in-out 0.5s" }}
      />
      {/* Pen */}
      <path
        d="M34 10 L40 4 L44 8 L38 14 Z"
        fill="#F59E0B" stroke="#d97706" strokeWidth="1.5"
        style={{
          animation: animate ? "icon-pen-write 2s ease-in-out infinite" : "none",
        }}
      />
    </svg>
  );
}

/** Animated video icon — blinking rec dot */
function VideoIcon({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full" fill="none">
      {/* Camera body */}
      <rect x="4" y="12" width="28" height="24" rx="4" stroke="#6C3CE1" strokeWidth="2.5" fill="#f3f0ff" />
      {/* Camera lens triangle */}
      <path d="M34 18 L44 12 L44 36 L34 30 Z" fill="#6C3CE1" opacity={0.8} />
      {/* Rec dot */}
      <circle
        cx="14" cy="20" r="3.5" fill="#EF4444"
        style={{
          animation: animate ? "icon-rec-blink 1.5s ease-in-out infinite" : "none",
        }}
      />
      {/* Play triangle */}
      <path d="M18 28 L26 24 L18 20" stroke="#6C3CE1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/** Maps step number (1-3) to its animated icon */
export default function StepIcon({ step }: { step: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="h-full w-full">
      {step === 1 && <SearchIcon animate={isInView} />}
      {step === 2 && <WriteIcon animate={isInView} />}
      {step === 3 && <VideoIcon animate={isInView} />}
    </div>
  );
}
