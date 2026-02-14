/**
 * @fileoverview Celebrity profile page with SSG support.
 * Displays complete celebrity profile including hero, about, video showcase,
 * reviews, and similar celebrities sections.
 *
 * @route /zvezda/[slug]
 */

import { notFound } from "next/navigation";
import { MOCK_CELEBRITIES, MOCK_TESTIMONIALS } from "@/lib/constants";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  ProfileHero,
  ProfileAbout,
  ProfileVideoShowcase,
  ProfileReviews,
  SimilarCelebrities,
  StickyBottomCTA,
} from "@/components/profile";
import type { Metadata } from "next";

// ---------------------------------------------------------------------------
// Static params (SSG)
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return MOCK_CELEBRITIES.map((c) => ({ slug: c.slug }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata (SEO)
// ---------------------------------------------------------------------------

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const celebrity = MOCK_CELEBRITIES.find((c) => c.slug === slug);

  if (!celebrity) {
    return { title: "Zvezda nije pronađena — Viveo" };
  }

  return {
    title: `${celebrity.name} — Naruči video poruku | Viveo`,
    description:
      celebrity.extendedBio ||
      `Naruči personalizovanu video poruku od ${celebrity.name}. ${celebrity.bio}`,
    openGraph: {
      title: `${celebrity.name} — Viveo`,
      description: `Personalizovana video poruka od ${celebrity.name} — ${celebrity.category}`,
      type: "profile",
    },
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function CelebrityProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const celebrity = MOCK_CELEBRITIES.find((c) => c.slug === slug);

  if (!celebrity) notFound();

  // Get reviews for this celebrity
  const reviews = MOCK_TESTIMONIALS.filter(
    (t) => t.celebrityName === celebrity.name
  );

  // Get similar celebrities (same category, exclude current)
  let similar = MOCK_CELEBRITIES.filter(
    (c) => c.category === celebrity.category && c.slug !== celebrity.slug
  );

  // If fewer than 4, fill from other categories
  if (similar.length < 4) {
    const others = MOCK_CELEBRITIES.filter(
      (c) =>
        c.slug !== celebrity.slug &&
        !similar.some((s) => s.id === c.id)
    );
    similar = [...similar, ...others].slice(0, 4);
  }

  return (
    <>
      <Header />
      <main>
        <ProfileHero celebrity={celebrity} />
        <ProfileAbout celebrity={celebrity} />
        <ProfileVideoShowcase celebrity={celebrity} />
        <ProfileReviews reviews={reviews} celebrityName={celebrity.name} />
        <SimilarCelebrities celebrities={similar} />
      </main>
      <StickyBottomCTA price={celebrity.price} name={celebrity.name} />
      <Footer />
    </>
  );
}
