"use client";

import { useRef, useEffect } from "react";
import { Trophy, Medal, Award, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const prizes = [
  { rank: 1, label: "1st Place", domain: "Grand Winner", amount: "₹30,000", icon: Trophy, color: "#1DB954" },
  { rank: 2, label: "2nd Place", domain: "Runner Up", amount: "₹20,000", icon: Medal, color: "#8B7CFF" },
  { rank: 3, label: "3rd Place", domain: "Second Runner Up", amount: "₹10,000", icon: Award, color: "#FF4632" },
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
      id="prizes"
      className="section-light grain-overlay relative overflow-hidden py-24 md:py-36"
      style={{ backgroundColor: "#EBE6DF" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Editorial Feature Header matching Spotify Section 3 */}
        <div ref={headerRef} className="mb-20 max-w-3xl opacity-0">
          <h2
            className="text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.1] text-black tracking-tight"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Codessiance &apos;26: <strong className="font-black text-black block mt-2">2026’s Global Top Hackers & Prize Pool</strong>
          </h2>

          <div className="mt-8 flex items-center gap-4">
            <a
              href="#sponsors"
              className="pill-btn pill-btn-dark text-xs py-3 px-8 inline-flex"
            >
              READ MORE
            </a>
            <div className="flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full">
              <Sparkles className="w-5 h-5 text-[#1DB954]" />
              <span className="text-sm font-black text-black">₹60,000+ Total Pool</span>
            </div>
          </div>
        </div>

        {/* Prize Pool Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {prizes.map((prize) => {
            const IconComp = prize.icon;
            const isFirst = prize.rank === 1;

            return (
              <div
                key={prize.rank}
                className={`prize-card flex flex-col justify-between rounded-2xl p-8 opacity-0 transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                  isFirst ? "bg-black text-white shadow-2xl border-2 border-black" : "bg-white text-black border border-black/10"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: isFirst ? "rgba(29,185,84,0.2)" : "rgba(0,0,0,0.05)" }}
                    >
                      <IconComp className="w-6 h-6" style={{ color: prize.color }} />
                    </div>
                    <span
                      className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                        isFirst ? "bg-[#1DB954] text-black" : "bg-black/5 text-black"
                      }`}
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
                  <span className="text-xs font-bold uppercase opacity-60">Cash Prize</span>
                  <span
                    className="text-3xl font-black"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: isFirst ? "#1DB954" : prize.color,
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
