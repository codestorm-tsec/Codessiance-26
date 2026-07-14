"use client";

import { useRef, useEffect } from "react";
import { Globe, Brain, Factory, Play, Users, Trophy } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DOMAINS } from "@/lib/constants";
import { Starburst } from "@/components/ui/Starburst";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, React.ElementType> = {
  Globe: Globe,
  Brain: Brain,
  Factory: Factory,
};

const cardColors = ["bg-flat-yellow", "bg-flat-pink", "bg-flat-blue"];

export default function Genres() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Cards stagger cascade
      const cards = cardsRef.current?.querySelectorAll(".genre-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 100, rotation: -5 },
          {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
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
      className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-flat-orange text-black border-y-8 border-black"
    >
      <div className="absolute top-10 right-10 z-0">
        <Starburst points={10} innerRadius={40} outerRadius={100} className="w-64 h-64 text-flat-pink opacity-80 mix-blend-multiply spin-slow" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div ref={headerRef} className="mb-16 text-center md:text-left opacity-0">
          <p
            className="text-lg uppercase tracking-[0.3em] font-bold mb-3 border-4 border-black inline-block px-4 py-1 bg-white shadow-[4px_4px_0_0_#000]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Your Top Genres
          </p>
          <h2
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase mt-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Pick Your<br/>Track
          </h2>
        </div>

        {/* Domain cards grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-20">
          {DOMAINS.map((domain, idx) => {
            const IconComponent = iconMap[domain.icon] || Globe;
            const bgColor = cardColors[idx % cardColors.length];
            return (
              <div
                key={domain.id}
                className={`genre-card group relative ${bgColor} border-8 border-black shadow-[16px_16px_0_0_#000] p-8 hover:-translate-y-2 hover:translate-x-2 hover:shadow-[8px_8px_0_0_#000] transition-all duration-300 cursor-pointer opacity-0`}
              >
                {/* Icon in a Starburst */}
                <div className="relative w-24 h-24 mb-8 -mt-16 ml-auto mr-auto md:ml-0 md:mr-auto">
                  <Starburst points={8} className="absolute inset-0 w-full h-full text-black" />
                  <IconComponent className="absolute inset-0 m-auto w-10 h-10 text-white z-10" />
                </div>

                {/* Domain name */}
                <h3
                  className="text-4xl md:text-5xl font-black mb-4 uppercase leading-none"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {domain.name}
                </h3>

                {/* Description */}
                <p
                  className="text-black font-bold text-lg mb-8 leading-tight border-t-4 border-black pt-4"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {domain.description}
                </p>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4 text-base font-black uppercase">
                  <span className="flex items-center gap-2 bg-white px-3 py-1 border-2 border-black">
                    <Users className="w-5 h-5" />
                    {domain.teamSlots}
                  </span>
                  <span className="flex items-center gap-2 bg-flat-green px-3 py-1 border-2 border-black">
                    <Trophy className="w-5 h-5" />
                    {domain.prize}
                  </span>
                </div>

                {/* Hover play button overlay */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
