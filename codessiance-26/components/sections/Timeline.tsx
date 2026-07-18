"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { TIMELINE_EVENTS } from "@/lib/constants";

const ACCENT_COLORS = [
  { bg: "#1ED760", text: "#000" },
  { bg: "#FFCC00", text: "#000" },
  { bg: "#FF6437", text: "#000" },
  { bg: "#536AE2", text: "#fff" },
  { bg: "#F037A5", text: "#fff" },
  { bg: "#1ED760", text: "#000" },
  { bg: "#FFCC00", text: "#000" },
  { bg: "#FF6437", text: "#000" },
  { bg: "#536AE2", text: "#fff" },
  { bg: "#F037A5", text: "#fff" },
];

const EVENT_ICONS: Record<string, string> = {
  reporting: "🎟️",
  inauguration: "🎤",
  "hack-start": "💻",
  lunch: "🍕",
  mentoring: "🧑‍💻",
  dinner: "🌙",
  "judging-internal": "⚖️",
  shortlist: "📋",
  "judging-final": "🏆",
  closing: "🎉",
};

// Pre-computed waveform — avoids SSR/client hydration mismatch
const WAVEFORM_BARS = Array.from({ length: 60 }).map((_, i) => ({
  x: i * 20,
  y: Math.round((100 - Math.max(4, 20 + Math.sin(i * 0.4) * 40 + Math.cos(i * 0.7) * 30) / 2) * 10) / 10,
  h: Math.round(Math.max(4, 20 + Math.sin(i * 0.4) * 40 + Math.cos(i * 0.7) * 30) * 10) / 10,
}));

