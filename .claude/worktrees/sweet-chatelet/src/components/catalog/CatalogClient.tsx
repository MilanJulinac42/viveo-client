/**
 * @fileoverview Main catalog orchestrator component.
 * Fetches celebrities and categories from API, manages search, filtering, sorting.
 */

"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CelebrityCard from "@/components/profile/CelebrityCard";
import SearchInput from "./SearchInput";
import SortSelect, { type SortOption } from "./SortSelect";
import { cn } from "@/lib/utils";
import { getCelebrities, type CelebritiesParams } from "@/lib/api/celebrities";
import { getCategories } from "@/lib/api/categories";
import type { Celebrity, Category } from "@/lib/types";

interface CatalogClientProps {
  /** Pre-selected category slug (e.g., "glumci") for category pages */
  initialCategory?: string;
  /** Pre-filled search query (e.g., for search page) */
  initialSearch?: string;
  /** Whether to show the page header section (default: true) */
  showHeader?: boolean;
  /** Auto-focus the search input on mount */
  autoFocusSearch?: boolean;
}

const PAGE_SIZE = 12;

export default function CatalogClient({
  initialCategory,
  initialSearch,
  showHeader = true,
  autoFocusSearch = false,
}: CatalogClientProps) {
  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialSearch || "");
  const [activeCategory, setActiveCategory] = useState(initialCategory || "");
  const [sortBy, setSortBy] = useState<SortOption>("popularity");
  const [page, setPage] = useState(1);
  const isFirstLoad = useRef(true);

  // ---------------------------------------------------------------------------
  // Fetch categories once
  // ---------------------------------------------------------------------------
  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
  }, []);

  // ---------------------------------------------------------------------------
  // Fetch celebrities when filters change
  // ---------------------------------------------------------------------------
  useEffect(() => {
    let cancelled = false;

    const params: CelebritiesParams = {
      page,
      pageSize: PAGE_SIZE,
      sort: sortBy,
    };
    if (searchQuery.trim()) params.search = searchQuery.trim();
    if (activeCategory) params.category = activeCategory;

    if (isFirstLoad.current || page === 1) {
      setLoading(true);
    }

    getCelebrities(params)
      .then((res) => {
        if (cancelled) return;
        if (page === 1) {
          setCelebrities(res.data);
        } else {
          setCelebrities((prev) => [...prev, ...res.data]);
        }
        setTotalCount(res.meta?.total ?? res.data.length);
        isFirstLoad.current = false;
      })
      .catch(() => {
        if (!cancelled) {
          setCelebrities([]);
          setTotalCount(0);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [searchQuery, activeCategory, sortBy, page]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [searchQuery, activeCategory, sortBy]);

  // Build tabs array
  const tabs = useMemo(
    () => [
      { label: "Svi", slug: "" },
      ...categories.map((c) => ({
        label: `${c.icon} ${c.name}`,
        slug: c.slug,
      })),
    ],
    [categories]
  );

  const hasMore = celebrities.length < totalCount;

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------
  const handleClearFilters = useCallback(() => {
    setSearchQuery("");
    setActiveCategory("");
    setSortBy("popularity");
  }, []);

  const handleLoadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <>
      {showHeader && (
        <section className="bg-gradient-to-b from-primary-50 to-white pb-8 pt-12 sm:pb-12 sm:pt-16">
          <Container>
            <div className="text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Sve zvezde
              </h1>
              <div className="mx-auto mt-4 flex items-center justify-center gap-1.5">
                <span className="h-1 w-6 rounded-full bg-secondary-400" />
                <span className="h-1 w-12 rounded-full bg-primary-500" />
                <span className="h-1 w-6 rounded-full bg-secondary-400" />
              </div>
              <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
                Pronađi savršenu zvezdu za personalizovanu video poruku
              </p>
            </div>
          </Container>
        </section>
      )}

      {/* Search + Sort + Category Tabs */}
      <section className="border-b border-slate-100 pb-6">
        <Container>
          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              className="flex-1"
              autoFocus={autoFocusSearch}
            />
            <SortSelect
              value={sortBy}
              onChange={setSortBy}
              className="w-full sm:w-56"
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.slug}
                type="button"
                onClick={() => setActiveCategory(tab.slug)}
                aria-pressed={activeCategory === tab.slug}
                className={cn(
                  "rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200",
                  activeCategory === tab.slug
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                    : "border border-slate-200 bg-white/80 text-slate-600 hover:bg-primary-50 hover:text-primary-700"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Results */}
      <section className="py-8 sm:py-12">
        <Container>
          {loading && celebrities.length === 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-72 animate-pulse rounded-2xl bg-slate-100"
                />
              ))}
            </div>
          ) : celebrities.length > 0 ? (
            <>
              <p className="mb-6 text-sm text-slate-500">
                Prikazano {celebrities.length} od {totalCount} zvezda
              </p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {celebrities.map((celebrity, i) => (
                  <ScrollReveal
                    key={celebrity.id}
                    delay={Math.min(i * 0.05, 0.4)}
                  >
                    <CelebrityCard celebrity={celebrity} />
                  </ScrollReveal>
                ))}
              </div>

              {hasMore && (
                <div className="mt-12 text-center">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleLoadMore}
                    disabled={loading}
                  >
                    {loading ? "Učitavanje..." : "Prikaži još"}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="py-20 text-center">
              <span className="text-6xl">🔍</span>
              <h3 className="mt-6 text-xl font-bold text-slate-700">
                Nema rezultata
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-slate-500">
                Pokušajte sa drugim terminom pretrage ili promenite kategoriju.
              </p>
              <Button
                variant="outline"
                size="md"
                onClick={handleClearFilters}
                className="mt-6"
              >
                Obrišite filtere
              </Button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
