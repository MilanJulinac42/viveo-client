/**
 * @fileoverview Client component for the favorites/wishlist page.
 * Shows 3 tabs: Zvezde, Prodavnica, Digitalni sadržaj.
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { listFavorites, removeFavorite } from "@/lib/api/favorites";
import Image from "next/image";
import Link from "next/link";
import { getPlaceholderImage } from "@/lib/utils";
import Button from "@/components/ui/Button";

type Tab = "celebrities" | "products" | "digitalProducts";

interface FavoriteData {
  celebrities: Array<{
    id: string;
    name: string;
    slug: string;
    image: string;
    category: string;
    rating: number;
    verified: boolean;
    price: number;
  }>;
  products: Array<{
    id: string;
    name: string;
    slug: string;
    price: number;
    celebrityName: string;
    celebritySlug: string;
    imageUrl: string | null;
  }>;
  digitalProducts: Array<{
    id: string;
    name: string;
    slug: string;
    price: number;
    fileType: string;
    previewImageUrl: string | null;
    celebrityName: string;
    celebritySlug: string;
  }>;
}

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: "celebrities", label: "Zvezde", icon: "⭐" },
  { key: "products", label: "Prodavnica", icon: "🛍️" },
  { key: "digitalProducts", label: "Digitalni", icon: "📥" },
];

function formatPrice(price: number) {
  return `${price.toLocaleString("sr-RS")} RSD`;
}

export default function FavoritesClient() {
  const [tab, setTab] = useState<Tab>("celebrities");
  const [data, setData] = useState<FavoriteData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = useCallback(async () => {
    setLoading(true);
    try {
      const result = await listFavorites();
      setData(result as FavoriteData);
    } catch {
      setData({ celebrities: [], products: [], digitalProducts: [] });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleRemove = useCallback(
    async (itemType: "celebrity" | "product" | "digital_product", itemId: string) => {
      if (!data) return;

      // Optimistic update
      setData((prev) => {
        if (!prev) return prev;
        if (itemType === "celebrity") {
          return { ...prev, celebrities: prev.celebrities.filter((c) => c.id !== itemId) };
        }
        if (itemType === "product") {
          return { ...prev, products: prev.products.filter((p) => p.id !== itemId) };
        }
        return { ...prev, digitalProducts: prev.digitalProducts.filter((d) => d.id !== itemId) };
      });

      try {
        await removeFavorite(itemType, itemId);
      } catch {
        // Refetch on error
        fetchFavorites();
      }
    },
    [data, fetchFavorites]
  );

  return (
    <div className="py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Moji omiljeni</h1>
        <p className="mt-2 text-slate-500">
          Sačuvani sadržaji koje volite na jednom mestu
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2">
        {TABS.map((t) => {
          const count = data
            ? t.key === "celebrities"
              ? data.celebrities.length
              : t.key === "products"
                ? data.products.length
                : data.digitalProducts.length
            : 0;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                tab === t.key
                  ? "bg-primary-500 text-white shadow-md shadow-primary-500/25"
                  : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
              )}
            >
              <span>{t.icon}</span>
              {t.label}
              {!loading && (
                <span
                  className={cn(
                    "ml-1 rounded-full px-1.5 py-0.5 text-xs",
                    tab === t.key
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500"
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 animate-pulse rounded-2xl bg-white border border-slate-100" />
          ))}
        </div>
      )}

      {/* Celebrities Tab */}
      {!loading && tab === "celebrities" && (
        <div>
          {data?.celebrities.length === 0 ? (
            <EmptyState text="Nemate omiljenih zvezda" linkText="Pregledaj zvezde" href="/zvezde" />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data?.celebrities.map((c) => (
                <div
                  key={c.id}
                  className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white transition-shadow hover:shadow-lg"
                >
                  <Link href={`/zvezde/${c.slug}`} className="flex items-center gap-4 p-5">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-slate-100">
                      <Image
                        src={c.image || getPlaceholderImage(c.name)}
                        alt={c.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold text-slate-900 truncate">
                        {c.name}
                        {c.verified && <span className="ml-1 text-primary-500">✓</span>}
                      </p>
                      <p className="text-sm text-slate-400">{c.category}</p>
                      <p className="mt-1 text-sm font-medium text-primary-500">{formatPrice(c.price)}</p>
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleRemove("celebrity", c.id)}
                    className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 text-slate-400 shadow-sm transition-colors hover:bg-red-50 hover:text-red-500"
                    aria-label="Ukloni iz omiljenih"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Products Tab */}
      {!loading && tab === "products" && (
        <div>
          {data?.products.length === 0 ? (
            <EmptyState text="Nemate omiljenih proizvoda" linkText="Pregledaj prodavnicu" href="/prodavnica" />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data?.products.map((p) => (
                <div
                  key={p.id}
                  className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white transition-shadow hover:shadow-lg"
                >
                  <Link href={`/prodavnica/${p.celebritySlug}/${p.slug}`} className="block">
                    <div className="relative h-40 w-full bg-slate-100">
                      {p.imageUrl ? (
                        <Image src={p.imageUrl} alt={p.name} fill className="object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-4xl">🛍️</div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-semibold text-slate-900 truncate">{p.name}</p>
                      <p className="text-xs text-slate-400">{p.celebrityName}</p>
                      <p className="mt-1 text-sm font-bold text-primary-500">{formatPrice(p.price)}</p>
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleRemove("product", p.id)}
                    className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 text-slate-400 shadow-sm transition-colors hover:bg-red-50 hover:text-red-500"
                    aria-label="Ukloni iz omiljenih"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Digital Products Tab */}
      {!loading && tab === "digitalProducts" && (
        <div>
          {data?.digitalProducts.length === 0 ? (
            <EmptyState text="Nemate omiljenog digitalnog sadržaja" linkText="Pregledaj digitalni sadržaj" href="/digitalni-proizvodi" />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data?.digitalProducts.map((d) => (
                <div
                  key={d.id}
                  className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white transition-shadow hover:shadow-lg"
                >
                  <Link href={`/digitalni-proizvodi/${d.celebritySlug}/${d.slug}`} className="block">
                    <div className="relative h-40 w-full bg-slate-100">
                      {d.previewImageUrl ? (
                        <Image src={d.previewImageUrl} alt={d.name} fill className="object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-4xl">📥</div>
                      )}
                      <div className="absolute bottom-2 left-2 rounded-lg bg-black/60 px-2 py-1 text-xs font-bold text-white">
                        {d.fileType.toUpperCase()}
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-semibold text-slate-900 truncate">{d.name}</p>
                      <p className="text-xs text-slate-400">{d.celebrityName}</p>
                      <p className="mt-1 text-sm font-bold text-primary-500">{formatPrice(d.price)}</p>
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleRemove("digital_product", d.id)}
                    className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 text-slate-400 shadow-sm transition-colors hover:bg-red-50 hover:text-red-500"
                    aria-label="Ukloni iz omiljenih"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/** Empty state component */
function EmptyState({
  text,
  linkText,
  href,
}: {
  text: string;
  linkText: string;
  href: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-16">
      <div className="text-5xl mb-4">💔</div>
      <p className="text-slate-400 mb-4">{text}</p>
      <Link href={href}>
        <Button variant="outline" size="sm">{linkText}</Button>
      </Link>
    </div>
  );
}
