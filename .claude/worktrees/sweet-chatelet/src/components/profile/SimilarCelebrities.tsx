/**
 * @fileoverview Similar celebrities section showing a grid of related celebrity cards.
 * Displays on the celebrity profile page to encourage browsing.
 */

import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CelebrityCard from "./CelebrityCard";
import type { Celebrity } from "@/lib/types";

interface SimilarCelebritiesProps {
  celebrities: Celebrity[];
}

export default function SimilarCelebrities({ celebrities }: SimilarCelebritiesProps) {
  if (celebrities.length === 0) return null;

  return (
    <section className="bg-slate-50 py-12 sm:py-16">
      <Container>
        <ScrollReveal>
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Slične zvezde
            </h2>
            <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />
            <p className="mt-4 text-slate-500">
              Pogledajte i druge zvezde iz iste kategorije
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {celebrities.map((celebrity, i) => (
            <ScrollReveal key={celebrity.id} delay={i * 0.1}>
              <CelebrityCard celebrity={celebrity} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
