"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

export default function StepConnectorLine() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="pointer-events-none absolute top-16 left-[16.67%] right-[16.67%] hidden sm:block">
      <svg className="w-full h-8" viewBox="0 0 800 32" fill="none" preserveAspectRatio="none">
        <path
          d="M0 16 C100 16, 150 4, 266 16 C350 28, 420 4, 533 16 C620 28, 700 16, 800 16"
          stroke="url(#connector-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1200"
          strokeDashoffset={isInView ? "0" : "1200"}
          style={{ transition: "stroke-dashoffset 1.5s ease-in-out 0.3s" }}
        />
        {/* Arrow at 1/3 point */}
        <circle cx="266" cy="16" r="5" fill="#6C3CE1" opacity={isInView ? 1 : 0} style={{ transition: "opacity 0.5s ease 1s" }} />
        {/* Arrow at 2/3 point */}
        <circle cx="533" cy="16" r="5" fill="#6C3CE1" opacity={isInView ? 1 : 0} style={{ transition: "opacity 0.5s ease 1.2s" }} />
        <defs>
          <linearGradient id="connector-gradient" x1="0" y1="0" x2="800" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#9466ff" />
            <stop offset="50%" stopColor="#6C3CE1" />
            <stop offset="100%" stopColor="#9466ff" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
