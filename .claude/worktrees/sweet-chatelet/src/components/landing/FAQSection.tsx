/**
 * @fileoverview FAQ accordion section with animated open/close.
 * Glassmorphism cards with rotating chevron.
 */

import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import FAQItem from "./FAQItem";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQSection() {
  return (
    <section className="relative bg-slate-50 py-16 sm:py-20 lg:py-24">
      <Container>
        <ScrollReveal>
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Česta pitanja
            </h2>
            <div className="mx-auto mt-4 flex items-center justify-center gap-1.5">
              <span className="h-1 w-6 rounded-full bg-secondary-400" />
              <span className="h-1 w-12 rounded-full bg-primary-500" />
              <span className="h-1 w-6 rounded-full bg-secondary-400" />
            </div>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
              Odgovori na najčešća pitanja o Viveo platformi
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto max-w-2xl space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <ScrollReveal key={item.id} delay={0.08 * i}>
              <FAQItem question={item.question} answer={item.answer} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
