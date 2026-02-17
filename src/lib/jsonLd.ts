/**
 * @fileoverview JSON-LD structured data helpers for SEO.
 */

import type { Celebrity } from "./types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://viveo.rs";

/** Organization schema for Viveo */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Viveo",
    url: SITE_URL,
    description:
      "Platforma za personalizovane video poruke od srpskih zvezda. Naruči jedinstven poklon za bilo koju priliku.",
    sameAs: [],
  };
}

/** Person + Offer schema for a celebrity profile page */
export function celebrityJsonLd(celebrity: Celebrity) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: celebrity.name,
    description: celebrity.bio,
    url: `${SITE_URL}/zvezda/${celebrity.slug}`,
    image: celebrity.image || undefined,
    makesOffer: {
      "@type": "Offer",
      name: `Personalizovana video poruka od ${celebrity.name}`,
      price: celebrity.price,
      priceCurrency: "RSD",
      availability: "https://schema.org/InStock",
    },
    ...(celebrity.rating > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: celebrity.rating,
        reviewCount: celebrity.reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  };
}

/** ItemList schema for a category page */
export function categoryItemListJsonLd(
  categoryName: string,
  celebrities: Celebrity[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${categoryName} — Viveo zvezde`,
    numberOfItems: celebrities.length,
    itemListElement: celebrities.slice(0, 20).map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: `${SITE_URL}/zvezda/${c.slug}`,
    })),
  };
}
