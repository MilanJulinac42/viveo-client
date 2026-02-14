/**
 * @fileoverview "Become a Star" application page.
 * Landing page for potential celebrities to learn about Viveo
 * and submit an application to join the platform.
 *
 * @route /postani-zvezda
 */

import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import FAQItem from "@/components/landing/FAQItem";
import { ApplicationForm } from "@/components/become-star";

/* -------------------------------------------------------------------------- */
/*                                  Metadata                                  */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Postani zvezda — Viveo",
  description:
    "Pridružite se Viveo platformi kao zvezda i zarađujte snimajući personalizovane video poruke za svoje fanove.",
  openGraph: {
    title: "Postani zvezda — Viveo",
    description: "Zarađujte snimajući personalizovane video poruke na Viveo platformi.",
    type: "website",
  },
};

/* -------------------------------------------------------------------------- */
/*                                Static data                                 */
/* -------------------------------------------------------------------------- */

const BENEFITS = [
  {
    icon: "💰",
    title: "Zarađujte na svoj način",
    description: "Sami određujete cenu i koliko zahteva prihvatate. Vi odlučujete kada i koliko radite.",
  },
  {
    icon: "🤝",
    title: "Povežite se sa fanovima",
    description: "Direktna veza sa ljudima koji vas prate i vole. Učinite njihov dan posebnim.",
  },
  {
    icon: "⏰",
    title: "Potpuna fleksibilnost",
    description: "Snimajte video poruke kada vam odgovara. Bez obaveza, bez pritiska, bez rasporeda.",
  },
  {
    icon: "🛡️",
    title: "Podrška tima",
    description: "Naš tim je tu da vam pomogne — tehnička podrška, saveti i marketing na jednom mestu.",
  },
  {
    icon: "📊",
    title: "Transparentna analitika",
    description: "Pratite zarade, statistike i zahteve u realnom vremenu kroz intuitivni dashboard.",
  },
  {
    icon: "🚀",
    title: "Rastite sa nama",
    description: "Promocija na platformi i društvenim mrežama. Povećajte svoju vidljivost i zaradu.",
  },
];

const HOW_IT_WORKS = [
  { step: 1, icon: "📝", title: "Prijavite se", description: "Popunite aplikacioni formular sa vašim podacima i linkovima ka društvenim mrežama." },
  { step: 2, icon: "✅", title: "Pregled prijave", description: "Naš tim pregleda vašu prijavu i kontaktira vas u roku od 3-5 radnih dana." },
  { step: 3, icon: "🎬", title: "Kreirajte profil", description: "Ukoliko budete prihvaćeni, pomoći ćemo vam da napravite savršen profil na platformi." },
  { step: 4, icon: "💸", title: "Počnite da zarađujete", description: "Prihvatajte zahteve, snimajte video poruke i zarađujte novac direktno na vaš račun." },
];

const FAQ_ITEMS = [
  {
    question: "Ko može da postane zvezda na Viveo platformi?",
    answer: "Svako ko ima javno prisustvo i aktivnu publiku — glumci, muzičari, sportisti, influenseri, komičari i TV voditelji. Važno je da imate fanove koji bi voleli da dobiju personalizovanu poruku od vas.",
  },
  {
    question: "Koliko mogu da zarađujem?",
    answer: "Zarade zavise od cene koju postavite i broja zahteva koje prihvatite. Neki kreatori zarađuju preko 200.000 RSD mesečno. Vi određujete svoju cenu i tempo rada.",
  },
  {
    question: "Koliko vremena imam da odgovorim na zahtev?",
    answer: "Imate do 7 dana da snimite i pošaljete video poruku nakon što prihvatite zahtev. Možete podesiti svoj raspored i broj zahteva koji prihvatate dnevno ili nedeljno.",
  },
  {
    question: "Da li moram da prihvatim svaki zahtev?",
    answer: "Ne. Vi birate koje zahteve želite da ispunite. Možete odbiti zahtev ako vam ne odgovara ili ako ste trenutno zauzeti.",
  },
  {
    question: "Kako se vrši isplata?",
    answer: "Isplate se vrše mesečno direktno na vaš bankovni račun. Viveo zadržava proviziju od 20%, dok vi dobijate 80% od cene svake prodane video poruke.",
  },
];

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

