import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  description: "Ukazujące doświadczenie i umiejętności programowania w języku JavaScript i nie tylko.",
    icons: {
        icon: [
            { rel: 'icon', url: '/favicon.ico' },
            { rel: 'apple-touch-icon', url: '/favicon.ico' },
        ],
    },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
