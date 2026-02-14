/**
 * @fileoverview Category card with 3D tilt effect on hover.
 * Client component for use inside the server-rendered CategoriesSection.
 */

"use client";

import { useTilt } from "@/hooks/useTilt";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import CategoryPreviewGrid from "./CategoryPreviewGrid";
import type { Category } from "@/lib/types";

interface TiltCategoryCardProps {
  category: Category;
  accentClass: string;
  trending?: boolean;
}

/**
 * Single category card wrapped with 3D tilt on hover.
 */
export default function TiltCategoryCard({ category, accentClass, trending }: TiltCategoryCardProps) {
  const tilt = useTilt({ maxAngle: 14 });

  return (
    <a
      ref={tilt.ref}
      href={`#${category.slug}`}
      className="group relative flex flex-col items-center gap-3 rounded-2xl border border-white/30 bg-white/15 p-6 text-center shadow-lg shadow-black/5 backdrop-blur-xl transition-all duration-300 ease-out hover:bg-white/25 hover:shadow-xl"
      {...tilt.handlers}
    >
      {/* Trending badge */}
      {trending && (
        <div className="absolute -right-2 -top-2 z-10 flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 text-xs font-bold text-white shadow-lg animate-pulse">
          🔥 Trending
        </div>
      )}

      {/* Colored accent strip */}
      <div className={`absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r ${accentClass}`} />

      {/* Category icon with glass background */}
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-4xl backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-white/30">
        {category.icon}
      </div>

      {/* Category name */}
      <h3 className="text-base font-bold text-white">
        {category.name}
      </h3>

      {/* Celebrity count */}
      <p className="text-sm text-primary-200">
        <AnimatedCounter target={category.celebrityCount} suffix="" /> zvezda
      </p>

      {/* Hover preview — celebrity avatars */}
      <div className="h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:h-auto group-hover:opacity-100">
        <CategoryPreviewGrid categoryName={category.name} />
      </div>

      {/* Arrow indicator */}
      <span className="text-xs font-medium text-secondary-300 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
        Pogledaj →
      </span>
    </a>
  );
}
