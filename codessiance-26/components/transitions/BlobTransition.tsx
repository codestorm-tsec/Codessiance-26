"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sectionGradients, type SectionKey } from "@/lib/colors";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Section boundary pairs for blob transitions.
 * First pair (hero→genres) is the "heavy" scroll-locked version.
 * Subsequent pairs are lighter, scrub-driven.
 */
const TRANSITIONS: Array<{
  from: SectionKey;
  to: SectionKey;
  heavy?: boolean;
}> = [
  { from: "hero", to: "genres", heavy: true },
  { from: "genres", to: "timeline" },
  { from: "timeline", to: "prizes" },
  { from: "prizes", to: "sponsors" },
  { from: "sponsors", to: "outro" },
];

/**
 * Creates blob overlay elements (3–4 blurred radial-gradient circles)
 * in the given container, using the from/to gradient colors.
 */
function createBlobElements(
  container: HTMLDivElement,
  fromColors: { from: string; to: string },
  toColors: { from: string; to: string }
): HTMLDivElement[] {
  const blobs: HTMLDivElement[] = [];
  const blobConfigs = [
    { size: "80vmax", x: "-20%", y: "-30%", color: fromColors.from, blur: "80px" },
    { size: "70vmax", x: "30%", y: "20%", color: fromColors.to, blur: "100px" },
    { size: "60vmax", x: "-10%", y: "40%", color: toColors.from, blur: "90px" },
    { size: "50vmax", x: "40%", y: "-20%", color: toColors.to, blur: "70px" },
  ];

  blobConfigs.forEach((config) => {
    const blob = document.createElement("div");
    blob.style.cssText = `
      position: absolute;
      width: ${config.size};
      height: ${config.size};
      border-radius: 50%;
      background: radial-gradient(circle, ${config.color}cc 0%, ${config.color}00 70%);
      filter: blur(${config.blur});
      left: ${config.x};
      top: ${config.y};
      transform: scale(0);
      opacity: 0;
      pointer-events: none;
    `;
    container.appendChild(blob);
    blobs.push(blob);
  });

  return blobs;
}

export default function BlobTransition() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    

    const container = containerRef.current;
    if (!container) return;

    const triggers: ScrollTrigger[] = [];

    TRANSITIONS.forEach((transition) => {
      const fromSection = document.getElementById(transition.from);
      const toSection = document.getElementById(transition.to);

      if (!fromSection || !toSection) return;

      const fromGradient = sectionGradients[transition.from];
      const toGradient = sectionGradients[transition.to];

      // Create a wrapper div for this specific transition's blobs
      const blobWrapper = document.createElement("div");
      blobWrapper.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 40;
        pointer-events: none;
        overflow: hidden;
        opacity: 0;
      `;
      container.appendChild(blobWrapper);

      const blobs = createBlobElements(blobWrapper, fromGradient, toGradient);

      if (transition.heavy) {
        // ── HEAVY transition (Hero → Genres): scroll-locked pin ──
        const heavyTl = gsap.timeline({
          scrollTrigger: {
            trigger: fromSection,
            start: "bottom 90%",
            end: "bottom 10%",
            scrub: 1,
            onEnter: () => {
              blobWrapper.style.opacity = "1";
            },
            onLeaveBack: () => {
              blobWrapper.style.opacity = "0";
            },
          },
        });

        // Blobs scale up and in
        heavyTl.to(
          blobs,
          {
            scale: 1.5,
            opacity: 0.7,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.inOut",
          },
          0
        );

        // Peak coverage
        heavyTl.to(
          blobs,
          {
            scale: 2,
            opacity: 0.9,
            duration: 0.3,
            ease: "power1.in",
          },
          0.4
        );

        // Blobs shrink and fade out
        heavyTl.to(
          blobs,
          {
            scale: 0,
            opacity: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.in",
          },
          0.7
        );

        heavyTl.to(
          blobWrapper,
          { opacity: 0, duration: 0.1 },
          0.95
        );

        if (heavyTl.scrollTrigger) {
          triggers.push(heavyTl.scrollTrigger);
        }
      } else {
        // ── LIGHT transition: scrubbed, non-blocking ──
        const lightTl = gsap.timeline({
          scrollTrigger: {
            trigger: fromSection,
            start: "bottom 70%",
            end: "bottom -10%",
            scrub: 2,
            onEnter: () => {
              blobWrapper.style.opacity = "1";
            },
            onLeaveBack: () => {
              blobWrapper.style.opacity = "0";
            },
          },
        });

        // Subtle blob appearance
        lightTl.to(
          blobs,
          {
            scale: 1.2,
            opacity: 0.4,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.inOut",
          },
          0
        );

        // Fade out
        lightTl.to(
          blobs,
          {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.in",
          },
          0.5
        );

        lightTl.to(
          blobWrapper,
          { opacity: 0, duration: 0.1 },
          0.9
        );

        if (lightTl.scrollTrigger) {
          triggers.push(lightTl.scrollTrigger);
        }
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
      // Clean up dynamically created elements
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-40 pointer-events-none"
      aria-hidden="true"
    />
  );
}
