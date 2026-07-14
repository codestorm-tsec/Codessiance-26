import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

/**
 * Display font: Archivo (weight 400-900)
 * Used for big Wrapped-style numerals, headlines, and stat callouts.
 * Closest free alternative to Spotify Circular — condensed, heavy grotesque.
 */
const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

/**
 * Body font: Inter (weight 400-600)
 * Clean, readable body text and UI elements.
 */
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Codessiance '26 | TSEC CodeStorm",
  description:
    "Codessiance — TSEC CodeStorm's flagship 24-hour offline hackathon. Your code. Your story. Wrapped.",
  openGraph: {
    title: "Codessiance '26 | TSEC CodeStorm",
    description:
      "24 hours. 1 campus. Your story — wrapped. TSEC CodeStorm's flagship hackathon.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-spotify-black text-spotify-white font-sans"
        suppressHydrationWarning
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
