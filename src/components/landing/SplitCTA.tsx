"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function SplitCTA() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
      {/* Panel 1 — Video poruke */}
      <div className="relative flex flex-1 flex-col items-center rounded-3xl border border-white/15 bg-white/10 p-7 text-center backdrop-blur-sm transition-colors duration-300 hover:bg-white/15 sm:p-8">
        <div className="mb-3 text-4xl">🎬</div>
        <h3 className="text-xl font-extrabold text-white">Naruči video</h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-primary-200">
          Personalizovana video poruka od omiljene zvezde.
        </p>
        <Button variant="secondary" size="lg" className="mt-5" onClick={() => router.push("/zvezde")}>
          Pronađi zvezdu
        </Button>
      </div>

      {/* Panel 2 — Merch prodavnica */}
      <div className="relative flex flex-1 flex-col items-center rounded-3xl border border-white/15 bg-white/10 p-7 text-center backdrop-blur-sm transition-colors duration-300 hover:bg-white/15 sm:p-8">
        <div className="mb-3 text-4xl">🛍️</div>
        <h3 className="text-xl font-extrabold text-white">Istraži prodavnicu</h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-primary-200">
          Originalni merch — majice, šolje, posteri i više.
        </p>
        <Button
          variant="ghost"
          size="lg"
          className="mt-5 border border-white/20 bg-white/10 text-white shadow-lg shadow-black/5 backdrop-blur-xl hover:bg-white/20"
          onClick={() => router.push("/prodavnica")}
        >
          Pogledaj merch
        </Button>
      </div>

      {/* Panel 3 — Digitalni sadržaj */}
      <div className="relative flex flex-1 flex-col items-center rounded-3xl border border-white/15 bg-white/10 p-7 text-center backdrop-blur-sm transition-colors duration-300 hover:bg-white/15 sm:p-8">
        <div className="mb-3 text-4xl">📥</div>
        <h3 className="text-xl font-extrabold text-white">Digitalni sadržaj</h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-primary-200">
          Preseti, šabloni, edukacija — instant preuzimanje.
        </p>
        <Button
          variant="ghost"
          size="lg"
          className="mt-5 border border-white/20 bg-white/10 text-white shadow-lg shadow-black/5 backdrop-blur-xl hover:bg-white/20"
          onClick={() => router.push("/digitalni-proizvodi")}
        >
          Istraži sadržaj
        </Button>
      </div>
    </div>
  );
}
