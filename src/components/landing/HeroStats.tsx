/**
 * @fileoverview Animated hero statistics bar.
 * Client component that renders animated counters for hero section stats.
 */

"use client";

import AnimatedCounter from "@/components/ui/AnimatedCounter";
import type { HeroStat } from "@/lib/types";

interface HeroStatsProps {
  stats: HeroStat[];
}

/**
 * Glassmorphism statistics panel with animated counters.
 * Counts up from 0 when scrolling into view.
 */
export default function HeroStats({ stats }: HeroStatsProps) {
  return (
    <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4 rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg shadow-black/5 backdrop-blur-xl sm:mt-16 sm:gap-8 sm:p-8">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`text-center ${i < stats.length - 1 ? "border-r border-white/10" : ""}`}
        >
          <p className="text-2xl font-extrabold sm:text-3xl md:text-4xl">
            <AnimatedCounter
              target={stat.numericValue}
              decimals={stat.decimals ?? 0}
              suffix={stat.suffix ?? ""}
              separator="."
            />
          </p>
          <p className="mt-1 text-sm font-medium text-primary-200">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
