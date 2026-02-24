import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Viveo — Personalizovane video poruke od zvezda",
  description:
    "Naruči personalizovanu video poruku od omiljenih srpskih zvezda. Savršen poklon za rođendan, godišnjicu ili bilo koju priliku.",
  keywords: [
    "video poruke",
    "personalizovane poruke",
    "srpske zvezde",
    "poklon",
    "cameo",
    "Srbija",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
