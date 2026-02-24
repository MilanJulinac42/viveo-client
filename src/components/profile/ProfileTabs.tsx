/**
 * @fileoverview ProfileTabs — Server component wrapper for the celebrity services tab section.
 * Receives pre-fetched data from the page and passes it to the client tab component.
 * Renders section heading with gradient underline matching existing design pattern.
 */

import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProfileTabsClient from "./ProfileTabsClient";
import type { Celebrity, Product, DigitalProduct } from "@/lib/types";

interface ProfileTabsProps {
  celebrity: Celebrity;
  products: Product[];
  digitalProducts: DigitalProduct[];
}

export default function ProfileTabs({ celebrity, products, digitalProducts }: ProfileTabsProps) {
  const videoTypes = celebrity.videoTypes || [];
  const hasAnyContent = videoTypes.length > 0 || products.length > 0 || digitalProducts.length > 0;

  if (!hasAnyContent) return null;

  return (
    <section className="bg-slate-50 py-12 sm:py-16">
      <Container size="md">
        <ScrollReveal>
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Usluge i proizvodi
            </h2>
            <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />
            <p className="mt-4 text-slate-500">
              Sve {celebrity.name} usluge na jednom mestu
            </p>
          </div>
        </ScrollReveal>

        <ProfileTabsClient
          celebrity={celebrity}
          products={products}
          digitalProducts={digitalProducts}
        />
      </Container>
    </section>
  );
}
