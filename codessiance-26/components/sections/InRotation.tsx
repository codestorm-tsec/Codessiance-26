"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SPONSORS } from "@/lib/constants";
import { CheckeredPattern } from "@/components/ui/DecorativePatterns";
import { ClubFavouriteCard } from "@/components/ui/WrappedStoryCard";

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

      const items = gridRef.current?.querySelectorAll(".sponsor-card");
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
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

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Editorial Feature Header matching Spotify Section 4 */}
        <div ref={headerRef} className="mb-20 max-w-3xl opacity-0">
          <h2
            className="text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.1] text-white tracking-tight"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Find Your <strong className="font-black text-white block mt-2">Codessiance Club</strong>
          </h2>

          <div className="mt-8">
            <a
              href="#recap"
              className="pill-btn pill-btn-light text-xs py-3 px-8 inline-flex"
            >
              READ MORE
            </a>
          </div>
        </div>

        {/* Content Layout: Sponsors + Figma Club Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Sponsor Grid (7 cols) */}
          <div ref={gridRef} className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {SPONSORS.map((sponsor) => (
              <div
                key={sponsor.id}
                className="sponsor-card flex items-center justify-center rounded-xl p-6 opacity-0 transition-all duration-300 hover:scale-[1.03] cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  minHeight: "110px",
                }}
              >
                <span
                  className="text-sm font-black text-white uppercase text-center tracking-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {sponsor.name}
                </span>
              </div>
            ))}
          </div>

          {/* Figma Wrapped Club Favourite Story Card (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <ClubFavouriteCard
              percentage="12%"
              title="You're in great company."
              subtitle="of global hackers are in your club."
              items={["AI / ML", "Fullstack", "Web3", "Cloud DevOps"]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
