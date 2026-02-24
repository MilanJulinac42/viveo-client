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
  ProfileVideoShowcase,
  ProfileReviews,
  SimilarCelebrities,
  StickyBottomCTA,
} from "@/components/profile";
import type { Metadata } from "next";
import { getCelebrity, getCelebrityReviews, getCelebrities } from "@/lib/api/celebrities";

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

  // Fetch reviews and similar celebrities in parallel
  const [reviews, similarRes] = await Promise.all([
    getCelebrityReviews(slug).catch(() => []),
    getCelebrities({ category: celebrity.category, pageSize: 5 }).catch(() => ({ data: [] as never[], meta: undefined })),
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
      <Header />
      <main>
        <ProfileHero celebrity={celebrity} />
        <ProfileAbout celebrity={celebrity} />
        <ProfileVideoShowcase celebrity={celebrity} />
        <ProfileReviews reviews={reviews} celebrityName={celebrity.name} />
        <SimilarCelebrities celebrities={similar} />
      </main>
      <StickyBottomCTA price={celebrity.price} name={celebrity.name} slug={celebrity.slug} />
      <Footer />
    </>
  );
}
