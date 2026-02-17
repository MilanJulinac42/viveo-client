/**
 * @fileoverview Celebrity dashboard page.
 * Protected route — only accessible to logged-in star users.
 *
 * @route /zvezda-panel
 */

import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { DashboardClient } from "@/components/dashboard";

export const metadata: Metadata = {
  title: "Panel zvezde — Viveo",
  description:
    "Upravljajte zahtevima za video poruke, pratite zaradu i podesite svoj profil na Viveo platformi.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Panel zvezde — Viveo",
    description: "Dashboard za zvezde na Viveo platformi.",
    type: "website",
  },
};

export default function ZvezdaPanelPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <ProtectedRoute requiredRole="star">
          <DashboardClient />
        </ProtectedRoute>
      </main>
      <Footer />
    </>
  );
}
