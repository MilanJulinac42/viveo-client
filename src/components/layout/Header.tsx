/**
 * @fileoverview Sticky site header with navigation and mobile hamburger menu.
 * Contains the Viveo logo, nav links, auth state, and CTA button.
 */

"use client";

import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import Container from "./Container";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/60 backdrop-blur-xl shadow-sm shadow-slate-900/5">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary-500">
              Viveo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-primary-500"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA / Auth */}
          <div className="hidden items-center gap-3 md:flex">
            {loading ? (
              <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-100" />
            ) : user ? (
              <>
                {user.role === "star" ? (
                  <Link href="/zvezda-panel">
                    <Button size="sm" variant="outline">Panel</Button>
                  </Link>
                ) : (
                  <Link href="/moje-porudzbine">
                    <Button size="sm" variant="outline">Porudzbine</Button>
                  </Link>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700">
                    {user.fullName}
                  </span>
                  <button
                    onClick={logout}
                    className="text-sm font-medium text-slate-500 transition-colors hover:text-red-500"
                  >
                    Odjavi se
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/prijava">
                  <Button size="sm" variant="outline">Prijava</Button>
                </Link>
                <Link href="/registracija">
                  <Button size="sm">Pridruži se</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2.5 text-slate-600 hover:bg-slate-100 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Zatvori meni" : "Otvori meni"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 md:hidden",
            mobileMenuOpen ? "max-h-96 pb-4" : "max-h-0"
          )}
        >
          <nav className="flex flex-col gap-2 pt-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-primary-50 hover:text-primary-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 px-3">
              {loading ? null : user ? (
                <>
                  <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                    {user.fullName}
                  </div>
                  {user.role === "star" ? (
                    <Link href="/zvezda-panel" onClick={() => setMobileMenuOpen(false)}>
                      <Button size="sm" variant="outline" fullWidth>Panel</Button>
                    </Link>
                  ) : (
                    <Link href="/moje-porudzbine" onClick={() => setMobileMenuOpen(false)}>
                      <Button size="sm" variant="outline" fullWidth>Porudzbine</Button>
                    </Link>
                  )}
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="rounded-lg px-3 py-3 text-left text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                  >
                    Odjavi se
                  </button>
                </>
              ) : (
                <>
                  <Link href="/prijava" onClick={() => setMobileMenuOpen(false)}>
                    <Button size="sm" variant="outline" fullWidth>Prijava</Button>
                  </Link>
                  <Link href="/registracija" onClick={() => setMobileMenuOpen(false)}>
                    <Button size="sm" fullWidth>Pridruži se</Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
}