export default function PostaniZvezdaPage() {
  return (
    <>
      <Header />
      <main>
        {/* ---------------------------------------------------------------- */}
        {/*  Section 1 — Hero                                                */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
          {/* Decorative blur orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-secondary-500/10 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-primary-400/10 blur-3xl" />
          </div>

          <Container className="relative z-10">
            <div className="py-16 text-center sm:py-20 lg:py-24">
              <ScrollReveal>
                <span className="inline-block text-6xl">⭐</span>
                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Postani zvezda na Viveo platformi
                </h1>
                {/* Decorative underline */}
                <div className="mx-auto mt-4 flex items-center justify-center gap-1.5">
                  <span className="h-1 w-6 rounded-full bg-white/30" />
                  <span className="h-1 w-12 rounded-full bg-secondary-400" />
                  <span className="h-1 w-6 rounded-full bg-white/30" />
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-200">
                  Povežite se sa svojim fanovima na jedinstven način i zarađujte snimajući personalizovane video poruke. Jednostavno, brzo i profitabilno.
                </p>
              </ScrollReveal>
            </div>
          </Container>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/*  Section 2 — Benefits (Zašto Viveo?)                             */}
        {/* ---------------------------------------------------------------- */}
        <section className="py-16 sm:py-20">
          <Container>
            <ScrollReveal>
              <div className="mb-12 text-center">
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Zašto Viveo?
                </h2>
                <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />
                <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
                  Pridružite se stotinama zvezda koje već zarađuju na Viveo platformi
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {BENEFITS.map((benefit, i) => (
                <ScrollReveal key={benefit.title} delay={i * 0.1}>
                  <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <span className="text-4xl">{benefit.icon}</span>
                    <h3 className="mt-4 text-lg font-bold text-slate-900">{benefit.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{benefit.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/*  Section 3 — How It Works (Kako funkcioniše?)                    */}
        {/* ---------------------------------------------------------------- */}
        <section className="bg-slate-50 py-16 sm:py-20">
          <Container>
            <ScrollReveal>
              <div className="mb-12 text-center">
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Kako funkcioniše?
                </h2>
                <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {HOW_IT_WORKS.map((item, i) => (
                <ScrollReveal key={item.step} delay={i * 0.1}>
                  <div className="relative text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-2xl font-bold text-white shadow-lg shadow-primary-500/25">
                      {item.step}
                    </div>
                    <span className="mt-4 block text-4xl">{item.icon}</span>
                    <h3 className="mt-3 text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/*  Section 4 — Stats (Viveo u brojkama)                            */}
        {/* ---------------------------------------------------------------- */}
        <section className="border-y border-slate-100 bg-white py-16 sm:py-20">
          <Container>
            <ScrollReveal>
              <div className="mb-12 text-center">
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Viveo u brojkama
                </h2>
                <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              <ScrollReveal delay={0}>
                <div className="text-center">
                  <AnimatedCounter target={500} suffix="+" className="text-3xl font-extrabold text-primary-600 sm:text-4xl" />
                  <p className="mt-2 text-sm text-slate-500">Zvezda na platformi</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <div className="text-center">
                  <AnimatedCounter target={10000} suffix="+" separator="." className="text-3xl font-extrabold text-primary-600 sm:text-4xl" />
                  <p className="mt-2 text-sm text-slate-500">Video poruka mesečno</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="text-center">
                  <AnimatedCounter target={4.9} decimals={1} className="text-3xl font-extrabold text-primary-600 sm:text-4xl" />
                  <p className="mt-2 text-sm text-slate-500">Prosečna ocena</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div className="text-center">
                  <AnimatedCounter target={245000} separator="." className="text-3xl font-extrabold text-primary-600 sm:text-4xl" />
                  <p className="mt-2 text-sm text-slate-500">RSD prosečna mesečna zarada</p>
                </div>
              </ScrollReveal>
            </div>
          </Container>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/*  Section 5 — Application Form                                    */}
        {/* ---------------------------------------------------------------- */}
        <section id="prijava" className="py-16 sm:py-20">
          <Container size="md">
            <ScrollReveal>
              <div className="mb-10 text-center">
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Prijavite se sada
                </h2>
                <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />
                <p className="mx-auto mt-4 max-w-xl text-base text-slate-600">
                  Popunite formular ispod i naš tim će vas kontaktirati u najkraćem roku
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <ApplicationForm />
            </ScrollReveal>
          </Container>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/*  Section 6 — FAQ                                                 */}
        {/* ---------------------------------------------------------------- */}
        <section className="bg-slate-50 py-16 sm:py-20">
          <Container>
            <ScrollReveal>
              <div className="mb-12 text-center">
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Često postavljana pitanja
                </h2>
                <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />
              </div>
            </ScrollReveal>

            <div className="mx-auto max-w-2xl space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <FAQItem question={item.question} answer={item.answer} />
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
