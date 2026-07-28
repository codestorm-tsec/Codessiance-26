"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SPONSORS } from "@/lib/constants";
import { CheckeredPattern, ConcentricCircles, VerticalBars } from "@/components/ui/DecorativePatterns";
import LogoLoop from "@/components/LogoLoop";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function InRotation() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 75%" },
        }
      );

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 75%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sponsors"
      className="section-dark grain-overlay relative overflow-hidden py-24 md:py-36"
      style={{ backgroundColor: "#1A1A1A" }}
    >
      {/* Checkered pattern background */}
      <div className="absolute bottom-0 left-0 pointer-events-none opacity-20">
        <CheckeredPattern cols={12} rows={4} size={30} color1="#FFFFFF" color2="transparent" warp />
      </div>

      {/* Decorative: Concentric Circles — top right */}
      <div className="absolute -top-[20%] -right-[15%] w-[55vw] h-[55vw] md:w-[35vw] md:h-[35vw] opacity-[0.05] pointer-events-none">
        <ConcentricCircles size={700} rings={10} baseColor="#1DB954" altColor="#1A1A1A" highlightRing={4} highlightColor="#8B7CFF" />
      </div>

      {/* Decorative: Vertical Bars — left edge */}
      <div className="absolute top-[40%] left-6 opacity-[0.08] pointer-events-none hidden md:block">
        <VerticalBars bars={3} color="#FFFFFF" className="h-24" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Editorial Feature Header matching Spotify Section 4 */}
        <div ref={headerRef} className="mb-20 max-w-3xl opacity-0">
          <h2
            className="text-3xl sm:text-6xl md:text-7xl font-normal leading-[1.1] text-white tracking-tight"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Find Your <strong className="font-black text-white block mt-2">Codeissance Club</strong>
          </h2>

        </div>

        {/* Content Layout: Sponsors Full Width */}
        <div ref={gridRef} className="w-full overflow-hidden py-10 opacity-0">
          <LogoLoop
            logos={[
              { src: "/sponsors/sponsor-1.svg", alt: "Sponsor 1" },
              { src: "/sponsors/sponsor-2.svg", alt: "Sponsor 2" },
              { src: "/sponsors/sponsor-3.svg", alt: "Sponsor 3" },
              { src: "/sponsors/sponsor-4.svg", alt: "Sponsor 4" }
            ]}
            speed={50}
            direction="left"
            logoHeight={100}
            gap={32}
          />
        </div>
      </div>
    </section>
  );
}
