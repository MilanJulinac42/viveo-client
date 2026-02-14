/**
 * @fileoverview About page — tells the Viveo story.
 * Static page with company mission, team values, and platform stats.
 *
 * @route /o-nama
 */

import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "O nama — Viveo",
  description:
    "Saznajte više o Viveo platformi — srpskoj platformi za personalizovane video poruke od omiljenih zvezda.",
  openGraph: {
    title: "O nama — Viveo",
    description: "Upoznajte tim i misiju iza Viveo platforme.",
    type: "website",
  },
};

/** Company values displayed as cards */
const VALUES = [
  {
    icon: "🎯",
    title: "Misija",
    description:
      "Povezujemo ljude sa njihovim omiljenim zvezdama kroz personalizovane video poruke koje stvaraju nezaboravne trenutke.",
  },
  {
    icon: "💜",
    title: "Strast",
    description:
      "Verujemo da svaka poruka treba da bude posebna. Naš tim radi sa posvećenošću da svaki korisnik dobije jedinstveno iskustvo.",
  },
  {
    icon: "🤝",
    title: "Poverenje",
    description:
      "Gradimo platformu na poverenju — sigurna plaćanja, garancija isporuke, i transparentnost u svakom koraku.",
  },
  {
    icon: "🚀",
    title: "Inovacija",
    description:
      "Neprestano unapređujemo platformu koristeći najnovije tehnologije kako bi iskustvo za korisnike i zvezde bilo što bolje.",
  },
];

/** Platform stats */
const STATS = [
  { value: "500+", label: "Zvezda na platformi" },
  { value: "10.000+", label: "Isporučenih poruka" },
  { value: "98%", label: "Zadovoljnih korisnika" },
  { value: "24h", label: "Prosečno vreme odgovora" },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-secondary-500/10 blur-3xl" />
          </div>
          <Container className="relative z-10">
            <div className="py-16 text-center sm:py-20 lg:py-24">
              <ScrollReveal>
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  O nama
                </h1>
                <div className="mx-auto mt-4 flex items-center justify-center gap-1.5">
                  <span className="h-1 w-6 rounded-full bg-white/30" />
                  <span className="h-1 w-12 rounded-full bg-secondary-400" />
                  <span className="h-1 w-6 rounded-full bg-white/30" />
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-200">
                  Viveo je prva srpska platforma za personalizovane video poruke
                  od omiljenih zvezda. Povezujemo fanove sa glumcima, muzičarima,
                  sportistima i influenserima iz cele Srbije.
                </p>
              </ScrollReveal>
            </div>
          </Container>
        </section>

        {/* Stats */}
        <section className="border-b border-slate-100 py-12">
          <Container>
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {STATS.map((stat, i) => (
                <ScrollReveal key={stat.label} delay={i * 0.1}>
                  <div className="text-center">
                    <p className="text-3xl font-extrabold text-primary-600 sm:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </section>

        {/* Story */}
        <section className="py-16 sm:py-20">
          <Container size="md">
            <ScrollReveal>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Naša priča
              </h2>
              <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-8 space-y-6 text-base leading-relaxed text-slate-600 sm:text-lg">
                <p>
                  Viveo je nastao iz jednostavne ideje — šta ako biste mogli da
                  iznenadite nekoga koga volite porukom od njihovog omiljenog
                  glumca, pevačice ili sportiste? Poklon koji se ne može kupiti
                  nigde drugde.
                </p>
                <p>
                  Pokrenuli smo platformu sa misijom da povežemo ljude iz Srbije
                  sa zvezdama koje vole. Od rođendanskih čestitki do motivacionih
                  poruka, svaki video je personalizovan i jedinstven.
                </p>
                <p>
                  Danas na platformi imate pristup preko 500 zvezda iz svih
                  oblasti — od glumaca i muzičara, preko sportista, do
                  influensera i TV voditelja. I svaki dan dodajemo nove.
                </p>
              </div>
            </ScrollReveal>
          </Container>
        </section>

        {/* Values */}
        <section className="bg-slate-50 py-16 sm:py-20">
          <Container>
            <ScrollReveal>
              <div className="mb-12 text-center">
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Naše vrednosti
                </h2>
                <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((value, i) => (
                <ScrollReveal key={value.title} delay={i * 0.1}>
                  <div className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
                    <span className="text-4xl">{value.icon}</span>
                    <h3 className="mt-4 text-lg font-bold text-slate-900">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {value.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
