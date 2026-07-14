"use client";

import { useLenisGSAP } from "@/lib/gsapConfig";

/**
 * SmoothScrollProvider
 * Wraps the app in Lenis smooth scroll + GSAP ScrollTrigger sync.
 * Must be a client component since it uses hooks and browser APIs.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useLenisGSAP();

  return <>{children}</>;
}
