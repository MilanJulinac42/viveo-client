/**
 * @fileoverview Celebrity dashboard page.
 * Static page for managing requests, earnings, profile, and availability.
 * Uses first mock celebrity as the "logged-in" user (no auth yet).
 *
 * @route /zvezda-panel
 */

import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DashboardClient } from "@/components/dashboard";
import {
  MOCK_CELEBRITIES,
  MOCK_REQUESTS,
  MOCK_EARNINGS,
  MOCK_AVAILABILITY,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Panel zvezde — Viveo",
  description:
    "Upravljajte zahtevima za video poruke, pratite zaradu i podesite svoj profil na Viveo platformi.",
  openGraph: {
    title: "Panel zvezde — Viveo",
    description: "Dashboard za zvezde na Viveo platformi.",
    type: "website",
  },
};

export default function ZvezdaPanelPage() {
  const celebrity = MOCK_CELEBRITIES[0]; // Marko Nikolić

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <DashboardClient
          celebrity={celebrity}
          requests={MOCK_REQUESTS}
          earnings={MOCK_EARNINGS}
          availability={MOCK_AVAILABILITY}
        />
      </main>
      <Footer />
    </>
  );
}
