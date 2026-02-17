import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { organizationJsonLd } from "@/lib/jsonLd";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://viveo.rs";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Viveo — Personalizovane video poruke od zvezda",
    template: "%s | Viveo",
  },
  description:
    "Naruči personalizovanu video poruku od omiljenih srpskih zvezda. Savršen poklon za rođendan, godišnjicu ili bilo koju priliku.",
  keywords: [
    "video poruke",
    "personalizovane poruke",
    "srpske zvezde",
    "poklon",
    "cameo",
    "Srbija",
    "video čestitka",
    "poklon za rođendan",
  ],
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: SITE_URL,
    siteName: "Viveo",
    title: "Viveo — Personalizovane video poruke od zvezda",
    description:
      "Naruči personalizovanu video poruku od omiljenih srpskih zvezda. Savršen poklon za bilo koju priliku.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Viveo — Personalizovane video poruke od zvezda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Viveo — Personalizovane video poruke od zvezda",
    description:
      "Naruči personalizovanu video poruku od omiljenih srpskih zvezda.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
