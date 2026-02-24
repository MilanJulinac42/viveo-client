/**
 * @fileoverview Heart toggle button for adding/removing items from favorites.
 * Requires authentication — redirects to login if not logged in.
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { addFavorite, removeFavorite, checkFavorite } from "@/lib/api/favorites";

type ItemType = "celebrity" | "product" | "digital_product";

interface FavoriteButtonProps {
  itemType: ItemType;
  itemId: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-7 w-7",
  md: "h-9 w-9",
  lg: "h-11 w-11",
};

const iconSizeMap = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export default function FavoriteButton({
  itemType,
  itemId,
  size = "md",
  className,
}: FavoriteButtonProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check initial state
  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    checkFavorite(itemType, itemId)
      .then((data) => {
        if (!cancelled) setIsFavorite(data.isFavorite);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [user, itemType, itemId]);

  const handleToggle = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!user) {
        router.push("/prijava");
        return;
      }

      if (loading) return;

      // Optimistic update
      const wasFavorite = isFavorite;
      setIsFavorite(!wasFavorite);
      setLoading(true);

      try {
        if (wasFavorite) {
          await removeFavorite(itemType, itemId);
        } else {
          await addFavorite(itemType, itemId);
        }
      } catch {
        // Revert on error
        setIsFavorite(wasFavorite);
      } finally {
        setLoading(false);
      }
    },
    [user, router, loading, isFavorite, itemType, itemId]
  );

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={loading}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-all duration-200",
        "bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md",
        "border border-slate-100 hover:border-red-200",
        sizeMap[size],
        className
      )}
      aria-label={isFavorite ? "Ukloni iz omiljenih" : "Dodaj u omiljene"}
    >
      <svg
        className={cn(
          iconSizeMap[size],
          "transition-all duration-300",
          isFavorite
            ? "fill-red-500 text-red-500 scale-110"
            : "fill-none text-slate-400 hover:text-red-400"
        )}
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  );
}
