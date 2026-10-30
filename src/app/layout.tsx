import type { Metadata, Viewport } from "next";
import { Anybody, Bodoni_Moda, DM_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/ui/Providers";
import { Loader, loaderScript } from "@/components/ui/Loader";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { dayLabels, site } from "@/data/site";
import { siteUrl } from "@/lib/url";

const anybody = Anybody({ subsets: ["latin"], variable: "--font-anybody", axes: ["wdth"], weight: "variable", display: "swap" });
const bodoni = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni", axes: ["opsz"], weight: "variable", style: ["normal", "italic"], display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", weight: "variable", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${site.name} | Lekki Phase 1, Lagos`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_NG",
    title: `${site.name} | Lekki Phase 1, Lagos`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  appleWebApp: { title: "Chiaro", statusBarStyle: "default" },
};

export const viewport: Viewport = { themeColor: "#1c1714", width: "device-width", initialScale: 1 };

const dayNames: Record<string, string> = Object.fromEntries(dayLabels.map((d) => [d.key, d.label]));
const structuredData = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: site.name,
  description: site.description,
  url: siteUrl,
  image: `${siteUrl}/opengraph-image.png`,
  telephone: site.phoneInternational,
  menu: `${siteUrl}/menu`,
  currenciesAccepted: "NGN",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.street}, ${site.address.area}`,
    addressLocality: site.address.city,
    addressCountry: site.address.countryCode,
  },
  ...(site.hours && {
    openingHoursSpecification: Object.entries(site.hours).flatMap(([day, h]) =>
      h ? [{ "@type": "OpeningHoursSpecification", dayOfWeek: dayNames[day], opens: h.open, closes: h.close }] : [],
    ),
  }),
  sameAs: Object.values(site.socials).filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anybody.variable} ${bodoni.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: loaderScript }} />
      </head>
      <body>
        <Loader />
        <a
          href="#main"
          className="fixed left-3 top-3 z-[60] -translate-y-20 rounded-tile bg-ink px-4 py-2 text-cream transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
