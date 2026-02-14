/**
 * @fileoverview Main catalog orchestrator component.
 * Manages search, category filtering, sorting, and pagination state.
 * Renders the complete catalog page layout inside the server page shell.
 */

"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CelebrityCard from "@/components/profile/CelebrityCard";
import SearchInput from "./SearchInput";
import SortSelect, { type SortOption } from "./SortSelect";
import { cn } from "@/lib/utils";
import type { Celebrity, Category } from "@/lib/types";

interface CatalogClientProps {
  /** All celebrities to display */
  celebrities: Celebrity[];
  /** All categories for filter tabs */
  categories: Category[];
  /** Pre-selected category (e.g., "Glumci") for category pages */
  initialCategory?: string;
  /** Whether to show the page header section (default: true) */
  showHeader?: boolean;
}

/** Items per page for load-more pagination */
const PAGE_SIZE = 8;

export default function CatalogClient({
  celebrities,
  categories,
  initialCategory,
  showHeader = true,
}: CatalogClientProps) {
  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(initialCategory || "Svi");
  const [sortBy, setSortBy] = useState<SortOption>("popularity");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [searchQuery, activeCategory]);

  // Build tabs array: "Svi" + all categories with emoji
  const tabs = useMemo(
    () => [
      { label: "Svi", category: "Svi" },
      ...categories.map((c) => ({
        label: `${c.icon} ${c.name}`,
        category: c.name,
      })),
    ],
    [categories]
  );

  // ---------------------------------------------------------------------------
  // Filtering, searching, sorting (derived data)
  // ---------------------------------------------------------------------------
  const filtered = useMemo(() => {
    let results = celebrities;

    // 1. Category filter
    if (activeCategory !== "Svi") {
      results = results.filter((c) => c.category === activeCategory);
    }

    // 2. Search filter (name, bio, category — case-insensitive)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.bio.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }

    // 3. Sort
    switch (sortBy) {
      case "price-asc":
        results = [...results].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        results = [...results].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        results = [...results].sort((a, b) => b.rating - a.rating);
        break;
      case "popularity":
      default:
        results = [...results].sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return results;
  }, [celebrities, activeCategory, searchQuery, sortBy]);

  const visibleCelebrities = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------
  const handleClearFilters = useCallback(() => {
    setSearchQuery("");
    setActiveCategory("Svi");
    setSortBy("popularity");
  }, []);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  }, []);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* Page Header (hidden on category pages that have their own hero)   */}
      {/* ----------------------------------------------------------------- */}
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

      {/* ----------------------------------------------------------------- */}
      {/* Search + Sort + Category Tabs                                     */}
      {/* ----------------------------------------------------------------- */}
      <section className="border-b border-slate-100 pb-6">
        <Container>
          {/* Search + Sort row */}
          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              className="flex-1"
            />
            <SortSelect
              value={sortBy}
              onChange={setSortBy}
              className="w-full sm:w-56"
            />
          </div>

          {/* Category tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.category}
                type="button"
                onClick={() => setActiveCategory(tab.category)}
                aria-pressed={activeCategory === tab.category}
                className={cn(
                  "rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200",
                  activeCategory === tab.category
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

      {/* ----------------------------------------------------------------- */}
      {/* Results                                                           */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-8 sm:py-12">
        <Container>
          {/* Results count */}
          {filtered.length > 0 && (
            <p className="mb-6 text-sm text-slate-500">
              Prikazano {visibleCelebrities.length} od {filtered.length} zvezda
            </p>
          )}

          {/* Grid */}
          {filtered.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {visibleCelebrities.map((celebrity, i) => (
                  <ScrollReveal
                    key={celebrity.id}
                    delay={Math.min(i * 0.05, 0.4)}
                  >
                    <CelebrityCard celebrity={celebrity} />
                  </ScrollReveal>
                ))}
              </div>

              {/* Load more */}
              {hasMore && (
                <div className="mt-12 text-center">
                  <Button variant="outline" size="lg" onClick={handleLoadMore}>
                    Prikaži još
                  </Button>
                </div>
              )}
            </>
          ) : (
            /* Empty state */
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
