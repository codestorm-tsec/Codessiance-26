"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { CheckeredPattern, LineScribble } from "@/components/ui/DecorativePatterns";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative overflow-hidden section-light grain-overlay min-h-[85vh] flex items-center justify-center py-12 md:py-20"
      style={{ backgroundColor: "#EBE6DF" }}
    >
      {/* Background line-art flower (top right) */}
      <div className="absolute -top-10 -right-10 pointer-events-none opacity-40 md:opacity-60">
        <LineScribble className="w-80 h-80 md:w-[32rem] md:h-[32rem]" color="#1A1A1A" />
      </div>

      {/* Background checkered pattern (center right) */}
      <div className="absolute top-1/2 -right-16 -translate-y-1/2 pointer-events-none opacity-25 hidden sm:block">
        <CheckeredPattern cols={10} rows={10} size={36} color1="#000" color2="transparent" warp />
      </div>

      {/* Main Hero Visual Graphic Container */}
      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center opacity-0"
      >
        <div className="relative w-full flex flex-col items-center justify-center">
          
          {/* Green cursive looping '26 text behind & over */}
          <div
            className="absolute -top-12 md:-top-24 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(12rem, 30vw, 26rem)",
              fontWeight: "900",
              color: "transparent",
              WebkitTextStroke: "6px #1DB954",
              lineHeight: 0.8,
              transform: "rotate(-4deg)",
            }}
          >
            2026
          </div>

          {/* Black block with white text: CODESSIANCE */}
          <div className="relative z-10 my-16 md:my-24 w-full flex justify-center">
            <div className="bg-black text-white px-6 sm:px-12 md:px-20 py-4 sm:py-6 md:py-8 shadow-2xl inline-block text-center max-w-full overflow-hidden">
              <h1
                className="text-5xl sm:text-7xl md:text-8xl lg:text-[9.5rem] font-black uppercase tracking-tighter leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "#F0EDEA",
                  letterSpacing: "-0.04em",
                }}
              >
                Codessiance
              </h1>
            </div>
          </div>

          {/* Green cursive overlay text '26 in foreground */}
          <div
            className="absolute -bottom-8 md:-bottom-16 left-1/2 -translate-x-1/2 pointer-events-none select-none z-20"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(6rem, 16vw, 14rem)",
              fontWeight: "900",
              color: "#1DB954",
              lineHeight: 0.8,
              textShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}
          >
            &apos;26
          </div>
        </div>

        {/* Subtitle tag */}
        <div className="mt-20 md:mt-24 text-center z-20">
          <p
            className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--font-body)", color: "#1A1A1A" }}
          >
            TSEC CodeStorm • 24-Hour Offline Hackathon
          </p>
        </div>
      </div>
    </section>
  );
}
