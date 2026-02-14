/**
 * @fileoverview Order form for requesting a personalized video.
 * Handles video type selection, form fields, validation, and success state.
 */

"use client";

import { useState, useMemo, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { cn, formatPrice, formatResponseTime } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import VideoTypeCard from "./VideoTypeCard";
import type { Celebrity, VideoType } from "@/lib/types";

interface OrderFormProps {
  /** Celebrity to order from */
  celebrity: Celebrity;
}

/** Shared input className */
const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700 backdrop-blur-xl transition-all duration-200 placeholder:text-slate-400 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20";

/** Error input className addition */
const inputErrorClass =
  "border-red-300 focus:border-red-400 focus:ring-red-500/20";

/**
 * Complete order form with video type selection, form fields, validation, and success state.
 */
export default function OrderForm({ celebrity }: OrderFormProps) {
  // Form fields
  const [selectedVideoType, setSelectedVideoType] = useState<VideoType | null>(null);
  const [recipientName, setRecipientName] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [instructions, setInstructions] = useState("");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validation
  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!selectedVideoType) e.videoType = "Izaberite tip video poruke";
    if (!recipientName.trim()) e.recipientName = "Unesite ime primaoca";
    if (!buyerName.trim()) e.buyerName = "Unesite vaše ime";
    if (!buyerEmail.trim()) e.buyerEmail = "Unesite email adresu";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyerEmail))
      e.buyerEmail = "Unesite ispravnu email adresu";
    if (!instructions.trim()) e.instructions = "Opišite šta želite da zvezda kaže";
    return e;
  }, [selectedVideoType, recipientName, buyerName, buyerEmail, instructions]);

  const isValid = Object.keys(errors).length === 0;

  const markTouched = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const handleSubmit = useCallback(async () => {
    // Mark all fields as touched
    setTouched({
      videoType: true,
      recipientName: true,
      buyerName: true,
      buyerEmail: true,
      instructions: true,
    });

    if (!isValid) return;

    setIsSubmitting(true);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [isValid]);

  // -----------------------------------------------------------------------
  // Success State
  // -----------------------------------------------------------------------
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
        className="mx-auto max-w-lg py-12 text-center"
      >
        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent-100"
        >
          <svg
            className="h-10 w-10 text-accent-600"
            viewBox="0 0 24 24"
            fill="none"
          >
            <motion.path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.4, duration: 0.4, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>

        <h2 className="mt-6 text-2xl font-bold text-slate-900">
          Narudžbina je uspešno poslata!
        </h2>
        <p className="mt-3 text-base text-slate-600">
          {celebrity.name} će snimiti vašu video poruku u roku od{" "}
          {formatResponseTime(celebrity.responseTime)}.
        </p>

        {/* Order details card */}
        <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 text-left shadow-sm">
          <h3 className="text-sm font-medium uppercase tracking-wider text-slate-400">
            Detalji narudžbine
          </h3>
          <div className="mt-4 space-y-3">
            <DetailRow label="Tip poruke" value={selectedVideoType!.title} />
            <DetailRow label="Za" value={recipientName} />
            <DetailRow label="Od" value={buyerName} />
            <DetailRow label="Cena" value={formatPrice(celebrity.price)} />
            <DetailRow
              label="Rok isporuke"
              value={formatResponseTime(celebrity.responseTime)}
            />
          </div>
        </div>

        {/* Back buttons */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href={`/zvezda/${celebrity.slug}`}>
            <Button variant="outline">Nazad na profil</Button>
          </Link>
          <Link href="/">
            <Button variant="ghost">Početna strana</Button>
          </Link>
        </div>
      </motion.div>
    );
  }

  // -----------------------------------------------------------------------
  // Form State
  // -----------------------------------------------------------------------
  return (
    <div className="space-y-8">
      {/* Section 1: Video Type Selector */}
      <ScrollReveal>
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Izaberite tip video poruke
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Odaberite vrstu poruke koju želite
          </p>

          <div
            role="radiogroup"
            aria-label="Tip video poruke"
            className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {celebrity.videoTypes?.map((vt) => (
              <VideoTypeCard
                key={vt.id}
                videoType={vt}
                selected={selectedVideoType?.id === vt.id}
                onSelect={(selected) => {
                  setSelectedVideoType(selected);
                  markTouched("videoType");
                }}
              />
            ))}
          </div>

          {touched.videoType && errors.videoType && (
            <p className="mt-2 text-xs text-red-500">{errors.videoType}</p>
          )}
        </div>
      </ScrollReveal>

      {/* Section 2: Form Fields */}
      <ScrollReveal delay={0.1}>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">
            Detalji narudžbine
          </h2>
          <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />

          <div className="mt-6 space-y-5">
            {/* Recipient name */}
            <div>
              <label
                htmlFor="recipientName"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Ime primaoca
              </label>
              <input
                type="text"
                id="recipientName"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                onBlur={() => markTouched("recipientName")}
                placeholder="Za koga je video poruka?"
                className={cn(
                  inputClass,
                  touched.recipientName && errors.recipientName && inputErrorClass
                )}
              />
              {touched.recipientName && errors.recipientName && (
                <p className="mt-1.5 text-xs text-red-500">{errors.recipientName}</p>
              )}
            </div>

            {/* Buyer name */}
            <div>
              <label
                htmlFor="buyerName"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Vaše ime
              </label>
              <input
                type="text"
                id="buyerName"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                onBlur={() => markTouched("buyerName")}
                placeholder="Vaše ime i prezime"
                className={cn(
                  inputClass,
                  touched.buyerName && errors.buyerName && inputErrorClass
                )}
              />
              {touched.buyerName && errors.buyerName && (
                <p className="mt-1.5 text-xs text-red-500">{errors.buyerName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="buyerEmail"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Email adresa
              </label>
              <input
                type="email"
                id="buyerEmail"
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                onBlur={() => markTouched("buyerEmail")}
                placeholder="vas@email.com"
                className={cn(
                  inputClass,
                  touched.buyerEmail && errors.buyerEmail && inputErrorClass
                )}
              />
              {touched.buyerEmail && errors.buyerEmail && (
                <p className="mt-1.5 text-xs text-red-500">{errors.buyerEmail}</p>
              )}
            </div>

            {/* Instructions */}
            <div>
              <label
                htmlFor="instructions"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Instrukcije za zvezdu
              </label>
              <textarea
                id="instructions"
                rows={4}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                onBlur={() => markTouched("instructions")}
                placeholder="Opišite šta želite da zvezda kaže u video poruci..."
                className={cn(
                  inputClass,
                  "resize-none",
                  touched.instructions && errors.instructions && inputErrorClass
                )}
              />
              {touched.instructions && errors.instructions && (
                <p className="mt-1.5 text-xs text-red-500">{errors.instructions}</p>
              )}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Section 3: Order Summary */}
      <ScrollReveal delay={0.2}>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">
            Rezime narudžbine
          </h2>
          <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />

          <div className="mt-6 space-y-3">
            <DetailRow
              label="Tip poruke"
              value={selectedVideoType?.title || "Nije izabrano"}
              muted={!selectedVideoType}
            />
            <DetailRow
              label="Cena"
              value={formatPrice(celebrity.price)}
            />
            <DetailRow
              label="Rok isporuke"
              value={formatResponseTime(celebrity.responseTime)}
            />
            <div className="my-4 border-t border-slate-100" />
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-slate-900">Ukupno</span>
              <span className="text-xl font-extrabold text-primary-600">
                {formatPrice(celebrity.price)}
              </span>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            className="mt-6"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting
              ? "Obrađujem narudžbinu..."
              : `Naruči video poruku — ${formatPrice(celebrity.price)}`}
          </Button>

          <p className="mt-3 text-center text-xs text-slate-400">
            Garantujemo isporuku ili povraćaj novca
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helper: Detail Row
// ---------------------------------------------------------------------------

function DetailRow({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-500">{label}</span>
      <span
        className={cn(
          "text-sm font-medium",
          muted ? "text-slate-400 italic" : "text-slate-900"
        )}
      >
        {value}
      </span>
    </div>
  );
}
