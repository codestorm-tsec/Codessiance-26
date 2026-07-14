"use client";

import { useRef, useEffect } from "react";
import { Trophy, Medal, Award, Sparkles, type LucideIcon } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Starburst } from "@/components/ui/Starburst";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PrizeCard {
  rank: number;
  label: string;
  domain: string;
  amount: string;
  icon: LucideIcon;
  bgColor: string;
}

const prizes: PrizeCard[] = [
  { rank: 3, label: "#3", domain: "Industry Track", amount: "₹20,000", icon: Award, bgColor: "bg-flat-blue" },
  { rank: 2, label: "#2", domain: "AI / ML", amount: "₹20,000", icon: Medal, bgColor: "bg-flat-orange" },
  { rank: 1, label: "#1", domain: "Web / App", amount: "₹20,000", icon: Trophy, bgColor: "bg-flat-pink" },
];

/**
 * Creates a confetti burst of particles using GSAP
 */
function createConfettiBurst(container: HTMLElement) {
  const colors = ["#F037A5", "#FFCC00", "#FF6437", "#1ED760", "#536AE2"];
  const particles = 40;

  for (let i = 0; i < particles; i++) {
    const particle = document.createElement("div");
    const size = Math.random() * 12 + 8;
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border: 2px solid black;
      border-radius: ${Math.random() > 0.5 ? "50%" : "0%"};
      top: 50%;
      left: 50%;
      pointer-events: none;
      z-index: 30;
    `;

    container.appendChild(particle);

    const angle = (Math.PI * 2 * i) / particles + (Math.random() - 0.5) * 0.5;
    const velocity = 150 + Math.random() * 200;
    const rotation = Math.random() * 720 - 360;

    gsap.to(particle, {
      x: Math.cos(angle) * velocity,
      y: Math.sin(angle) * velocity - 100, // bias upward
      rotation: rotation,
      opacity: 0,
      scale: 0,
      duration: 1.5 + Math.random() * 1,
      ease: "power2.out",
      onComplete: () => particle.remove(),
    });
  }
}

export default function TopArtist() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const grandPrizeRef = useRef<HTMLDivElement>(null);
  const confettiFired = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        }
      );

      // Prize cards stagger
      const cards = cardsRef.current?.querySelectorAll(".prize-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 100, rotation: 5 },
          {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Confetti burst on #1 card — once only
      if (grandPrizeRef.current) {
        ScrollTrigger.create({
          trigger: grandPrizeRef.current,
          start: "top 70%",
          once: true,
          onEnter: () => {
            if (!confettiFired.current && grandPrizeRef.current) {
              confettiFired.current = true;
              createConfettiBurst(grandPrizeRef.current);
            }
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="prizes"
      className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-flat-yellow text-black border-y-8 border-black"
    >
      <div className="absolute top-20 left-10 z-0">
        <Starburst points={12} innerRadius={60} outerRadius={120} className="w-80 h-80 text-white opacity-40 spin-slow mix-blend-overlay" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div ref={headerRef} className="mb-24 text-center opacity-0">
          <p
            className="text-lg uppercase tracking-[0.3em] font-bold mb-3 border-4 border-black inline-block px-4 py-1 bg-white shadow-[4px_4px_0_0_#000]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Top Artist of the Year
          </p>
          <h2
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase mt-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The Grand
            <br />
            Prize Pool
          </h2>
          <div className="mt-8 inline-flex items-center justify-center gap-4 bg-black text-white px-8 py-3 border-4 border-black shadow-[6px_6px_0_0_#F037A5] rotate-2">
            <Sparkles className="w-8 h-8 text-flat-yellow" />
            <span
              className="text-3xl md:text-4xl font-black"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ₹60,000+
            </span>
          </div>
        </div>

        {/* Prize cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-end mt-12">
          {prizes.map((prize) => {
            const isGrandPrize = prize.rank === 1;
            const IconComp = prize.icon;

            return (
              <div
                key={prize.rank}
                ref={isGrandPrize ? grandPrizeRef : undefined}
                className={`prize-card relative flex flex-col items-center text-center rounded-none overflow-hidden transition-all duration-300 hover:-translate-y-2 border-8 border-black shadow-[16px_16px_0_0_#000] opacity-0 ${
                  isGrandPrize
                    ? `${prize.bgColor} p-10 md:p-14 md:order-2 md:-mb-12 z-10 scale-105`
                    : `${prize.bgColor} p-8 md:p-10`
                } ${prize.rank === 3 ? "md:order-1" : ""} ${
                  prize.rank === 2 ? "md:order-3" : ""
                }`}
              >
                <div
                  className={`flex items-center justify-center rounded-full mb-6 border-4 border-black ${
                    isGrandPrize
                      ? "w-24 h-24 bg-white text-5xl shadow-[6px_6px_0_0_#000]"
                      : "w-16 h-16 bg-white text-3xl shadow-[4px_4px_0_0_#000]"
                  } font-black`}
                >
                  <IconComp
                    className={`${
                      isGrandPrize ? "w-12 h-12" : "w-8 h-8"
                    } text-black`}
                  />
                </div>

                <span
                  className={`font-black text-black/20 mb-2 leading-none ${
                    isGrandPrize ? "text-[8rem] md:text-[10rem] -mt-12 -z-10" : "text-7xl md:text-8xl"
                  }`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {prize.label}
                </span>

                <h3
                  className={`font-black text-black uppercase border-b-4 border-black pb-2 mb-4 w-full ${
                    isGrandPrize ? "text-3xl md:text-4xl" : "text-2xl"
                  }`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {prize.domain}
                </h3>

                <span
                  className={`font-black text-white [-webkit-text-stroke:2px_black] ${
                    isGrandPrize
                      ? "text-6xl md:text-7xl"
                      : "text-4xl md:text-5xl"
                  }`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {prize.amount}
                </span>

                {isGrandPrize && (
                  <div className="absolute top-4 right-4 px-4 py-2 bg-black text-white text-sm font-bold uppercase border-2 border-white rotate-12">
                    Grand Prize
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
