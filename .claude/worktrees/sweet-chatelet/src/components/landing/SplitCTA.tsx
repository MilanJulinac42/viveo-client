"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function SplitCTA() {
  const [hovered, setHovered] = useState<"left" | "right" | null>(null);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
      {/* Left panel — Buyers */}
      <div
        onMouseEnter={() => setHovered("left")}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "relative flex flex-1 flex-col items-center rounded-3xl border border-white/15 bg-white/10 p-8 text-center backdrop-blur-sm transition-all duration-500 sm:p-10",
          hovered === "left" && "sm:flex-[1.2] bg-white/15 shadow-2xl",
          hovered === "right" && "sm:flex-[0.8] opacity-80",
        )}
      >
        <div className="mb-4 text-4xl">🎬</div>
        <h3 className="text-2xl font-extrabold text-white">Naruči video</h3>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-primary-200">
          Iznenadi nekoga posebnom personalizovanom video porukom od omiljene zvezde.
        </p>
        <Button variant="secondary" size="lg" className="mt-6">
          Pronađi zvezdu
        </Button>
      </div>

      {/* Right panel — Talents */}
      <div
        onMouseEnter={() => setHovered("right")}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "relative flex flex-1 flex-col items-center rounded-3xl border border-white/15 bg-white/10 p-8 text-center backdrop-blur-sm transition-all duration-500 sm:p-10",
          hovered === "right" && "sm:flex-[1.2] bg-white/15 shadow-2xl",
          hovered === "left" && "sm:flex-[0.8] opacity-80",
        )}
      >
        <div className="mb-4 text-4xl">⭐</div>
        <h3 className="text-2xl font-extrabold text-white">Postani zvezda</h3>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-primary-200">
          Imaš fanove? Zarađuj snimajući personalizovane video poruke za njih.
        </p>
        <Button
          variant="ghost"
          size="lg"
          className="mt-6 border border-white/20 bg-white/10 text-white shadow-lg shadow-black/5 backdrop-blur-xl hover:bg-white/20"
        >
          Prijavi se →
        </Button>
      </div>
    </div>
  );
}
