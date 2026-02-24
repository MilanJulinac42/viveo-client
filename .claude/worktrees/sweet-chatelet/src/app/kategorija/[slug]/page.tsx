/**
 * @fileoverview Category page.
 * Displays celebrities filtered by category with a hero banner.
 *
 * @route /kategorija/[slug]
 */

import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CatalogClient, CategoryHero } from "@/components/catalog";
import type { Metadata } from "next";
import { getCategories } from "@/lib/api/categories";

// ---------------------------------------------------------------------------
// Dynamic metadata (SEO)
// ---------------------------------------------------------------------------

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const categories = await getCategories();
    const category = categories.find((c) => c.slug === slug);
    if (!category) return { title: "Kategorija nije pronađena — Viveo" };

    return {
      title: `${category.name} — Zvezde | Viveo`,
      description: `Pretraži ${category.celebrityCount} zvezda u kategoriji ${category.name}. Naruči personalizovanu video poruku na Viveo platformi.`,
      openGraph: {
        title: `${category.name} — Viveo`,
        description: `${category.celebrityCount} zvezda u kategoriji ${category.name}`,
        type: "website",
      },
    };
  } catch {
    return { title: "Kategorija nije pronađena — Viveo" };
  }
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  let category;
  try {
    const categories = await getCategories();
    category = categories.find((c) => c.slug === slug);
  } catch {
    notFound();
  }

  if (!category) notFound();

  return (
    <>
      <Header />
      <main>
        <CategoryHero
          category={category}
          celebrityCount={category.celebrityCount}
        />
        <CatalogClient
          initialCategory={slug}
          showHeader={false}
        />
      </main>
      <Footer />
    </>
  );
}
