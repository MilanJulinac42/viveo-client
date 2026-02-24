/**
 * @fileoverview Landing page section showcasing digital products from celebrities.
 * Fetches featured digital products from API with fallback to empty state.
 */

import Link from "next/link";
import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getDigitalProducts } from "@/lib/api/digital-products";
import { formatPrice, getPlaceholderImage, formatFileSize } from "@/lib/utils";

export default async function DigitalPreviewSection() {
  let products: { id: string; name: string; slug: string; price: number; celebrityName: string; previewImageUrl: string | null; fileType: string; fileSize: number; downloadCount: number }[] = [];
  try {
    const data = await getDigitalProducts({ pageSize: 4 });
    products = (data as any).products ?? (data as any).data ?? data ?? [];
  } catch {
    // API unavailable — section will show CTA only
  }

  return (
    <section className="relative bg-slate-50 py-16 sm:py-24">
      <Container>
        <ScrollReveal>
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-accent-50 px-4 py-1.5 text-sm font-semibold text-accent-600">
              Novo
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Digitalni sadržaj zvezda
            </h2>
            <div className="mx-auto mt-3 flex items-center justify-center gap-1.5">
              <span className="h-1 w-6 rounded-full bg-slate-200" />
              <span className="h-1 w-12 rounded-full bg-accent-500" />
              <span className="h-1 w-6 rounded-full bg-slate-200" />
            </div>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Preseti, šabloni, edukativni materijali i još mnogo toga — direktno od kreatora, instant preuzimanje
            </p>
          </div>
        </ScrollReveal>

        {products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, i) => (
              <ScrollReveal key={product.id} delay={0.1 * i}>
                <Link
                  href={`/digitalni-proizvod/${product.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="aspect-square overflow-hidden bg-slate-50">
                    <img
                      src={product.previewImageUrl || getPlaceholderImage(product.name, 300)}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-accent-50 px-2 py-0.5 text-xs font-medium text-accent-700">
                        📥 {product.fileType || "Fajl"}
                      </span>
                      {product.fileSize > 0 && (
                        <span className="text-xs text-slate-400">
                          {formatFileSize(product.fileSize)}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-medium text-primary-500">{product.celebrityName}</p>
                    <h3 className="mt-1 text-sm font-semibold text-slate-900 line-clamp-1">{product.name}</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm font-bold text-slate-900">{formatPrice(product.price)}</p>
                      {product.downloadCount > 0 && (
                        <p className="text-xs text-slate-400">{product.downloadCount} preuzimanja</p>
                      )}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        ) : null}

        <ScrollReveal delay={0.3}>
          <div className="mt-10 text-center">
            <Link
              href="/digitalni-proizvodi"
              className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-500/25 transition-all hover:bg-accent-600 hover:shadow-xl hover:shadow-accent-500/30"
            >
              Pogledaj digitalne proizvode
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
