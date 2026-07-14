"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const LOADING_LINES = [
  "Counting your commits…",
  "Analyzing your caffeine intake…",
  "Mixing your hackathon playlist…",
  "Tuning 24 hours of code…",
];

export default function Loader() {
  const [isComplete, setIsComplete] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Session guard — only play once per session
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("codessiance-loaded")) {
        setShouldRender(false);
        return;
      }
    }

    // Check prefers-reduced-motion
    

    // Prevent scrolling during loader
    document.body.style.overflow = "hidden";

    const ring = ringRef.current;
    const percent = percentRef.current;
    const text = textRef.current;
    const container = containerRef.current;
    const overlay = overlayRef.current;

    if (!ring || !percent || !text || !container || !overlay) return;

    // SVG circle params
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    ring.style.strokeDasharray = `${circumference}`;
    ring.style.strokeDashoffset = `${circumference}`;

    // Counter object for GSAP
    const counter = { value: 0 };

    // Text cycling
    let textIndex = 0;
    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % LOADING_LINES.length;
      gsap.to(text, {
        opacity: 0,
        y: -8,
        duration: 0.15,
        onComplete: () => {
          text.textContent = LOADING_LINES[textIndex];
          gsap.fromTo(
            text,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.15 }
          );
        },
      });
    }, 500);

    // Main timeline
    const tl = gsap.timeline({
      onComplete: () => {
        clearInterval(textInterval);
        sessionStorage.setItem("codessiance-loaded", "true");
        document.body.style.overflow = "";

        // Burst-open transition
        const burstTl = gsap.timeline({
          onComplete: () => {
            setIsComplete(true);
            setTimeout(() => setShouldRender(false), 100);
          },
        });

        // Collapse ring to a green dot
        burstTl.to([ring, percent, text], {
          opacity: 0,
          scale: 0.5,
          duration: 0.3,
          ease: "power2.in",
        });

        // Expand green circle to cover viewport
        burstTl.fromTo(
          overlay,
          {
            clipPath: "circle(0% at 50% 50%)",
            opacity: 1,
          },
          {
            clipPath: "circle(150% at 50% 50%)",
            duration: 0.8,
            ease: "power3.inOut",
          },
          "-=0.1"
        );

        // Fade out entire loader
        burstTl.to(container, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      },
    });

    // Animate the progress ring + counter over 2.5s
    tl.to(counter, {
      value: 100,
      duration: 2.5,
      ease: "power1.inOut",
      onUpdate: () => {
        const val = Math.round(counter.value);
        percent.textContent = `${val}`;
        const offset = circumference - (counter.value / 100) * circumference;
        ring.style.strokeDashoffset = `${offset}`;
      },
    });

    return () => {
      clearInterval(textInterval);
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-spotify-black-pure"
      style={{ pointerEvents: isComplete ? "none" : "all" }}
    >
      {/* SVG Progress Ring */}
      <div className="relative w-[150px] h-[150px] mb-8">
        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 130 130"
        >
          {/* Background ring */}
          <circle
            cx="65"
            cy="65"
            r="60"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="3"
          />
          {/* Animated green ring */}
          <circle
            ref={ringRef}
            cx="65"
            cy="65"
            r="60"
            fill="none"
            stroke="#1DB954"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        {/* Percentage counter */}
        <span
          ref={percentRef}
          className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl font-black text-spotify-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          0
        </span>
      </div>

      {/* Cycling loading text */}
      <p
        ref={textRef}
        className="text-spotify-grey text-sm md:text-base"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {LOADING_LINES[0]}
      </p>

      {/* Green burst overlay — expands from center on completion */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-spotify-green opacity-0 pointer-events-none"
        style={{ clipPath: "circle(0% at 50% 50%)" }}
      />
    </div>
  );
}
