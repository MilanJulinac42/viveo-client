/**
 * @fileoverview Fan dashboard page for viewing order history.
 * Protected route — redirects unauthenticated users to login.
 *
 * @route /moje-porudzbine
 */

import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { FanDashboardClient } from "@/components/fan-dashboard";

export const metadata: Metadata = {
  title: "Moje porudžbine — Viveo",
  description:
    "Pregledajte vaše narudžbine personalizovanih video poruka na Viveo platformi.",
  robots: { index: false, follow: false },
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
        <ProtectedRoute>
          <Container>
            <FanDashboardClient />
          </Container>
        </ProtectedRoute>
      </main>
      <Footer />
    </>
  );
}
