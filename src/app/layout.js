import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Portfolio - Jan Kotania | Fullstack Developer",
  description:
    "Portfolio showcasing experience and programming skills in JavaScript and beyond. Jan Kotania is a passionate developer of new technologies and an experienced Developer specializing in React, Next.js and modern web solutions. He creates fast, responsive and intuitive web applications, taking care of code quality, performance optimization and UX/UI best practices.",

  keywords: [
    "Jan Kotania",
    "jkotania",
    "frontend developer",
    "fullstack developer",
    "react developer",
    "next.js developer",
    "programista webowy",
    "tworzenie stron internetowych",
    "AI developer",
    "Flutter",
    "aplikacje webowe",
    "JavaScript",
    "TypeScript",
    "UI/UX design",
  ],

  author: "Jan Kotania",

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },

  openGraph: {
    title: "Portfolio - Jan Kotania | Fullstack Developer",
    description:
      "Portfolio of experienced FullStack Developer Jan Kotania, specializing in React, Next.js and modern web technologies",
    url: "https://jkotania.tech",
    siteName: "Portfolio - Jan Kotania | Fullstack Developer",
    locale: "en_EN",
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
