/**
 * @fileoverview Fan dashboard page for viewing order history.
 * Displays all orders the logged-in fan has placed.
 *
 * @route /moje-porudzbine
 */

import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import { FanDashboardClient } from "@/components/fan-dashboard";

export const metadata: Metadata = {
  title: "Moje porudžbine — Viveo",
  description:
    "Pregledajte vaše narudžbine personalizovanih video poruka na Viveo platformi.",
  openGraph: {
    title: "Moje porudžbine — Viveo",
    description: "Pregled narudžbina na Viveo platformi.",
    type: "website",
  },
};

export default function MojePorudzbinePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <Container>
          <FanDashboardClient />
        </Container>
      </main>
      <Footer />
    </>
  );
}
