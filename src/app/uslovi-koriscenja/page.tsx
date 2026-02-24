/**
 * @fileoverview Terms of Service page.
 * @route /uslovi-koriscenja
 */

import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Uslovi korišćenja — Viveo",
  description: "Uslovi korišćenja Viveo platforme za personalizovane video poruke.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
          <Container className="relative z-10">
            <div className="py-16 text-center sm:py-20">
              <ScrollReveal>
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Uslovi korišćenja
                </h1>
                <div className="mx-auto mt-4 flex items-center justify-center gap-1.5">
                  <span className="h-1 w-6 rounded-full bg-white/30" />
                  <span className="h-1 w-12 rounded-full bg-secondary-400" />
                  <span className="h-1 w-6 rounded-full bg-white/30" />
                </div>
              </ScrollReveal>
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container size="md">
            <ScrollReveal>
              <div className="prose prose-slate max-w-none">
                <p className="text-sm text-slate-500">Poslednje ažuriranje: Februar 2026.</p>

                <h2 className="mt-8 text-xl font-bold text-slate-900">1. Opšte odredbe</h2>
                <p className="text-slate-600">
                  Ovi Uslovi korišćenja regulišu vaše korišćenje Viveo platforme (viveo.rs).
                  Korišćenjem platforme prihvatate ove uslove u celosti. Viveo zadržava pravo
                  da izmeni uslove korišćenja uz prethodno obaveštavanje korisnika.
                </p>

                <h2 className="mt-8 text-xl font-bold text-slate-900">2. Opis usluge</h2>
                <p className="text-slate-600">
                  Viveo je platforma koja omogućava korisnicima da naruče personalizovane video
                  poruke od poznatih ličnosti. Viveo deluje kao posrednik između naručilaca
                  (fanova) i kreatorâ (zvezda).
                </p>

                <h2 className="mt-8 text-xl font-bold text-slate-900">3. Registracija i nalog</h2>
                <p className="text-slate-600">
                  Za korišćenje usluga potrebna je registracija. Korisnik je odgovoran za
                  tačnost podataka i bezbednost svog naloga. Jedna osoba može imati samo
                  jedan nalog.
                </p>

                <h2 className="mt-8 text-xl font-bold text-slate-900">4. Narudžbine i plaćanje</h2>
                <p className="text-slate-600">
                  Cenu video poruke određuje zvezda. Plaćanje se vrši unapred. Viveo naplaćuje
                  proviziju od ukupne cene. Zvezda je u obavezi da isporuči video u dogovorenom roku.
                </p>

                <h2 className="mt-8 text-xl font-bold text-slate-900">5. Otkazivanje i povraćaj</h2>
                <p className="text-slate-600">
                  Ukoliko zvezda ne isporuči video u predviđenom roku, narudžbina se automatski
                  otkazuje i naručilac dobija potpuni povraćaj. Naručilac može otkazati narudžbinu
                  pre nego što zvezda započne snimanje.
                </p>

                <h2 className="mt-8 text-xl font-bold text-slate-900">6. Sadržaj i prava</h2>
                <p className="text-slate-600">
                  Video poruke su namenjene za ličnu upotrebu. Zabranjena je komercijalna
                  eksploatacija bez dozvole. Autorska prava na video sadržaj pripadaju kreatoru.
                </p>

                <h2 className="mt-8 text-xl font-bold text-slate-900">7. Kontakt</h2>
                <p className="text-slate-600">
                  Za sva pitanja u vezi sa uslovima korišćenja obratite nam se na{" "}
                  <a href="mailto:info@viveo.rs" className="text-primary-500 hover:underline">
                    info@viveo.rs
                  </a>.
                </p>
              </div>
            </ScrollReveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
