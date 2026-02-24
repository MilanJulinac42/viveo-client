/**
 * @fileoverview Privacy Policy page.
 * @route /politika-privatnosti
 */

import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Politika privatnosti — Viveo",
  description: "Politika privatnosti Viveo platforme — kako prikupljamo i štitimo vaše podatke.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
          <Container className="relative z-10">
            <div className="py-16 text-center sm:py-20">
              <ScrollReveal>
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Politika privatnosti
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

                <h2 className="mt-8 text-xl font-bold text-slate-900">1. Koji podaci se prikupljaju</h2>
                <p className="text-slate-600">
                  Viveo prikuplja samo podatke neophodne za funkcionisanje platforme:
                  ime i prezime, email adresu, podatke o narudžbinama i preferencijama.
                  Ne prikupljamo finansijske podatke direktno — plaćanje se obavlja
                  preko sigurnog payment provajdera.
                </p>

                <h2 className="mt-8 text-xl font-bold text-slate-900">2. Kako koristimo vaše podatke</h2>
                <p className="text-slate-600">
                  Vaši podaci se koriste isključivo za: obradu narudžbina, komunikaciju
                  sa vama, unapređenje usluge, i slanje obaveštenja vezanih za vaše
                  narudžbine. Ne prodajemo niti delimo vaše podatke sa trećim stranama
                  u komercijalne svrhe.
                </p>

                <h2 className="mt-8 text-xl font-bold text-slate-900">3. Zaštita podataka</h2>
                <p className="text-slate-600">
                  Primenjujemo industrijke standarde zaštite podataka uključujući SSL
                  enkripciju, sigurno skladištenje lozinki i ograničen pristup ličnim
                  podacima. Podaci se čuvaju na serverima u okviru EU.
                </p>

                <h2 className="mt-8 text-xl font-bold text-slate-900">4. Kolačići (Cookies)</h2>
                <p className="text-slate-600">
                  Viveo koristi esencijalne kolačiće za funkcionisanje sajta i analitičke
                  kolačiće za razumevanje kako korisnici koriste platformu. Možete
                  isključiti kolačiće u podešavanjima svog pregledača.
                </p>

                <h2 className="mt-8 text-xl font-bold text-slate-900">5. Vaša prava</h2>
                <p className="text-slate-600">
                  Imate pravo da: pristupite svojim podacima, zahtevate ispravku
                  netačnih podataka, zahtevate brisanje naloga i svih podataka, i
                  povučete saglasnost za obradu podataka. Za ostvarivanje ovih prava
                  kontaktirajte nas.
                </p>

                <h2 className="mt-8 text-xl font-bold text-slate-900">6. Video sadržaj</h2>
                <p className="text-slate-600">
                  Video poruke se čuvaju u sigurnom cloud skladištu. Pristup je
                  ograničen na naručioca putem jedinstvenog linka. Video sadržaj se
                  čuva u skladu sa periodom zadržavanja navedenim u uslovima korišćenja.
                </p>

                <h2 className="mt-8 text-xl font-bold text-slate-900">7. Kontakt</h2>
                <p className="text-slate-600">
                  Za pitanja o privatnosti podataka obratite nam se na{" "}
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
