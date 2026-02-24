/**
 * @fileoverview Celebrity profile page.
 * Fetches celebrity data from API and displays profile sections.
 *
 * @route /zvezda/[slug]
 */

import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  ProfileHero,
  ProfileAbout,
  ProfileTabs,
  ProfileReviews,
  SimilarCelebrities,
  StickyBottomCTA,
} from "@/components/profile";
import type { Metadata } from "next";
import { getCelebrity, getCelebrityReviews, getCelebrities } from "@/lib/api/celebrities";
import { getCelebrityProducts } from "@/lib/api/products";
import { getCelebrityDigitalProducts } from "@/lib/api/digital-products";
import { celebrityJsonLd } from "@/lib/jsonLd";

// ---------------------------------------------------------------------------
// Dynamic metadata (SEO)
// ---------------------------------------------------------------------------

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const celebrity = await getCelebrity(slug);
    return {
      title: `${celebrity.name} — Video poruke, Merch i Digitalni proizvodi | Viveo`,
      description:
        celebrity.extendedBio ||
        `Naruči personalizovanu video poruku, merch i digitalne proizvode od ${celebrity.name}. ${celebrity.bio}`,
      openGraph: {
        title: `${celebrity.name} — Viveo`,
        description: `Sve usluge od ${celebrity.name} — video poruke, merch, digitalni proizvodi — ${celebrity.category}`,
        type: "profile",
      },
    };
  } catch {
    return { title: "Zvezda nije pronađena — Viveo" };
  }
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function CelebrityProfilePage({ params }: PageProps) {
  const { slug } = await params;

  let celebrity;
  try {
    celebrity = await getCelebrity(slug);
  } catch {
    notFound();
  }

  // Fetch reviews, similar celebrities, merch products, and digital products in parallel
  const [reviews, similarRes, products, digitalProducts] = await Promise.all([
    getCelebrityReviews(slug).catch(() => []),
    getCelebrities({ category: celebrity.category, pageSize: 5 }).catch(() => ({ data: [] as never[], meta: undefined })),
    getCelebrityProducts(slug).catch(() => []),
    getCelebrityDigitalProducts(slug).catch(() => []),
  ]);

  // Exclude current celebrity, take up to 4
  let similar = similarRes.data.filter((c) => c.slug !== celebrity.slug);
  if (similar.length < 4) {
    try {
      const othersRes = await getCelebrities({ pageSize: 8 });
      const others = othersRes.data.filter(
        (c) => c.slug !== celebrity.slug && !similar.some((s) => s.id === c.id)
      );
      similar = [...similar, ...others].slice(0, 4);
    } catch {
      // Keep what we have
    }
  } else {
    similar = similar.slice(0, 4);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(celebrityJsonLd(celebrity)),
        }}
      />
      <Header />
      <main>
        <ProfileHero celebrity={celebrity} />
        <ProfileAbout celebrity={celebrity} />
        <ProfileTabs celebrity={celebrity} products={products} digitalProducts={digitalProducts} />
        <ProfileReviews reviews={reviews} celebrityName={celebrity.name} />
        <SimilarCelebrities celebrities={similar} />
      </main>
      <StickyBottomCTA price={celebrity.price} name={celebrity.name} slug={celebrity.slug} />
      <Footer />
    </>
  );
}
