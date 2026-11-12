import type { Metadata } from "next";
import Script from "next/script";
import { Anton, Archivo } from "next/font/google";
import "./globals.css";

// Display: a condensed poster face. Big, loud, unmistakable at any size.
// Naira glyph ships in latin-ext, so both subsets are loaded.
const display = Anton({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

// Body & UI: Anti-climax-free grotesque. Neutral but not default.
const sans = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Movie Mania — Film & Cinema Promotion",
  description:
    "Put your film in front of an audience that already watches movies. Promotion across Instagram, Facebook, TikTok and Telegram. Transparent Naira pricing, pay by card, transfer or USSD.",
  openGraph: {
    title: "Movie Mania — Film & Cinema Promotion",
    description:
      "Promote your film to an audience that already shows up for it. Four platforms, one price each.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <head>
        {/* Black clapperboard mark — white-ground JPEG, no transparency. */}
        <link rel="icon" href="/images/logo-black.jpg" type="image/jpeg" />
        <Script
          src="https://js.paystack.co/v1/inline.js"
          strategy="lazyOnload"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
