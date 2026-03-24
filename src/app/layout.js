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
  const acceptLanguage = headersList.get("accept-language") || "";
  const userAgent = headersList.get("user-agent") || "";

  const isGoogleBot = userAgent.toLowerCase().includes("googlebot");
  const isPolishRequest = acceptLanguage.includes("pl");

  if (isGoogleBot) {
    return isPolishRequest ? "pl" : "en";
  }

  return acceptLanguage.includes("pl") ? "pl" : "en";
}

export async function generateMetadata() {
  const lang = await getLanguage();
  const t = translations[lang];

  return {
    metadataBase: new URL("https://jkotania.pl"),
    title: t.meta.title,
    description: t.meta.description,
    keywords: t.meta.keywords,
    author: "Jan Kotania",
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
      siteName: t.meta.title,
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

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
