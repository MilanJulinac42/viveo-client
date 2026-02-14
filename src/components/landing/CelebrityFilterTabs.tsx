"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import CelebrityCarousel from "./CelebrityCarousel";
import type { Celebrity } from "@/lib/types";

const TABS = ["Svi", "Glumci", "Muzičari", "Sportisti", "Influenseri"];

interface CelebrityFilterTabsProps {
  celebrities: Celebrity[];
}

export default function CelebrityFilterTabs({ celebrities }: CelebrityFilterTabsProps) {
  const [activeTab, setActiveTab] = useState("Svi");

  const filtered = useMemo(() => {
    if (activeTab === "Svi") return celebrities;
    return celebrities.filter((c) => c.category === activeTab);
  }, [activeTab, celebrities]);

  return (
    <div>
      {/* Tab bar */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
              activeTab === tab
                ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                : "bg-white/80 text-slate-600 hover:bg-primary-50 hover:text-primary-700 border border-slate-200",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Carousel with key for re-init */}
      <CelebrityCarousel key={activeTab} celebrities={filtered} />
    </div>
  );
}
