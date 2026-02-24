/**
 * @fileoverview "Šta sve možeš na Viveo?" product showcase section.
 * Shows 3 feature cards for Video, Merch, and Digital products.
 */

import Link from "next/link";
import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { PRODUCT_SHOWCASE_ITEMS } from "@/lib/constants";

export default function VideoShowcaseSection() {
  return (
    <section className="relative bg-white py-16 sm:py-20 lg:py-24">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(108,60,225,0.03),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(245,158,11,0.03),transparent_50%)]" />

      <Container>
        <ScrollReveal>
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Šta sve možeš na Viveo?
            </h2>
            <div className="mx-auto mt-4 flex items-center justify-center gap-1.5">
              <span className="h-1 w-6 rounded-full bg-secondary-400" />
              <span className="h-1 w-12 rounded-full bg-primary-500" />
              <span className="h-1 w-6 rounded-full bg-secondary-400" />
            </div>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
              Video poruke, merch i digitalni sadržaj od omiljenih zvezda
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Feature cards */}
        <div className="grid gap-6 sm:grid-cols-3 sm:gap-8">
          {PRODUCT_SHOWCASE_ITEMS.map((item, i) => (
            <ScrollReveal key={item.id} delay={0.15 * i}>
              <Link
                href={item.href}
                className="group relative flex flex-col items-center overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary-200 sm:p-10"
              >
                {/* Gradient accent top bar */}
                <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${item.accentFrom} ${item.accentTo}`} />

                {/* Icon circle */}
                <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accentFrom} ${item.accentTo} text-4xl shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <span className="drop-shadow-sm">{item.icon}</span>
                </div>

                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {item.description}
                </p>

                {/* CTA arrow */}
                <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors group-hover:text-primary-700">
                  Istraži
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
