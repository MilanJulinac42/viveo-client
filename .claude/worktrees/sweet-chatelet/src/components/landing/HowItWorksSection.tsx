/**
 * @fileoverview "How It Works" 3-step section.
 * Slate-50 background that sits directly beneath the Hero's curved bottom edge.
 */

import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import StepConnectorLine from "./StepConnectorLine";
import StepIcon from "./StepIcons";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

export default function HowItWorksSection() {
  return (
    <section id="kako-funkcionise" className="relative bg-slate-50 pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24">
      <Container>
        <ScrollReveal>
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Kako funkcioniše?
            </h2>
            <div className="mx-auto mt-4 flex items-center justify-center gap-1.5">
              <span className="h-1 w-6 rounded-full bg-secondary-400" />
              <span className="h-1 w-12 rounded-full bg-primary-500" />
              <span className="h-1 w-6 rounded-full bg-secondary-400" />
            </div>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
              Tri jednostavna koraka do nezaboravnog poklona
            </p>
          </div>
        </ScrollReveal>

        <div className="relative grid gap-8 sm:grid-cols-3">
          {/* Animated connector line */}
          <StepConnectorLine />

          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <ScrollReveal key={step.step} delay={0.15 * i}>
              <div className="group relative rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-primary-200">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-sm font-bold text-white shadow-lg shadow-primary-500/30">
                    {step.step}
                  </span>
                </div>
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <StepIcon step={step.step} />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
