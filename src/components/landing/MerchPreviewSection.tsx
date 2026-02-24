/**
 * @fileoverview Landing page section showcasing merch/products from celebrities.
 * Fetches featured products from API with fallback to empty state.
 */

import Link from "next/link";
import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getProducts } from "@/lib/api/products";
import { formatPrice, getPlaceholderImage } from "@/lib/utils";

export default async function MerchPreviewSection() {
  let products: { id: string; name: string; slug: string; price: number; celebrityName: string; imageUrl: string | null }[] = [];
  try {
    const data = await getProducts({ limit: 4, featured: true });
    products = data.products ?? data ?? [];
  } catch {
    // API unavailable — section will show CTA only
  }

  // If no featured products, try to get any recent ones
  if (products.length === 0) {
    try {
      const data = await getProducts({ limit: 4 });
      products = data.products ?? data ?? [];
    } catch {
      // Will show CTA-only layout
    }
  }

  return (
    <section className="relative bg-white py-16 sm:py-24">
      <Container>
        <ScrollReveal>
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-600">
              Novo
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Prodavnica zvezda
            </h2>
            <div className="mx-auto mt-3 flex items-center justify-center gap-1.5">
              <span className="h-1 w-6 rounded-full bg-slate-200" />
              <span className="h-1 w-12 rounded-full bg-primary-500" />
              <span className="h-1 w-6 rounded-full bg-slate-200" />
            </div>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Kupi originalni merch omiljenih zvezda — majice, šolje, posteri i još mnogo toga
            </p>
          </div>
        </ScrollReveal>

        {products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, i) => (
              <ScrollReveal key={product.id} delay={0.1 * i}>
                <Link
                  href={`/proizvod/${product.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="aspect-square overflow-hidden bg-slate-50">
                    <img
                      src={product.imageUrl || getPlaceholderImage(product.name, 300)}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-medium text-primary-500">{product.celebrityName}</p>
                    <h3 className="mt-1 text-sm font-semibold text-slate-900 line-clamp-1">{product.name}</h3>
                    <p className="mt-2 text-sm font-bold text-slate-900">{formatPrice(product.price)}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        ) : null}

        <ScrollReveal delay={0.3}>
          <div className="mt-10 text-center">
            <Link
              href="/prodavnica"
              className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/30"
            >
              Pogledaj prodavnicu
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
