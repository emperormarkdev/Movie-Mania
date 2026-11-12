import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Anton, Archivo } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

// Display: a condensed poster face. Big, loud, unmistakable at any size.
// Naira glyph ships in latin-ext, so both subsets are loaded.
const display = Anton({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

// Body & UI: neutral grotesque.
const sans = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const TITLE = "Movie Mania — Promote Your Film in Nigeria";
const DESCRIPTION =
  "Movie Mania promotes Nollywood films, series and cinema releases to an audience that already watches them. Instagram, Facebook, TikTok and Telegram promotion packages from ₦5,000. Pay by card, transfer or USSD.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Movie Mania",
  },
  description: DESCRIPTION,
  keywords: [
    "movie promotion Nigeria",
    "Nollywood promotion",
    "film marketing Nigeria",
    "cinema promotion",
    "Instagram movie promo",
    "Facebook film advertising",
    "TikTok Nollywood",
    "Telegram movie channel",
    "YouTube premiere promotion",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description:
      "Four platforms, one price each. Promote your film to an audience that already shows up for it.",
    url: "/",
    siteName: "Movie Mania",
    locale: "en_NG",
    type: "website",
    images: [{ url: "/images/logo-white.jpg", width: 1280, height: 1280 }],
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description:
      "Four platforms, one price each. Film promotion from ₦5,000.",
    images: ["/images/logo-white.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: "Movie Mania",
  description: DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/images/logo-white.jpg`,
  priceRange: "₦5,000 - ₦40,000",
  areaServed: { "@type": "Country", name: "Nigeria" },
  sameAs: [
    "https://wa.me/2348147300090",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Instagram Promotion",
        description: "2 promotional clips on Instagram Reels & feed.",
      },
      price: "15000",
      priceCurrency: "NGN",
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Facebook Promotion",
        description: "2 promotional clips on Facebook video feeds & groups.",
      },
      price: "15000",
      priceCurrency: "NGN",
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "TikTok Promotion",
        description: "1 vertical promotional clip on TikTok.",
      },
      price: "5000",
      priceCurrency: "NGN",
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Telegram Promotion",
        description: "1 broadcast post to a movie-lover channel.",
      },
      price: "5000",
      priceCurrency: "NGN",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <head>
        <Script
          src="https://js.paystack.co/v1/inline.js"
          strategy="lazyOnload"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORG_JSON_LD).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
