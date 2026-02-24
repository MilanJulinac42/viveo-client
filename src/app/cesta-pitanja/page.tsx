/**
 * @fileoverview FAQ page with expandable questions and answers.
 * @route /cesta-pitanja
 */

import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import FAQAccordion from "@/components/faq/FAQAccordion";

export const metadata: Metadata = {
  title: "Česta pitanja — Viveo",
  description:
    "Najčešća pitanja o Viveo platformi za personalizovane video poruke.",
  openGraph: {
    title: "Česta pitanja — Viveo",
    description: "Odgovori na najčešća pitanja o Viveo platformi.",
    type: "website",
  },
};

const FAQ_ITEMS = [
  {
    question: "Šta je Viveo?",
    answer:
      "Viveo je platforma koja povezuje fanove sa omiljenim srpskim zvezdama. Kroz Viveo možete naručiti personalizovanu video poruku za bilo koju priliku — rođendan, godišnjicu, motivaciju, ili prosto iznenađenje.",
  },
  {
    question: "Kako funkcioniše naručivanje?",
    answer:
      "Izaberite zvezdu, popunite formular sa detaljima (za koga je poruka, koja je prilika, šta želite da zvezda kaže), platite i sačekajte. Zvezda će snimiti video poruku u roku navedenom na svom profilu.",
  },
  {
    question: "Koliko košta video poruka?",
    answer:
      "Cena zavisi od zvezde. Svaka zvezda samostalno određuje svoju cenu, koja je vidljiva na njenom profilu. Cene se kreću od 1.000 RSD do 15.000 RSD.",
  },
  {
    question: "Koliko dugo traje video poruka?",
    answer:
      "Video poruke su obično duge 30 sekundi do 2 minuta, u zavisnosti od zvezde i tipa poruke koji izaberete.",
  },
  {
    question: "Šta ako zvezda ne odgovori na vreme?",
    answer:
      "Svaka narudžbina ima rok za isporuku. Ako zvezda ne isporuči video u predviđenom roku, narudžbina se automatski otkazuje i dobijate potpuni povraćaj novca.",
  },
  {
    question: "Mogu li da poklanjam video poruku?",
    answer:
      "Naravno! To je zapravo najčešći razlog naručivanja. Prilikom narudžbine unosite ime primaoca i detalje o prilici, a primljenu poruku možete podeliti putem linka.",
  },
  {
    question: "Kako mogu da postanem zvezda na Viveo?",
    answer:
      "Ako imate publiku i fanove, prijavite se putem stranice 'Postani zvezda'. Naš tim će pregledati vašu prijavu i kontaktirati vas u roku od 48h.",
  },
  {
    question: "Da li su video poruke privatne?",
    answer:
      "Da, video poruke su privatne i dostupne samo vama. Pristupate im putem jedinstvenog linka koji dobijate nakon isporuke.",
  },
  {
    question: "Kako mogu da kontaktiram podršku?",
    answer:
      "Možete nas kontaktirati putem email-a na info@viveo.rs ili kroz kontakt formu na našoj stranici. Odgovaramo u roku od 24h.",
  },
];

export default function FAQPage() {
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
            <div className="py-16 text-center sm:py-20">
              <ScrollReveal>
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Česta pitanja
                </h1>
                <div className="mx-auto mt-4 flex items-center justify-center gap-1.5">
                  <span className="h-1 w-6 rounded-full bg-white/30" />
                  <span className="h-1 w-12 rounded-full bg-secondary-400" />
                  <span className="h-1 w-6 rounded-full bg-white/30" />
                </div>
                <p className="mx-auto mt-6 max-w-xl text-lg text-primary-200">
                  Pronađite odgovore na najčešća pitanja o Viveo platformi.
                </p>
              </ScrollReveal>
            </div>
          </Container>
        </section>

        {/* FAQ Content */}
        <section className="py-16 sm:py-20">
          <Container size="md">
            <ScrollReveal>
              <FAQAccordion items={FAQ_ITEMS} />
            </ScrollReveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
