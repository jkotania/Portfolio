import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { translations } from "@/app/i18n/translations";
import { alternatesFor, getLanguage } from "@/app/i18n/getLanguage";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const viewport = {
  themeColor: "#0a0a0a",
};

export async function generateMetadata() {
  const lang = await getLanguage();
  const t = translations[lang];

  return {
    metadataBase: new URL("https://jkotania.pl"),
    title: t.meta.title,
    description: t.meta.description,
    keywords: t.meta.keywords,
    authors: [{ name: "Jan Kotania", url: "https://jkotania.pl" }],
    alternates: alternatesFor("/"),
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png" }],
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: "https://jkotania.pl",
      siteName: "Jan Kotania",
      images: [{ url: "/portfolio-preview.png", width: 1440, height: 1024 }],
      locale: lang === "pl" ? "pl_PL" : "en_US",
      type: "website",
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
  };
}

export default async function RootLayout({ children }) {
  const lang = await getLanguage();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jan Kotania",
    url: "https://jkotania.pl",
    jobTitle: "Fullstack Developer & AI Engineer",
    description: translations[lang].meta.description,
    sameAs: [
      "https://github.com/jkotania",
      "https://linkedin.com/in/jan-kotania",
    ],
  };

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only rounded-full bg-mono-primary px-5 py-2.5 text-sm font-medium text-mono-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80]"
        >
          {translations[lang].navbar.skipToContent}
        </a>
        <Providers lang={lang}>{children}</Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
