"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Custom hook to initialize Lenis smooth scroll and sync it with GSAP ScrollTrigger.
 * Should be called once in the root layout or provider.
 *
 * Based on Lenis + GSAP integration best practices:
 * - lenis.on('scroll', ScrollTrigger.update) keeps ScrollTrigger in sync
 * - gsap.ticker.add ties Lenis's raf to GSAP's animation frame
 * - gsap.ticker.lagSmoothing(0) prevents GSAP from skipping frames
 */
export function useLenisGSAP() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll position with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame to GSAP's ticker
    // This ensures Lenis and GSAP animations stay in perfect sync
    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000); // GSAP ticker uses seconds, Lenis uses ms
    });

    // Disable GSAP's lag smoothing so scroll-linked animations stay precise
    gsap.ticker.lagSmoothing(0);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as unknown as gsap.TickerCallback);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return lenisRef;
}

/**
 * Utility to refresh all ScrollTrigger instances.
 * Call after dynamic content loads or layout changes.
 */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}

export { gsap, ScrollTrigger };
