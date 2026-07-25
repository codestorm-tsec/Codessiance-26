"use client";

import { useRef, useEffect } from "react";
import { Globe, Brain, Factory } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DOMAINS } from "@/lib/constants";
import { DotGrid, LineScribble } from "@/components/ui/DecorativePatterns";
import { TopGenresCard } from "@/components/ui/WrappedStoryCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Brain,
  Factory,
};

export default function Genres() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 75%" },
        }
      );

      const cards = cardsRef.current?.querySelectorAll(".genre-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 75%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="genres"
      className="section-dark grain-overlay relative overflow-hidden py-24 md:py-36"
      style={{ backgroundColor: "#1A1A1A" }}
    >
      {/* Polka Dots Grid */}
      <div className="absolute top-12 right-12 pointer-events-none opacity-40">
        <DotGrid rows={5} cols={8} dotSize={22} gap={14} color="#FFFFFF" />
      </div>

      {/* Scribble on bottom left */}
      <div className="absolute bottom-6 left-6 pointer-events-none opacity-20">
        <LineScribble className="w-64 h-64" color="#FFFFFF" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Editorial Feature Header */}
        <div ref={headerRef} className="mb-20 max-w-3xl opacity-0">
          <h2
            className="text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.1] text-white tracking-tight"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Here’s What’s In Store for Your{" "}
            <strong className="font-black text-white block mt-2">
              Codessiance &apos;26
            </strong>
          </h2>

          <div className="mt-8">
            <a
              href="#timeline"
              className="pill-btn pill-btn-light text-xs py-3 px-8 inline-flex"
            >
              READ MORE
            </a>
          </div>
        </div>

        {/* Content Layout: Tracks + Figma Story Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Domain Cards (7 cols) */}
          <div className="lg:col-span-7 grid gap-6">
            {DOMAINS.map((domain) => {
              const Icon = iconMap[domain.icon] || Globe;

              return (
                <div
                  key={domain.id}
                  className="genre-card group relative overflow-hidden rounded-xl p-6 opacity-0 transition-all duration-300 hover:scale-[1.01] cursor-pointer flex items-start gap-5"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 mt-1"
                    style={{ background: "rgba(29,185,84,0.15)" }}
                  >
                    <Icon className="w-6 h-6" style={{ color: "#1DB954" }} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3
                        className="text-xl font-black text-white"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {domain.name}
                      </h3>
                      <span className="text-xs font-bold text-[#1DB954]">{domain.prize}</span>
                    </div>

                    <p
                      className="text-sm leading-relaxed text-white/60 mb-4"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {domain.description}
                    </p>

                    <span className="text-xs font-bold text-white/40">{domain.teamSlots}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Figma Wrapped Mobile Story Cards Showcase (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <TopGenresCard
              title="My Top Genres"
              genres={[
                { rank: 1, name: "Web / App Dev" },
                { rank: 2, name: "AI / ML Innovation" },
                { rank: 3, name: "Industry Track" },
                { rank: 4, name: "Cybersecurity" },
                { rank: 5, name: "Cloud & DevOps" },
              ]}
              theme="cream"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
