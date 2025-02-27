import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'


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
    description: "Portfolio prezentujące doświadczenie oraz umiejętności programowania w JavaScript i nie tylko. Jan Kotania to pasjonat nowych technologii oraz doświadczony Developer specjalizujący się w React, Next.js i nowoczesnych rozwiązaniach webowych. Tworzy szybkie, responsywne i intuicyjne aplikacje internetowe, dbając o jakość kodu, optymalizację wydajności oraz najlepsze praktyki UX/UI.",

    keywords: [
        'Jan Kotania', 'jkotania', 'frontend developer', 'fullstack developer',
        'react developer', 'next.js developer', 'programista webowy',
        'tworzenie stron internetowych', 'AI developer', 'Flutter',
        'aplikacje webowe', 'JavaScript', 'TypeScript', 'UI/UX design'
    ],

    author: "Jan Kotania",

    icons: {
        icon: [
            { rel: 'icon', url: 'https://jkotania.tech/favicon.ico' },
            { rel: 'apple-touch-icon', url: 'https://jkotania.tech/favicon.ico' },
        ],
    },

    openGraph: {
        title: 'Portfolio - Jan Kotania | Fullstack Developer',
        description: 'Portfolio doświadczonego FullStack Developera Jana Kotani, specjalizującego się w React, Next.js i nowoczesnych technologiach webowych.',
        url: 'https://jkotania.tech',
        siteName: 'Jan Kotania Portfolio',
        locale: 'pl_PL',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};



export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
    <head>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
    </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
