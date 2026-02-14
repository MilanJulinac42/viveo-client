/**
 * @fileoverview Category page with SSG support.
 * Displays celebrities filtered by category with a hero banner.
 *
 * @route /kategorija/[slug]
 */

import { notFound } from "next/navigation";
import { MOCK_CATEGORIES, MOCK_CELEBRITIES } from "@/lib/constants";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CatalogClient, CategoryHero } from "@/components/catalog";
import type { Metadata } from "next";

// ---------------------------------------------------------------------------
// Static params (SSG)
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return MOCK_CATEGORIES.map((c) => ({ slug: c.slug }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata (SEO)
// ---------------------------------------------------------------------------

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = MOCK_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return { title: "Kategorija nije pronađena — Viveo" };
  }

  return {
    title: `${category.name} — Zvezde | Viveo`,
    description: `Pretraži ${category.celebrityCount} zvezda u kategoriji ${category.name}. Naruči personalizovanu video poruku na Viveo platformi.`,
    openGraph: {
      title: `${category.name} — Viveo`,
      description: `${category.celebrityCount} zvezda u kategoriji ${category.name}`,
      type: "website",
    },
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = MOCK_CATEGORIES.find((c) => c.slug === slug);

  if (!category) notFound();

  const categoryCelebrities = MOCK_CELEBRITIES.filter(
    (c) => c.category === category.name
  );

  return (
    <>
      <Header />
      <main>
        <CategoryHero
          category={category}
          celebrityCount={categoryCelebrities.length}
        />
        <CatalogClient
          celebrities={MOCK_CELEBRITIES}
          categories={MOCK_CATEGORIES}
          initialCategory={category.name}
          showHeader={false}
        />
      </main>
      <Footer />
    </>
  );
}