const TOTAL = TIMELINE_EVENTS.length;

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prevIndexRef = useRef(0);

  // Animate the card changing (fly in from direction of scroll)
  useEffect(() => {
    if (!cardRef.current) return;
    const direction = activeIndex > prevIndexRef.current ? 1 : -1;
    prevIndexRef.current = activeIndex;

    gsap.fromTo(
      cardRef.current,
      { x: 150 * direction, opacity: 0, scale: 0.9, rotation: 5 * direction },
      { x: 0, opacity: 1, scale: 1, rotation: 0, duration: 0.5, ease: "back.out(1.2)" }
    );
  }, [activeIndex]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrolled = -rect.top;
      const scrollable = section.offsetHeight - window.innerHeight;

      if (scrolled <= 0 || scrollable <= 0) {
        setActiveIndex(0);
        return;
      }

      const progress = Math.min(1, scrolled / scrollable);
      const idx = Math.min(TOTAL - 1, Math.floor(progress * TOTAL));

      setActiveIndex((prev) => {
        if (prev !== idx) return idx;
        return prev;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const event = TIMELINE_EVENTS[activeIndex];
  const prevEvent = activeIndex > 0 ? TIMELINE_EVENTS[activeIndex - 1] : null;
  const nextEvent = activeIndex < TOTAL - 1 ? TIMELINE_EVENTS[activeIndex + 1] : null;
  const accent = ACCENT_COLORS[activeIndex];
  const icon = EVENT_ICONS[event.id] ?? "⚡";

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative border-b-8 border-black"
      style={{ height: `${(TOTAL + 1) * 100}vh` }}
    >
      {/* ── Sticky panel — stays in view while you scroll ─────────── */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col bg-flat-pink">

        {/* Waveform BG */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.07] z-0">
          <svg viewBox="0 0 1200 200" className="w-full h-full" preserveAspectRatio="none">
            {WAVEFORM_BARS.map((b, i) => (
              <rect key={i} x={b.x} y={b.y} width={10} height={b.h} fill="black" />
            ))}
          </svg>
        </div>

        {/* ── Header ────────────────────────────────────────────────── */}
        <div className="relative z-10 pt-7 pb-3 px-8 shrink-0">
          <p
            className="text-sm uppercase tracking-[0.3em] font-bold mb-1 border-4 border-black inline-block px-3 py-0.5 bg-white shadow-[4px_4px_0_0_#000]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Minutes Listened
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            24 Hours of{" "}
            <span className="text-flat-yellow [-webkit-text-stroke:2px_black]">
              Pure Code
            </span>
          </h2>
        </div>

        {/* ── Card stage — pops in from left/right ──────────────────── */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-6">
          <div
            ref={cardRef}
            key={activeIndex}
            className="w-full max-w-md border-4 border-black shadow-[10px_10px_0_0_#000] overflow-hidden relative"
            style={{ backgroundColor: accent.bg }}
          >
            {/* Decorative large number */}
            <div
              className="absolute top-0 right-2 text-[8rem] font-black leading-none opacity-10 select-none pointer-events-none"
              style={{ fontFamily: "var(--font-display)", color: accent.text }}
              aria-hidden
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </div>

            <div className="relative p-8">
              <div className="text-5xl mb-4">{icon}</div>
              <div
                className="text-6xl md:text-7xl font-black tracking-tighter leading-none mb-2"
                style={{ fontFamily: "var(--font-display)", color: accent.text }}
              >
                {event.time}
              </div>
              <div
                className="text-xl font-bold leading-snug"
                style={{ color: accent.text, fontFamily: "var(--font-body)" }}
              >
                {event.label}
              </div>
              <span
                className="inline-block mt-4 text-sm font-black uppercase px-3 py-1 bg-black text-white border-2 border-black"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Day {event.day}
              </span>
            </div>
          </div>
        </div>

        {/* ── Bottom: Arc Rail + Info Box ──────────────────────────── */}
        <div className="relative z-10 px-6 pb-5 shrink-0 flex flex-col items-center">
          
          {/* ── Curved Arc Timeline ── */}
          <div className="relative w-full max-w-2xl h-24 sm:h-32 mb-4 overflow-hidden">
            {/* The curved line */}
            <div 
              className="absolute top-10 left-[-20%] w-[140%] h-[1000px] rounded-[50%] border-t-[4px] border-black/20"
            />
            {/* An active glowing part over the top */}
            <div 
              className="absolute top-10 left-[-20%] w-[140%] h-[1000px] rounded-[50%] border-t-[4px] border-flat-green/80 shadow-[0_0_15px_#1ED760]"
              style={{ clipPath: 'polygon(30% 0, 70% 0, 70% 10%, 30% 10%)' }}
            />

            {/* Previous Event Pill */}
            {prevEvent && (
              <div className="absolute left-[10%] sm:left-[15%] top-[70%] -translate-y-1/2 -rotate-12 transition-all duration-300">
                <span 
                  className="px-3 py-1 rounded-full bg-flat-green text-black font-bold border-2 border-black text-xs sm:text-sm uppercase shadow-[2px_2px_0_0_#000]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {prevEvent.time}
                </span>
              </div>
            )}

            {/* Current Event Pill (Top Center) */}
            <div className="absolute left-1/2 top-10 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300">
              <span 
                className="px-6 py-1.5 rounded-full bg-white text-black font-black border-[3px] border-black text-sm sm:text-lg uppercase shadow-[4px_4px_0_0_#000]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {event.time}
              </span>
            </div>

            {/* Next Event Pill */}
            {nextEvent && (
              <div className="absolute right-[10%] sm:right-[15%] top-[70%] -translate-y-1/2 rotate-12 transition-all duration-300">
                <span 
                  className="px-3 py-1 rounded-full bg-flat-green text-black font-bold border-2 border-black text-xs sm:text-sm uppercase shadow-[2px_2px_0_0_#000]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {nextEvent.time}
                </span>
              </div>
            )}
          </div>

          {/* Info text box */}
          <div
            className="border-4 border-black shadow-[6px_6px_0_0_#000] bg-white p-4 flex items-center gap-5 w-full max-w-2xl"
          >
            <span className="text-4xl shrink-0">{icon}</span>
            <div className="flex-1 min-w-0">
              <p
                className="text-xs font-black uppercase tracking-widest text-black/40 mb-0.5"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Day {event.day} · Event {activeIndex + 1} of {TOTAL}
              </p>
              <p
                className="text-xl font-black leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {event.time}
                <span
                  className="ml-3 text-base font-bold text-black/70"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {event.label}
                </span>
              </p>
            </div>
            <p
              className="shrink-0 text-xs font-bold text-black/40 uppercase tracking-widest hidden sm:block"
              style={{ fontFamily: "var(--font-body)" }}
            >
              scroll ↓
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
