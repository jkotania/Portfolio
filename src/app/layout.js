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
  title: "Portfolio - Jan Kotania",
  description: "Portfolio ukazujące doświadczenie i umiejętności programowania w języku JavaScript i nie tylko. Jan Kotania to Developer specjalizujący się w React, Next.js i nowoczesnych technologiach webowych.",
    keywords: ['Jan Kotania', 'jkotania', 'frontend developer', 'react developer', 'programista', 'portfolio','fullstack developer',  'Next.js', 'Flutter', 'AI'],
    icons: {
        icon: [
            { rel: 'icon', url: '/favicon.ico' },
            { rel: 'apple-touch-icon', url: '/favicon.ico' },
        ],
    },
    openGraph: {
        title: 'Portfolio - Jan Kotania',
        description: 'Portfolio - FullStack Developer Jan Kotania',
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
    <html lang="en" suppressHydrationWarning={true}>
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
