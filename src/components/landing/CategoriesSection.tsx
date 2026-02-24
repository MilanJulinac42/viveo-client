/**
 * @fileoverview Browse-by-category section with a rich purple gradient background.
 * Fetches categories from API; falls back to mock data.
 */

import Container from "@/components/layout/Container";
import CurvedDivider from "@/components/ui/WaveDivider";
import FloatingElements from "@/components/ui/FloatingElements";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SpotlightCursor from "@/components/ui/SpotlightCursor";
import TiltCategoryCard from "./TiltCategoryCard";
import { getCategories } from "@/lib/api/categories";
import { MOCK_CATEGORIES, TRENDING_CATEGORIES } from "@/lib/constants";

/** Alternating colored accent strips on top of each card */
const cardAccents = [
  "from-primary-400 to-primary-600",
  "from-secondary-400 to-secondary-500",
  "from-accent-400 to-accent-500",
  "from-primary-500 to-secondary-400",
  "from-accent-400 to-primary-400",
  "from-secondary-400 to-accent-400",
];

export default async function CategoriesSection() {
  let categories = MOCK_CATEGORIES;
  try {
    const apiCategories = await getCategories();
    if (apiCategories.length > 0) {
      categories = apiCategories;
    }
  } catch {
    // Fallback to mock data if API is unavailable
  }

  return (
    <section id="kategorije" className="relative">
      {/* Curved top — gradient island rising from white */}
      <CurvedDivider position="top" fillColor="fill-primary-600" />

      <div className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 py-24 sm:py-32 lg:py-40">
        <SpotlightCursor />
        <FloatingElements variant="circles" />

        {/* Ambient background blobs */}
        <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-secondary-500/10 blur-3xl animate-pulse" style={{ animationDuration: "7s" }} />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-primary-300/15 blur-3xl animate-pulse" style={{ animationDuration: "9s" }} />

        <Container className="relative z-[2]">
          {/* Section header — white text on dark bg */}
          <ScrollReveal>
            <div className="relative mb-14 text-center text-white">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Pretra&#382;i po kategoriji
              </h2>
              <div className="mx-auto mt-4 flex items-center justify-center gap-1.5">
                <span className="h-1 w-6 rounded-full bg-white/30" />
                <span className="h-1 w-12 rounded-full bg-secondary-400" />
                <span className="h-1 w-6 rounded-full bg-white/30" />
              </div>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-200">
                Prona&#273;i savr&#353;enu zvezdu po oblasti
              </p>
            </div>
          </ScrollReveal>

          {/* Category cards — 6 cols on desktop, compact cards */}
          <div className="relative grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((category, i) => (
              <ScrollReveal key={category.id} delay={0.1 * i}>
                <TiltCategoryCard category={category} accentClass={cardAccents[i % cardAccents.length]} trending={TRENDING_CATEGORIES.includes(category.slug)} />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </div>

      {/* Curved bottom — gradient flowing into slate-50 Testimonials */}
      <CurvedDivider position="bottom" fillColor="fill-slate-50" />
    </section>
  );
}
