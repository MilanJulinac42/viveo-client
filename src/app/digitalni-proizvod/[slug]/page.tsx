"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { getDigitalProduct } from "@/lib/api/digital-products";
import { formatPrice, getPlaceholderImage, formatFileSize } from "@/lib/utils";
import type { DigitalProductDetail } from "@/lib/types";

export default function DigitalProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<DigitalProductDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getDigitalProduct(slug)
      .then((data) => setProduct(data))
      .catch(() => router.push("/digitalni-proizvodi"))
      .finally(() => setLoading(false));
  }, [slug, router]);

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

  const imageUrl = product.previewImageUrl || getPlaceholderImage(product.name, 600);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* Breadcrumb */}
        <section className="bg-white border-b border-slate-100">
          <Container>
            <div className="py-3 flex items-center gap-2 text-sm text-slate-500">
              <Link href="/digitalni-proizvodi" className="hover:text-primary-600 transition-colors">
                Digitalni proizvodi
              </Link>
              <span>/</span>
              <span className="text-slate-900">{product.name}</span>
            </div>
          </Container>
        </section>

        <section className="py-8">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Preview Image */}
              <div>
                <div className="aspect-square overflow-hidden rounded-2xl bg-white border border-slate-100">
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
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
                  {formatPrice(product.price)}
                </p>

                {product.description && (
                  <p className="mt-4 text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {product.description}
                  </p>
                )}

                {/* File Info */}
                <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <h3 className="text-sm font-medium text-slate-700 mb-3">Informacije o fajlu</h3>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">Tip:</span>
                      <Badge variant="primary" size="sm">{product.fileType.toUpperCase()}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">Velicina:</span>
                      <span className="text-slate-900 font-medium">{formatFileSize(product.fileSize)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">Preuzimanja:</span>
                      <span className="text-slate-900 font-medium">{product.downloadCount}</span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8">
                  <Button
                    size="lg"
                    fullWidth
                    onClick={() => router.push(`/kupi-digitalni/${product.slug}`)}
                  >
                    Kupi — {formatPrice(product.price)}
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
