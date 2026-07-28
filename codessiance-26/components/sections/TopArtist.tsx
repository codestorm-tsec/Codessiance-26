"use client";

import { useRef, useEffect } from "react";
import { Trophy, Medal, Award, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckeredPattern, ConcentricCircles, VerticalBars } from "@/components/ui/DecorativePatterns";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const prizes = [
  { rank: 1, label: "Web/App Dev", domain: "Web & App Development", amount: "₹20,000", icon: Trophy, color: "#1DB954" },
  { rank: 2, label: "AIML", domain: "Artificial Intelligence & Machine Learning", amount: "₹20,000", icon: Medal, color: "#8B7CFF" },
  { rank: 3, label: "Industry", domain: "Industry Innovation", amount: "₹20,000", icon: Award, color: "#FF4632" },
];

export default function TopArtist() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      const items = cardsRef.current?.querySelectorAll(".prize-card");

      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
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
      id="prizes"
      className="section-light grain-overlay relative overflow-hidden py-24 md:py-36"
      style={{ backgroundColor: "#EBE6DF" }}
    >
      {/* Decorative: Warped Checkered — top left */}
      <div className="absolute -top-[5%] -left-[8%] opacity-[0.06] pointer-events-none scale-125 rotate-[-8deg]">
        <CheckeredPattern
          cols={8}
          rows={12}
          size={50}
          color1="#C8A200"
          color2="transparent"
          warp
        />
      </div>

      {/* Decorative: Concentric Circles — bottom right */}
      <div className="absolute -bottom-[25%] -right-[20%] w-[50vw] h-[50vw] md:w-[35vw] md:h-[35vw] opacity-[0.06] pointer-events-none">
        <ConcentricCircles
          size={700}
          rings={10}
          baseColor="#C8A200"
          altColor="#EBE6DF"
          highlightRing={2}
          highlightColor="#1DB954"
        />
      </div>

      {/* Decorative: Vertical Bars — right edge */}
      <div className="absolute top-1/2 -translate-y-1/2 right-6 opacity-10 pointer-events-none hidden lg:block rotate-90">
        <VerticalBars bars={4} color="#1A1A1A" className="h-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div ref={headerRef} className="mb-20 max-w-3xl opacity-0">
          <h2
            className="text-3xl sm:text-6xl md:text-7xl font-normal leading-[1.1] text-black tracking-tight"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Codeissance &apos;26:
            <strong className="font-black text-black block mt-2">
              2026’s Global Hackathon Categories & Prize Pool
            </strong>
          </h2>

          <div className="mt-8 flex items-center gap-4">
           
            <div className="flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full">
              <Sparkles className="w-5 h-5 text-[#1DB954]" />
              <span className="text-sm font-black text-black">
                ₹60,000+ Total Pool
              </span>
            </div>
          </div>
        </div>

        {/* Prize Pool Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
        >
          {prizes.map((prize) => {
            const IconComp = prize.icon;

            return (
              <div
                key={prize.rank}
                className="prize-card flex flex-col justify-between rounded-2xl p-8 opacity-0 transition-all duration-300 hover:scale-[1.02] cursor-pointer bg-white text-black border border-black/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: "rgba(0,0,0,0.05)",
                      }}
                    >
                      <IconComp
                        className="w-6 h-6"
                        style={{ color: prize.color }}
                      />
                    </div>

                    <span
                      className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-black/5 text-black"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {prize.label}
                    </span>
                  </div>

                  <h3
                    className="text-2xl font-black mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {prize.domain}
                  </h3>
                </div>

                <div className="mt-12 pt-6 border-t border-current/10 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase opacity-60">
                    Cash Prize
                  </span>

                  <span
                    className="text-3xl font-black"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: prize.color,
                    }}
                  >
                    {prize.amount}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}