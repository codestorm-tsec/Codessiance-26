import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

/**
 * Display font: Spotify Mix Ultra
 * Used for big Wrapped-style numerals, headlines, and stat callouts.
 */
const spotifyMixUltra = localFont({
  src: "../font/SpotifyMix-Ultra.woff2",
  weight: "900",
  style: "normal",
  variable: "--font-display",
  display: "swap",
});

/**
 * Body font: Spotify Mix
 * Clean, readable body text and UI elements.
 */
const spotifyMix = localFont({
  src: [
    { path: "../font/SpotifyMix-Light.woff2", weight: "300", style: "normal" },
    { path: "../font/SpotifyMix-Regular.woff2", weight: "400", style: "normal" },
    { path: "../font/SpotifyMix-Medium.woff2", weight: "500", style: "normal" },
    { path: "../font/SpotifyMix-Bold.woff2", weight: "700", style: "normal" },
    { path: "../font/SpotifyMix-Extrabold.woff2", weight: "800", style: "normal" },
    { path: "../font/SpotifyMix-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Codeissance '26 | TSEC CodeStorm",
  description:
    "Codeissance — TSEC CodeStorm's flagship 24-hour offline hackathon. Your code. Your story. Wrapped.",
  openGraph: {
    title: "Codeissance '26 | TSEC CodeStorm",
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
      className={`${spotifyMixUltra.variable} ${spotifyMix.variable} h-full antialiased`}
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
