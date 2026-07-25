"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TIMELINE_EVENTS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ACCENT_COLORS = [
  "#1DB954", "#8B7CFF", "#FF4632", "#1DB954",
  "#8B7CFF", "#FF4632", "#1DB954", "#8B7CFF",
  "#FF4632", "#1DB954",
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
        start: "top top+=64", // Pin right below 64px HeaderNav
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
      {/* Pinned Stage Container */}
      <div
        ref={pinTargetRef}
        className="w-full h-[calc(100vh-4rem)] flex flex-col justify-between pt-6 pb-8 px-6 md:px-12"
      >
        {/* Top Header */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2
              className="text-3xl sm:text-5xl md:text-6xl font-normal leading-tight text-black tracking-tight"
              style={{ fontFamily: "var(--font-body)" }}
            >
              The <strong className="font-black text-black">Top Lists</strong> of 2026
            </h2>
            <p className="mt-1 text-sm md:text-base font-bold text-black/60">
              24 Hours of Non-stop Innovation & Code
            </p>
          </div>

          <a
            href="#prizes"
            className="pill-btn pill-btn-outline text-xs py-2.5 px-6 shrink-0"
          >
            READ MORE
          </a>
        </div>

        {/* Center Event Card Stage */}
        <div className="relative z-10 max-w-2xl mx-auto w-full my-auto flex items-center justify-center">
          <div
            ref={cardRef}
            key={activeIndex}
            className="w-full rounded-2xl overflow-hidden shadow-2xl relative p-8 md:p-10"
            style={{
              backgroundColor: accent,
              border: "2px solid #000",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-4xl">{icon}</span>
              <span
                className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-black text-white rounded-full"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Day {event.day} • Event {activeIndex + 1} of {TOTAL}
              </span>
            </div>

            <div
              className="text-5xl sm:text-7xl font-black text-black tracking-tighter mb-3 leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {event.time}
            </div>

            <div
              className="text-2xl sm:text-3xl font-extrabold text-black leading-snug"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {event.label}
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
