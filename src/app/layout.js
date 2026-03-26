import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { translations } from "@/app/i18n/translations";
import { headers } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

async function getLanguage() {
  const headersList = await headers();
  const acceptLanguage = (
    headersList.get("accept-language") || ""
  ).toLowerCase();

  // Na domenie .pl domyślnie serwujemy język polski, chyba że użytkownik wyraźnie preferuje angielski
  if (acceptLanguage.startsWith("en")) {
    return "en";
  }

  return "pl";
}

export async function generateMetadata() {
  const lang = await getLanguage();
  const t = translations[lang];

  return {
    metadataBase: new URL("https://jkotania.pl"),
    title: {
      default: t.meta.title,
      template: "%s | Jan Kotania",
    },
    description: t.meta.description,
    keywords: t.meta.keywords,
    applicationName: "Jan Kotania Portfolio",
    authors: [{ name: "Jan Kotania", url: "https://jkotania.pl" }],
    creator: "Jan Kotania",
    publisher: "Jan Kotania",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: "https://jkotania.pl",
      siteName: "Jan Kotania",
      locale: lang === "pl" ? "pl_PL" : "en_US",
      type: "website",
      images: [
        {
          url: "/portfolio-preview.png",
          width: 1200,
          height: 630,
          alt: t.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: ["/portfolio-preview.png"],
    },
    alternates: {
      canonical: "https://jkotania.pl",
      languages: {
        "x-default": "https://jkotania.pl",
        pl: "https://jkotania.pl",
        en: "https://jkotania.pl",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };
}

export default async function RootLayout({ children }) {
  const lang = await getLanguage();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jan Kotania",
    url: "https://jkotania.pl",
    jobTitle: "Web Developer & AI Engineer",
    description: translations[lang].meta.description,
    sameAs: [
      "https://github.com/jkotania",
      "https://linkedin.com/in/jan-kotania",
    ],
  };

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
