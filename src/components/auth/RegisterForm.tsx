/**
 * @fileoverview Registration form with name, email, password fields,
 * account type selector, terms checkbox, and animated success state.
 *
 * @example
 * ```tsx
 * <RegisterForm />
 * ```
 */

"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

/** Shared input class for consistent styling */
const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700 backdrop-blur-xl transition-all duration-200 placeholder:text-slate-400 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20";

/** Error state class overlay */
const inputErrorClass =
  "border-red-300 focus:border-red-400 focus:ring-red-500/20";

/** Account type options */
const ACCOUNT_TYPES = [
  {
    id: "fan",
    emoji: "\u{1F3AC}",
    label: "Fan",
    description: "Naručujem personalizovane video poruke",
  },
  {
    id: "star",
    emoji: "\u{2B50}",
    label: "Zvezda",
    description: "Primam zahteve i snimam video poruke",
  },
] as const;

type AccountType = (typeof ACCOUNT_TYPES)[number]["id"];

/**
 * Registration form component with full validation and mock submit.
 *
 * @returns Interactive registration form with success animation
 */
export default function RegisterForm() {
  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState<AccountType>("fan");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // ---------------------------------------------------------------------------
  // Validation
  // ---------------------------------------------------------------------------
  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!fullName.trim()) e.fullName = "Unesite ime i prezime";
    else if (fullName.length < 3)
      e.fullName = "Ime mora imati najmanje 3 karaktera";
    if (!email.trim()) e.email = "Unesite email adresu";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Unesite ispravnu email adresu";
    if (!password.trim()) e.password = "Unesite lozinku";
    else if (password.length < 6)
      e.password = "Lozinka mora imati najmanje 6 karaktera";
    if (!confirmPassword.trim())
      e.confirmPassword = "Potvrdite lozinku";
    else if (password !== confirmPassword)
      e.confirmPassword = "Lozinke se ne poklapaju";
    if (!acceptTerms) e.acceptTerms = "Morate prihvatiti uslove korišćenja";
    return e;
  }, [fullName, email, password, confirmPassword, acceptTerms]);

  const isValid = Object.keys(errors).length === 0;

  const markTouched = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  // ---------------------------------------------------------------------------
  // Submit
  // ---------------------------------------------------------------------------
  const handleSubmit = useCallback(async () => {
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
      acceptTerms: true,
    });
    if (!isValid) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  }, [isValid]);

  // ---------------------------------------------------------------------------
  // Success state
  // ---------------------------------------------------------------------------
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
        className="mx-auto max-w-lg py-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
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
          Nalog je uspešno kreiran!
        </h2>
        <p className="mt-2 text-slate-600">
          {accountType === "star"
            ? "Dobrodošli u Viveo zajednicu zvezda. Postavite svoj profil i počnite da primate zahteve."
            : "Dobrodošli na Viveo! Pronađite svoju omiljenu zvezdu i naručite personalizovanu video poruku."}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {accountType === "star" ? (
            <>
              <Link href="/zvezda-panel">
                <Button variant="primary">Zvezda panel</Button>
              </Link>
              <Link href="/zvezde">
                <Button variant="outline">Pregledaj platformu</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/zvezde">
                <Button variant="primary">Pregledaj zvezde</Button>
              </Link>
              <Link href="/moje-porudzbine">
                <Button variant="outline">Moje porudžbine</Button>
              </Link>
            </>
          )}
        </div>
      </motion.div>
    );
  }

  // ---------------------------------------------------------------------------
  // Form
  // ---------------------------------------------------------------------------
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
      {/* Form header */}
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-slate-900">Kreirajte nalog</h2>
        <p className="mt-1 text-sm text-slate-500">
          Pridružite se Viveo zajednici besplatno
        </p>
      </div>

      {/* Social register buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </button>
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          <svg
            className="h-5 w-5 text-[#1877F2]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </button>
      </div>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-medium text-slate-400">ILI</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {/* Form fields */}
      <div className="space-y-5">
        {/* Account type selector */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Tip naloga
          </label>
          <div className="grid grid-cols-2 gap-3">
            {ACCOUNT_TYPES.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setAccountType(type.id)}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-xl border-2 px-4 py-4 text-center transition-all duration-200",
                  accountType === type.id
                    ? "border-primary-500 bg-primary-50 shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                <span className="text-2xl">{type.emoji}</span>
                <span
                  className={cn(
                    "text-sm font-semibold",
                    accountType === type.id
                      ? "text-primary-700"
                      : "text-slate-700"
                  )}
                >
                  {type.label}
                </span>
                <span
                  className={cn(
                    "text-xs leading-snug",
                    accountType === type.id
                      ? "text-primary-600"
                      : "text-slate-500"
                  )}
                >
                  {type.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Full name */}
        <div>
          <label
            htmlFor="register-name"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Ime i prezime
          </label>
          <input
            type="text"
            id="register-name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onBlur={() => markTouched("fullName")}
            placeholder="Marko Marković"
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
            htmlFor="register-email"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Email adresa
          </label>
          <input
            type="email"
            id="register-email"
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

        {/* Password */}
        <div>
          <label
            htmlFor="register-password"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Lozinka
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="register-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => markTouched("password")}
              placeholder="Najmanje 6 karaktera"
              className={cn(
                inputClass,
                "pr-11",
                touched.password && errors.password && inputErrorClass
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
              aria-label={showPassword ? "Sakrij lozinku" : "Prikaži lozinku"}
            >
              {showPassword ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          </div>
          {touched.password && errors.password && (
            <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Confirm password */}
        <div>
          <label
            htmlFor="register-confirm"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Potvrdite lozinku
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="register-confirm"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => markTouched("confirmPassword")}
            placeholder="Ponovite lozinku"
            className={cn(
              inputClass,
              touched.confirmPassword &&
                errors.confirmPassword &&
                inputErrorClass
            )}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Terms checkbox */}
        <div>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => {
                setAcceptTerms(e.target.checked);
                markTouched("acceptTerms");
              }}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-primary-500 focus:ring-primary-500/20"
            />
            <span className="text-sm text-slate-600">
              Prihvatam{" "}
              <a
                href="#"
                className="font-medium text-primary-500 transition-colors hover:text-primary-600"
              >
                uslove korišćenja
              </a>{" "}
              i{" "}
              <a
                href="#"
                className="font-medium text-primary-500 transition-colors hover:text-primary-600"
              >
                politiku privatnosti
              </a>
            </span>
          </label>
          {touched.acceptTerms && errors.acceptTerms && (
            <p className="mt-1.5 text-xs text-red-500">{errors.acceptTerms}</p>
          )}
        </div>

        {/* Submit */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Kreiranje naloga..." : "Kreirajte nalog"}
        </Button>
      </div>

      {/* Login link */}
      <p className="mt-6 text-center text-sm text-slate-600">
        Već imate nalog?{" "}
        <Link
          href="/prijava"
          className="font-medium text-primary-500 transition-colors hover:text-primary-600"
        >
          Prijavite se
        </Link>
      </p>
    </div>
  );
}
