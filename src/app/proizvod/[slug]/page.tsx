"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { getProduct } from "@/lib/api/products";
import { formatPrice, getPlaceholderImage, cn } from "@/lib/utils";
import type { ProductDetail, ProductVariant } from "@/lib/types";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getProduct(slug)
      .then((data) => {
        setProduct(data);
        if (data.variants.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      })
      .catch(() => router.push("/prodavnica"))
      .finally(() => setLoading(false));
  }, [slug, router]);

  const currentPrice = useMemo(() => {
    if (!product) return 0;
    return selectedVariant?.priceOverride ?? product.price;
  }, [product, selectedVariant]);

  const inStock = useMemo(() => {
    if (!selectedVariant) return true;
    return selectedVariant.stock > 0;
  }, [selectedVariant]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-slate-50 py-8">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square animate-pulse rounded-2xl bg-slate-100" />
              <div className="space-y-4">
                <div className="h-6 w-40 animate-pulse rounded bg-slate-100" />
                <div className="h-8 w-64 animate-pulse rounded bg-slate-100" />
                <div className="h-10 w-32 animate-pulse rounded bg-slate-100" />
              </div>
            </div>
          </Container>
        </main>
        <Footer />
      </>
    );
  }

  if (!product) return null;

  const images = product.images.length > 0
    ? product.images
    : [{ id: "placeholder", imageUrl: getPlaceholderImage(product.name, 600), imagePath: "", sortOrder: 0 }];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* Breadcrumb */}
        <section className="bg-white border-b border-slate-100">
          <Container>
            <div className="py-3 flex items-center gap-2 text-sm text-slate-500">
              <Link href="/prodavnica" className="hover:text-primary-600 transition-colors">
                Prodavnica
              </Link>
              <span>/</span>
              <span className="text-slate-900">{product.name}</span>
            </div>
          </Container>
        </section>

        <section className="py-8">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Image Gallery */}
              <div>
                <div className="aspect-square overflow-hidden rounded-2xl bg-white border border-slate-100">
                  <img
                    src={images[selectedImage].imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                {images.length > 1 && (
                  <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                    {images.map((img, i) => (
                      <button
                        key={img.id}
                        onClick={() => setSelectedImage(i)}
                        className={cn(
                          "shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors cursor-pointer",
                          selectedImage === i
                            ? "border-primary-500"
                            : "border-slate-100 hover:border-slate-300"
                        )}
                      >
                        <img
                          src={img.imageUrl}
                          alt={`${product.name} ${i + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div>
                <Link
                  href={`/zvezda/${product.celebritySlug}`}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  {product.celebrityName}
                </Link>

                <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                  {product.name}
                </h1>

                {product.categoryName && (
                  <div className="mt-3">
                    <Badge variant="default">{product.categoryName}</Badge>
                  </div>
                )}

                <p className="mt-4 text-3xl font-extrabold text-primary-600">
                  {formatPrice(currentPrice)}
                </p>

                {product.description && (
                  <p className="mt-4 text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {product.description}
                  </p>
                )}

                {/* Variant Selection */}
                {product.variants.length > 0 && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Varijanta
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => {
                            setSelectedVariant(v);
                            setQuantity(1);
                          }}
                          disabled={v.stock === 0}
                          className={cn(
                            "px-4 py-2 text-sm rounded-xl border transition-colors cursor-pointer",
                            selectedVariant?.id === v.id
                              ? "border-primary-500 bg-primary-50 text-primary-700 font-medium"
                              : v.stock === 0
                              ? "border-slate-200 bg-slate-50 text-slate-300 cursor-not-allowed"
                              : "border-slate-200 text-slate-700 hover:border-primary-300"
                          )}
                        >
                          {v.name}
                          {v.stock === 0 && " (Rasprodato)"}
                        </button>
                      ))}
                    </div>
                    {selectedVariant && selectedVariant.stock > 0 && selectedVariant.stock <= 5 && (
                      <p className="mt-2 text-xs text-secondary-600">
                        Preostalo samo {selectedVariant.stock} komada!
                      </p>
                    )}
                  </div>
                )}

                {/* Quantity */}
                {inStock && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Količina
                    </label>
                    <div className="inline-flex items-center border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-4 py-2 text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 text-sm font-medium text-slate-900 min-w-[3rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() =>
                          setQuantity((q) =>
                            selectedVariant ? Math.min(selectedVariant.stock, q + 1) : q + 1
                          )
                        }
                        className="px-4 py-2 text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-8">
                  {inStock ? (
                    <Button
                      size="lg"
                      fullWidth
                      onClick={() => {
                        const params = new URLSearchParams();
                        if (selectedVariant) params.set("variant", selectedVariant.id);
                        params.set("qty", String(quantity));
                        router.push(`/naruci-merch/${product.slug}?${params.toString()}`);
                      }}
                    >
                      Naruči — {formatPrice(currentPrice * quantity)}
                    </Button>
                  ) : (
                    <Button size="lg" fullWidth disabled>
                      Rasprodato
                    </Button>
                  )}
                </div>

                {/* Total */}
                {quantity > 1 && inStock && (
                  <p className="mt-3 text-center text-sm text-slate-500">
                    {quantity} x {formatPrice(currentPrice)} = {formatPrice(currentPrice * quantity)}
                  </p>
                )}
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
