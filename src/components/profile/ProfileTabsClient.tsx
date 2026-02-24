/**
 * @fileoverview Client component managing the tab state for celebrity services.
 * Three tabs: Personalizovane poruke, Merch, Digitalni proizvodi.
 * Renders the appropriate content grid based on active tab.
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ProfileVideoMockups from "./ProfileVideoMockups";
import ProductCard from "@/components/merch/ProductCard";
import DigitalProductCard from "@/components/digital/DigitalProductCard";
import EmptyTabState from "./EmptyTabState";
import Button from "@/components/ui/Button";
import type { Celebrity, Product, DigitalProduct } from "@/lib/types";

interface ProfileTabsClientProps {
  celebrity: Celebrity;
  products: Product[];
  digitalProducts: DigitalProduct[];
}

interface TabConfig {
  id: string;
  label: string;
  count: number;
  emoji: string;
}

export default function ProfileTabsClient({
  celebrity,
  products,
  digitalProducts,
}: ProfileTabsClientProps) {
  const videoTypes = celebrity.videoTypes || [];

  const tabs: TabConfig[] = [
    { id: "video", label: "Personalizovane poruke", count: videoTypes.length, emoji: "🎬" },
    { id: "merch", label: "Merch", count: products.length, emoji: "👕" },
    { id: "digital", label: "Digitalni proizvodi", count: digitalProducts.length, emoji: "📦" },
  ];

  // Default to first non-empty tab, or "video" if all empty
  const defaultTab = tabs.find((t) => t.count > 0)?.id || "video";
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="space-y-8">
      {/* Tab bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200",
              activeTab === tab.id
                ? "bg-primary-600 text-white shadow-md shadow-primary-500/25"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            )}
          >
            <span>{tab.emoji}</span>
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span
                className={cn(
                  "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold",
                  activeTab === tab.id
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-500"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {/* Personalizovane poruke */}
        {activeTab === "video" && (
          <div className="space-y-8">
            {videoTypes.length > 0 ? (
              <>
                <ProfileVideoMockups videoTypes={videoTypes} />
                <div className="flex justify-center pt-4">
                  <Link href={`/naruci/${celebrity.slug}`}>
                    <Button variant="primary" size="lg">
                      Naruci video poruku
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <EmptyTabState
                icon="🎬"
                title="Nema video poruka"
                description={`${celebrity.name} trenutno nema dostupne personalizovane video poruke.`}
              />
            )}
          </div>
        )}

        {/* Merch */}
        {activeTab === "merch" && (
          <div>
            {products.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <EmptyTabState
                icon="👕"
                title="Nema merch proizvoda"
                description={`${celebrity.name} trenutno nema dostupne merch proizvode.`}
              />
            )}
          </div>
        )}

        {/* Digitalni proizvodi */}
        {activeTab === "digital" && (
          <div>
            {digitalProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {digitalProducts.map((product) => (
                  <DigitalProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <EmptyTabState
                icon="📦"
                title="Nema digitalnih proizvoda"
                description={`${celebrity.name} trenutno nema dostupne digitalne proizvode.`}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
