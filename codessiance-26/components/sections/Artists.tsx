"use client";

import { useRef, useEffect } from "react";
import { UserPlus, Music } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CREW_MEMBERS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cardColors = ["bg-flat-pink", "bg-flat-yellow", "bg-flat-orange", "bg-flat-green", "bg-flat-blue"];

export default function Artists() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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
          },
        }
      );

      // Cards stagger
      const cards = gridRef.current?.querySelectorAll(".artist-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.9, rotation: -2 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // CTA block
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="artists"
      className="relative min-h-screen py-24 md:py-32 bg-white text-black overflow-hidden border-b-8 border-black"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div ref={headerRef} className="mb-20 text-center opacity-0">
          <p
            className="text-lg uppercase tracking-[0.3em] font-bold mb-3 border-4 border-black inline-block px-4 py-1 bg-flat-yellow shadow-[4px_4px_0_0_#000]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Featured Artists
          </p>
          <h2
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase mt-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The Crew<br/>Behind<br/>
            <span className="text-white [-webkit-text-stroke:2px_black] md:[-webkit-text-stroke:4px_black]">The Sound</span>
          </h2>
        </div>

        {/* Crew grid */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-24">
          {CREW_MEMBERS.map((member, index) => {
            const accent = cardColors[index % cardColors.length];

            return (
              <div
                key={member.id}
                className="artist-card group flex flex-col items-center text-center p-6 border-4 border-black bg-white shadow-[8px_8px_0_0_#000] hover:-translate-y-2 hover:translate-x-1 hover:shadow-[4px_4px_0_0_#000] transition-all duration-300 opacity-0 cursor-pointer"
              >
                {/* Circular avatar */}
                <div
                  className={`w-24 h-24 md:w-32 md:h-32 rounded-full ${accent} border-4 border-black mb-6 flex items-center justify-center text-black text-3xl md:text-5xl font-black uppercase`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                <h3
                  className="text-xl md:text-2xl font-black text-black uppercase leading-tight mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {member.name}
                </h3>

                <p
                  className="text-sm font-bold text-black border-t-2 border-black pt-2 mb-4 w-full uppercase"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {member.role}
                </p>

                <div className="flex items-center gap-2 text-xs font-black bg-black text-white px-3 py-1 mt-auto uppercase">
                  <Music className="w-3.5 h-3.5" />
                  <span>{member.funStat}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recruitment CTA */}
        <div ref={ctaRef} className="text-center opacity-0 flex justify-center">
          <div className="inline-flex flex-col items-center p-10 md:p-14 border-4 border-black bg-flat-pink shadow-[12px_12px_0_0_#000] max-w-2xl">
            <UserPlus className="w-12 h-12 text-black mb-6" />
            <h3
              className="text-3xl md:text-5xl font-black mb-4 uppercase leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Want to be a Featured Artist?
            </h3>
            <p
              className="text-black font-bold mb-8 max-w-md text-lg"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Join the CodeStorm committee and help produce the next hackathon
              experience.
            </p>
            <button className="flex items-center gap-2 bg-black text-white font-black px-10 py-4 text-xl border-4 border-black hover:bg-white hover:text-black transition-all shadow-[6px_6px_0_0_#000] hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000]">
              <UserPlus className="w-6 h-6" />
              JOIN THE CREW
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
