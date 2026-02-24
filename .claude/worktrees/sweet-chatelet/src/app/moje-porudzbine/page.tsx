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
  title: "Moje porud\u017ebine \u2014 Viveo",
  description:
    "Pregledajte va\u0161e narud\u017ebine personalizovanih video poruka na Viveo platformi.",
  openGraph: {
    title: "Moje porud\u017ebine \u2014 Viveo",
    description: "Pregled narud\u017ebina na Viveo platformi.",
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
