/**
 * @fileoverview Site footer with link columns, social icons, and copyright.
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 */

import Container from "./Container";
import Link from "next/link";

/** Footer link column definition */
interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

/** Footer column data */
const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Platforma",
    links: [
      { label: "Sve zvezde", href: "/zvezde" },
      { label: "Postani zvezda", href: "/postani-zvezda" },
      { label: "Moje porudžbine", href: "/moje-porudzbine" },
    ],
  },
  {
    title: "Kompanija",
    links: [
      { label: "O nama", href: "/o-nama" },
      { label: "Kontakt", href: "/kontakt" },
      { label: "Zvezda panel", href: "/zvezda-panel" },
    ],
  },
  {
    title: "Podrška",
    links: [
      { label: "Česta pitanja", href: "#" },
      { label: "Uslovi korišćenja", href: "#" },
      { label: "Politika privatnosti", href: "#" },
    ],
  },
];

/** Social media links */
const SOCIAL_LINKS = [
  { label: "Instagram", href: "#", icon: "📸" },
  { label: "TikTok", href: "#", icon: "🎵" },
  { label: "Twitter", href: "#", icon: "🐦" },
  { label: "YouTube", href: "#", icon: "▶️" },
];

/**
 * Site-wide footer with navigation columns, social links, and copyright notice.
 *
 * @returns Footer element with link grid and branding
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-100 bg-slate-50">
      <Container>
        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 sm:py-16 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand column */}
          <div className="sm:col-span-2 md:col-span-4 lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold text-primary-500">
                Viveo
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              Personalizovane video poruke od omiljenih srpskih zvezda.
              Savršen poklon za svaku priliku.
            </p>
            {/* Social links */}
            <div className="mt-6 flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg shadow-sm transition-colors hover:bg-primary-50"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-slate-900">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 transition-colors hover:text-primary-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200 py-6">
          <p className="text-center text-sm text-slate-500">
            &copy; {currentYear} Viveo. Sva prava zadržana.
          </p>
        </div>
      </Container>
    </footer>
  );
}
