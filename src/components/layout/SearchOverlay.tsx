/**
 * @fileoverview Full-screen search overlay with debounced search across
 * celebrities, merch products, and digital products.
 * Triggered from the Header search icon or Cmd+K / Ctrl+K shortcut.
 */

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { globalSearch } from "@/lib/api/search";
import type { GlobalSearchResult } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { getPlaceholderImage } from "@/lib/utils";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

/** Format price in RSD */
function formatPrice(price: number) {
  return `${price.toLocaleString("sr-RS")} RSD`;
}

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GlobalSearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Focus input when overlay opens
  useEffect(() => {
    if (open) {
      setQuery("");
      setResults(null);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Debounced search
  const handleSearch = useCallback((value: string) => {
    setQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.trim().length < 2) {
      setResults(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const data = await globalSearch(value.trim());
        setResults(data);
      } catch {
        setResults(null);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, []);

  const hasResults =
    results &&
    (results.celebrities.length > 0 ||
      results.products.length > 0 ||
      results.digitalProducts.length > 0);

  const noResults = results && !hasResults && query.trim().length >= 2;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 backdrop-blur-sm pt-[10vh]"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-2xl mx-4 overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
              <svg
                className="h-5 w-5 shrink-0 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Pretraži zvezde, proizvode, digitalni sadržaj..."
                className="flex-1 text-base text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
              />
              {loading && (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
              )}
              <kbd className="hidden sm:inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-400">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {/* Loading skeleton */}
              {loading && !results && (
                <div className="space-y-3 p-5">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-10 w-10 animate-pulse rounded-full bg-slate-100" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-32 animate-pulse rounded bg-slate-100" />
                        <div className="h-2 w-20 animate-pulse rounded bg-slate-100" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* No results */}
              {noResults && (
                <div className="py-12 text-center">
                  <p className="text-lg text-slate-400">Nema rezultata</p>
                  <p className="mt-1 text-sm text-slate-300">
                    Pokušajte sa drugačijim pojmom pretrage
                  </p>
                </div>
              )}

              {/* Grouped results */}
              {hasResults && (
                <div className="divide-y divide-slate-100">
                  {/* Celebrities */}
                  {results.celebrities.length > 0 && (
                    <div className="p-4">
                      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Zvezde
                      </h3>
                      <div className="space-y-1">
                        {results.celebrities.map((c) => (
                          <Link
                            key={c.id}
                            href={`/zvezde/${c.slug}`}
                            onClick={onClose}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-50"
                          >
                            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-100">
                              <Image
                                src={c.image || getPlaceholderImage(c.name)}
                                alt={c.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-800 truncate">
                                {c.name}
                                {c.verified && (
                                  <span className="ml-1 inline-block text-primary-500">✓</span>
                                )}
                              </p>
                              <p className="text-xs text-slate-400">{c.category}</p>
                            </div>
                            <span className="text-sm font-medium text-primary-500">
                              {formatPrice(c.price)}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Merch Products */}
                  {results.products.length > 0 && (
                    <div className="p-4">
                      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Prodavnica
                      </h3>
                      <div className="space-y-1">
                        {results.products.map((p) => (
                          <Link
                            key={p.id}
                            href={`/prodavnica/${p.celebritySlug}/${p.slug}`}
                            onClick={onClose}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-50"
                          >
                            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                              {p.imageUrl ? (
                                <Image
                                  src={p.imageUrl}
                                  alt={p.name}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-lg">
                                  🛍️
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-800 truncate">
                                {p.name}
                              </p>
                              <p className="text-xs text-slate-400">{p.celebrityName}</p>
                            </div>
                            <span className="text-sm font-medium text-primary-500">
                              {formatPrice(p.price)}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Digital Products */}
                  {results.digitalProducts.length > 0 && (
                    <div className="p-4">
                      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Digitalni sadržaj
                      </h3>
                      <div className="space-y-1">
                        {results.digitalProducts.map((d) => (
                          <Link
                            key={d.id}
                            href={`/digitalni-proizvodi/${d.celebritySlug}/${d.slug}`}
                            onClick={onClose}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-50"
                          >
                            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                              {d.previewImageUrl ? (
                                <Image
                                  src={d.previewImageUrl}
                                  alt={d.name}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-lg">
                                  📥
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-800 truncate">
                                {d.name}
                              </p>
                              <p className="text-xs text-slate-400">
                                {d.celebrityName} · {d.fileType.toUpperCase()}
                              </p>
                            </div>
                            <span className="text-sm font-medium text-primary-500">
                              {formatPrice(d.price)}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Initial hint */}
              {!loading && !results && query.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-sm text-slate-400">
                    Unesite bar 2 karaktera za pretragu
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
