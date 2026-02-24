/**
 * @fileoverview Custom 404 page for celebrity profile routes.
 */

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

export default function CelebrityNotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <Container className="py-20">
          <div className="mx-auto max-w-md text-center">
            <span className="text-6xl">&#128269;</span>
            <h1 className="mt-6 text-3xl font-bold text-slate-900">
              Zvezda nije prona&#273;ena
            </h1>
            <p className="mt-4 text-lg text-slate-500">
              Ne mo&#382;emo da prona&#273;emo tra&#382;enu zvezdu. Mo&#382;da je profil uklonjen ili link nije ta&#269;an.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link href="/zvezde">
                <Button variant="primary" size="lg">
                  Pretra&#382;i zvezde
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg">
                  Po&#269;etna
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
