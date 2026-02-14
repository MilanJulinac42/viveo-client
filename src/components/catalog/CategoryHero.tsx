/**
 * @fileoverview Hero banner for category pages.
 * Displays the category icon, name, and celebrity count on a gradient background.
 *
 * @example
 * ```tsx
 * <CategoryHero category={category} celebrityCount={12} />
 * ```
 */

import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Category } from "@/lib/types";

interface CategoryHeroProps {
  /** Category data */
  category: Category;
  /** Number of celebrities in this category */
  celebrityCount: number;
}

export default function CategoryHero({
  category,
  celebrityCount,
}: CategoryHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-secondary-500/10 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="py-12 text-center sm:py-16 lg:py-20">
          <ScrollReveal>
            <span className="text-6xl sm:text-7xl">{category.icon}</span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {category.name}
            </h1>
            <div className="mx-auto mt-4 flex items-center justify-center gap-1.5">
              <span className="h-1 w-6 rounded-full bg-white/30" />
              <span className="h-1 w-12 rounded-full bg-secondary-400" />
              <span className="h-1 w-6 rounded-full bg-white/30" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-4 text-lg text-primary-200">
              {celebrityCount}{" "}
              {celebrityCount === 1 ? "zvezda" : "zvezda"} u kategoriji
            </p>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
