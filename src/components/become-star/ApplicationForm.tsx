/**
 * @fileoverview Application form for celebrity onboarding.
 * Handles form fields, validation, and animated success state.
 */

"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

const CATEGORIES = [
  { value: "glumci", label: "Glumci", icon: "\u{1F3AD}" },
  { value: "muzicari", label: "Muzi\u010Dari", icon: "\u{1F3B5}" },
  { value: "sportisti", label: "Sportisti", icon: "\u26BD" },
  { value: "influenseri", label: "Influenseri", icon: "\u{1F4F1}" },
  { value: "komicari", label: "Komi\u010Dari", icon: "\u{1F923}" },
  { value: "tv-voditelji", label: "TV Voditelji", icon: "\u{1F4FA}" },
];

/** Shared input className */
const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700 backdrop-blur-xl transition-all duration-200 placeholder:text-slate-400 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20";

/** Error input className addition */
const inputErrorClass =
  "border-red-300 focus:border-red-400 focus:ring-red-500/20";

/**
 * Complete application form for celebrity onboarding with form fields, validation,
 * and animated success state.
 */
export default function ApplicationForm() {
  // Form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [socialMedia, setSocialMedia] = useState("");
  const [followers, setFollowers] = useState("");
  const [bio, setBio] = useState("");
  const [motivation, setMotivation] = useState("");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validation
  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!fullName.trim()) e.fullName = "Unesite ime i prezime";
    if (!email.trim()) e.email = "Unesite email adresu";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Unesite ispravnu email adresu";
    if (!phone.trim()) e.phone = "Unesite broj telefona";
    if (!category) e.category = "Izaberite kategoriju";
    if (!socialMedia.trim()) e.socialMedia = "Unesite link ka dru\u0161tvenim mre\u017Eama";
    if (!followers.trim()) e.followers = "Unesite broj pratilaca";
    if (!bio.trim()) e.bio = "Unesite biografiju";
    else if (bio.trim().length < 50)
      e.bio = "Biografija mora imati najmanje 50 karaktera";
    if (!motivation.trim()) e.motivation = "Opi\u0161ite va\u0161u motivaciju";
    else if (motivation.trim().length < 30)
      e.motivation = "Motivacija mora imati najmanje 30 karaktera";
    return e;
  }, [fullName, email, phone, category, socialMedia, followers, bio, motivation]);

  const isValid = Object.keys(errors).length === 0;

  const markTouched = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const handleSubmit = useCallback(async () => {
    // Mark all fields as touched
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      category: true,
      socialMedia: true,
      followers: true,
      bio: true,
      motivation: true,
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
          Prijava uspe\u0161no poslata!
        </h2>
        <p className="mt-3 text-base text-slate-600">
          Hvala \u0161to \u017Eelite da se pridru\u017Eite Viveo platformi! Na\u0161 tim \u0107e
          pregledati va\u0161u prijavu i kontaktirati vas u roku od 3-5 radnih dana.
        </p>

        {/* What's next card */}
        <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 text-left shadow-sm">
          <h3 className="text-sm font-medium uppercase tracking-wider text-slate-400">
            \u0160ta sledi?
          </h3>
          <div className="mt-4 space-y-3">
            <div className="flex gap-3">
              <span>\u2705</span>
              <span className="text-sm text-slate-700">
                Pregleda\u0107emo va\u0161u prijavu i dru\u0161tvene mre\u017Ee
              </span>
            </div>
            <div className="flex gap-3">
              <span>{"\u{1F4DE}"}</span>
              <span className="text-sm text-slate-700">
                Kontaktira\u0107emo vas putem email-a
              </span>
            </div>
            <div className="flex gap-3">
              <span>{"\u{1F3AC}"}</span>
              <span className="text-sm text-slate-700">
                Ukoliko budete prihva\u0107eni, kreira\u0107emo va\u0161 profil
              </span>
            </div>
          </div>
        </div>

        {/* Back buttons */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/">
            <Button variant="primary">Po\u010Detna strana</Button>
          </Link>
          <Link href="/o-nama">
            <Button variant="ghost">Saznaj vi\u0161e o Viveo</Button>
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
      {/* Card 1: Osnovni podaci */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-bold text-slate-900">Osnovni podaci</h2>
        <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />

        <div className="mt-6 space-y-5">
          {/* Full name */}
          <div>
            <label
              htmlFor="fullName"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Ime i prezime
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={() => markTouched("fullName")}
              placeholder="Va\u0161e puno ime"
              className={cn(
                inputClass,
                touched.fullName && errors.fullName && inputErrorClass
              )}
            />
            {touched.fullName && errors.fullName && (
              <p className="mt-1.5 text-xs text-red-500">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Email adresa
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => markTouched("email")}
              placeholder="vas@email.com"
              className={cn(
                inputClass,
                touched.email && errors.email && inputErrorClass
              )}
            />
            {touched.email && errors.email && (
              <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Broj telefona
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => markTouched("phone")}
              placeholder="+381 6x xxx xxxx"
              className={cn(
                inputClass,
                touched.phone && errors.phone && inputErrorClass
              )}
            />
            {touched.phone && errors.phone && (
              <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Card 2: Profesionalni detalji */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-bold text-slate-900">
          Profesionalni detalji
        </h2>
        <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />

        <div className="mt-6 space-y-5">
          {/* Category selector */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Kategorija
            </label>
            <div
              role="radiogroup"
              aria-label="Kategorija"
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  role="radio"
                  aria-checked={category === cat.value}
                  onClick={() => {
                    setCategory(cat.value);
                    markTouched("category");
                  }}
                  className={cn(
                    category === cat.value
                      ? "rounded-xl border-2 border-primary-500 bg-primary-50/50 p-3 text-center shadow-sm ring-2 ring-primary-500/20"
                      : "rounded-xl border border-slate-200 bg-white p-3 text-center transition-all duration-200 hover:border-primary-200 hover:shadow-sm"
                  )}
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="mt-1 block text-xs font-medium text-slate-700">
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>
            {touched.category && errors.category && (
              <p className="mt-1.5 text-xs text-red-500">{errors.category}</p>
            )}
          </div>

          {/* Social media */}
          <div>
            <label
              htmlFor="socialMedia"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Link ka dru\u0161tvenim mre\u017Eama
            </label>
            <input
              type="text"
              id="socialMedia"
              value={socialMedia}
              onChange={(e) => setSocialMedia(e.target.value)}
              onBlur={() => markTouched("socialMedia")}
              placeholder="https://instagram.com/..."
              className={cn(
                inputClass,
                touched.socialMedia && errors.socialMedia && inputErrorClass
              )}
            />
            {touched.socialMedia && errors.socialMedia && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.socialMedia}
              </p>
            )}
          </div>

          {/* Followers */}
          <div>
            <label
              htmlFor="followers"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Broj pratilaca
            </label>
            <input
              type="text"
              id="followers"
              value={followers}
              onChange={(e) => setFollowers(e.target.value)}
              onBlur={() => markTouched("followers")}
              placeholder="npr. 50.000"
              className={cn(
                inputClass,
                touched.followers && errors.followers && inputErrorClass
              )}
            />
            {touched.followers && errors.followers && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.followers}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Card 3: O vama */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-bold text-slate-900">O vama</h2>
        <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />

        <div className="mt-6 space-y-5">
          {/* Bio */}
          <div>
            <label
              htmlFor="bio"
              className="mb-1.5 flex items-center justify-between text-sm font-medium text-slate-700"
            >
              <span>Kratka biografija</span>
              <span className="text-xs text-slate-400">
                {bio.length}/50 min
              </span>
            </label>
            <textarea
              id="bio"
              rows={5}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              onBlur={() => markTouched("bio")}
              placeholder="Recite nam ne\u0161to o sebi i va\u0161oj karijeri..."
              className={cn(
                inputClass,
                "resize-none",
                touched.bio && errors.bio && inputErrorClass
              )}
            />
            {touched.bio && errors.bio && (
              <p className="mt-1.5 text-xs text-red-500">{errors.bio}</p>
            )}
          </div>

          {/* Motivation */}
          <div>
            <label
              htmlFor="motivation"
              className="mb-1.5 flex items-center justify-between text-sm font-medium text-slate-700"
            >
              <span>Za\u0161to \u017Eelite da se pridru\u017Eite?</span>
              <span className="text-xs text-slate-400">
                {motivation.length}/30 min
              </span>
            </label>
            <textarea
              id="motivation"
              rows={4}
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              onBlur={() => markTouched("motivation")}
              placeholder="\u0160ta vas motivi\u0161e da postanete deo Viveo platforme?"
              className={cn(
                inputClass,
                "resize-none",
                touched.motivation && errors.motivation && inputErrorClass
              )}
            />
            {touched.motivation && errors.motivation && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.motivation}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Submit area */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "\u0160aljem prijavu..." : "Po\u0161aljite prijavu"}
        </Button>
        <p className="mt-3 text-center text-xs text-slate-400">
          Va\u0161i podaci su bezbedni i koriste se isklju\u010Divo za pregled prijave
        </p>
      </div>
    </div>
  );
}
