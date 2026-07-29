"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { TIMELINE_EVENTS } from "@/lib/constants";
import { ConcentricCircles, VerticalBars, DotGrid } from "@/components/ui/DecorativePatterns";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ACCENT_COLORS = [
  "#1DB954", "#8B7CFF", "#FF4632", "#1DB954",
  "#8B7CFF", "#FF4632", "#1DB954", "#8B7CFF",
  "#FF4632", "#1DB954",
];

const EVENT_ICONS: Record<string, string> = {
  reporting: "📝",
  inauguration: "🎤",
  "hack-start": "🚀",
  lunch: "🍕",
  mentoring: "💡",
  dinner: "🌙",
  "judging-internal": "⚖️",
  shortlist: "📋",
  "judging-final": "🏆",
  closing: "🎉",
};

const TOTAL = TIMELINE_EVENTS.length;

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
    );
  }, [activeIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top", // Pin exactly at the top of the viewport
        end: `+=${TOTAL * 400}`, // Scroll distance for cycling all timeline cards
        pin: pinTargetRef.current,
        pinSpacing: true,
        scrub: 0.2,
        onUpdate: (self) => {
          const idx = Math.min(TOTAL - 1, Math.floor(self.progress * TOTAL));
          setActiveIndex(idx);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const event = TIMELINE_EVENTS[activeIndex];
  const accent = ACCENT_COLORS[activeIndex];
  const icon = EVENT_ICONS[event.id] ?? "⚡";

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative section-light grain-overlay"
      style={{ backgroundColor: "#EBE6DF" }}
    >
      {/* Decorative: Concentric Circles bottom-right */}
      <div className="absolute -bottom-[20%] -right-[15%] w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] opacity-[0.07] pointer-events-none">
        <ConcentricCircles size={800} rings={12} baseColor="#1DB954" altColor="#EBE6DF" highlightRing={3} highlightColor="#8B7CFF" />
      </div>

      {/* Decorative: Vertical Bars top-left */}
      <div className="absolute top-12 left-8 opacity-15 pointer-events-none hidden md:block">
        <VerticalBars bars={5} color="#1A1A1A" className="h-28" />
      </div>

      {/* Decorative: Dot Grid bottom-left */}
      <div className="absolute bottom-8 left-12 opacity-10 pointer-events-none hidden lg:block">
        <DotGrid rows={3} cols={5} dotSize={16} gap={10} color="#1A1A1A" />
      </div>

      {/* Pinned Stage Container */}
      <div
        ref={pinTargetRef}
        className="w-full h-screen flex flex-col justify-between pt-6 pb-8 px-6 md:px-12 relative"
      >

        {/* Top Header */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2
              className="text-2xl sm:text-5xl md:text-6xl font-normal leading-tight text-black tracking-tight"
              style={{ fontFamily: "var(--font-body)" }}
            >
              The <strong className="font-black text-black">Top Lists</strong> of 2026
            </h2>
          </div>

        </div>

        {/* Center Event Card Stage */}
        <div className="relative z-10 max-w-2xl mx-auto w-full my-auto flex items-center justify-center">
          <div
            ref={cardRef}
            key={activeIndex}
            className="w-[90%] sm:w-[85%] max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative"
            style={{
              border: "2px solid #000",
            }}
          >
            {/* Background Images (pre-rendered for smooth scroll) */}
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <Image
                key={num}
                src={`/timelinecards/card${num}.png`}
                alt={`Timeline Background ${num}`}
                fill
                priority={num === 1 || num === 2}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`object-cover transition-opacity duration-300 ${
                  ((activeIndex % 6) + 1) === num ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {/* Inner Content Overlay */}
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">
              {/* Top Row: Icon + Day Badge */}
              <div className="flex items-start justify-end">

              </div>

              {/* Event Time (Positioned in the colored stripe) */}
              <div className="absolute bottom-[34%] left-0 w-full px-4 md:px-8 text-center">
                <div
                  className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "#EAE5DE",
                    WebkitTextStroke: "1.5px black",
                  }}
                >
                  {event.time}
                </div>
              </div>

              {/* Event Label (Positioned in the black bottom area) */}
              <div className="absolute bottom-[16%] translate-y-[50%] left-0 w-full px-4 text-white text-center">
                <div
                  className={`font-bold uppercase tracking-wide ${event.fontSize || "text-base sm:text-xl md:text-5xl"}`}
                  style={{ fontFamily: event.font || "var(--font-display)" }}
                >
                  {event.label}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="relative z-10 max-w-2xl mx-auto w-full">
          <div className="w-full bg-black/10 h-2 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-black transition-all duration-300"
              style={{ width: `${((activeIndex + 1) / TOTAL) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs font-bold text-black/50 uppercase tracking-widest">
            <span>{event.label}</span>
            <span>Scroll for Next Event ({activeIndex + 1}/{TOTAL}) ↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
