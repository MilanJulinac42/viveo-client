"use client";

import { useState, useEffect, useCallback } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import SearchInput from "@/components/catalog/SearchInput";
import DigitalProductCard from "@/components/digital/DigitalProductCard";
import { getDigitalProducts, getDigitalProductCategories } from "@/lib/api/digital-products";
import { cn } from "@/lib/utils";
import type { DigitalProduct, DigitalProductCategory } from "@/lib/types";

export default function DigitalniProizvodiPage() {
  const [products, setProducts] = useState<DigitalProduct[]>([]);
  const [categories, setCategories] = useState<DigitalProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getDigitalProductCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getDigitalProducts({
        page,
        pageSize: 12,
        search,
        category: categoryFilter,
      });
      setProducts(res.data);
      if (res.meta) setTotalPages(res.meta.totalPages);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [page, search, categoryFilter]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-12 sm:py-16">
          <Container>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Digitalni Proizvodi
              </h1>
              <p className="mt-3 text-lg text-primary-100 max-w-2xl mx-auto">
                Preset-ovi, šabloni, muzika i drugi digitalni sadržaji od vaših omiljenih zvezda
              </p>
            </div>
          </Container>
        </section>

        {/* Filters */}
        <section className="py-6 bg-white border-b border-slate-100 sticky top-16 z-30">
          <Container>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-full sm:w-72">
                <SearchInput
                  value={search}
                  onChange={(v) => {
                    setSearch(v);
                    setPage(1);
                  }}
                  placeholder="Pretrazi digitalne proizvode..."
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => {
                    setCategoryFilter("");
                    setPage(1);
                  }}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-full transition-colors cursor-pointer",
                    categoryFilter === ""
                      ? "bg-primary-500 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  Sve
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setCategoryFilter(cat.slug);
                      setPage(1);
                    }}
                    className={cn(
                      "px-3 py-1.5 text-sm rounded-full transition-colors cursor-pointer",
                      categoryFilter === cat.slug
                        ? "bg-primary-500 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    )}
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Products Grid */}
        <section className="py-8">
          <Container>
            {loading ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse rounded-2xl bg-white border border-slate-100"
                  >
                    <div className="aspect-square bg-slate-100 rounded-t-2xl" />
                    <div className="p-4 space-y-2">
                      <div className="h-3 w-20 bg-slate-100 rounded" />
                      <div className="h-4 w-full bg-slate-100 rounded" />
                      <div className="h-5 w-24 bg-slate-100 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-4xl mb-4">📦</p>
                <h3 className="text-lg font-semibold text-slate-900">
                  Nema digitalnih proizvoda
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {search || categoryFilter
                    ? "Pokusajte sa drugom pretragom ili kategorijom"
                    : "Digitalni proizvodi ce uskoro biti dostupni"}
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {products.map((product) => (
                    <DigitalProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-4">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page <= 1}
                      className="px-4 py-2 text-sm rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      Prethodna
                    </button>
                    <span className="text-sm text-slate-500">
                      Strana {page} od {totalPages}
                    </span>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page >= totalPages}
                      className="px-4 py-2 text-sm rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      Sledeca
                    </button>
                  </div>
                )}
              </>
            )}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
