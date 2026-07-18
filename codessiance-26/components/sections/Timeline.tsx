"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TIMELINE_EVENTS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

// Pre-computed to avoid SSR hydration mismatch
const WAVEFORM_BARS = Array.from({ length: 60 }).map((_, i) => ({
  x: i * 20,
  y: Math.round((100 - Math.max(4, 20 + Math.sin(i * 0.4) * 40 + Math.cos(i * 0.7) * 30) / 2) * 100) / 100,
  h: Math.round(Math.max(4, 20 + Math.sin(i * 0.4) * 40 + Math.cos(i * 0.7) * 30) * 100) / 100,
}));

export default function Timeline() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeEvent = TIMELINE_EVENTS[activeIndex];
  const accent = ACCENT_COLORS[activeIndex];

  useEffect(() => {
    const slider = sliderRef.current;
    const wrapper = wrapperRef.current;
    if (!slider || !wrapper) return;

    const ctx = gsap.context(() => {
      // Classic GSAP horizontal scroll — pin the wrapper, slide the strip
      gsap.to(slider, {
        x: () => -(slider.scrollWidth - wrapper.offsetWidth),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${slider.scrollWidth - wrapper.offsetWidth}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              TIMELINE_EVENTS.length - 1,
              Math.round(self.progress * (TIMELINE_EVENTS.length - 1))
            );
            setActiveIndex(idx);
          },
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" className="border-b-8 border-black">
      {/* ── Pinned wrapper — exactly one viewport tall ─────────────── */}
      <div
        ref={wrapperRef}
        className="relative h-screen overflow-hidden flex flex-col bg-flat-pink"
      >
        {/* Waveform BG */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.07] z-0">
          <svg viewBox="0 0 1200 200" className="w-full h-full" preserveAspectRatio="none">
            {WAVEFORM_BARS.map((b, i) => (
              <rect key={i} x={b.x} y={b.y} width={10} height={b.h} fill="black" />
            ))}
          </svg>
        </div>

        {/* ── TOP: Header (fixed inside pinned area) ────────────────── */}
        <div className="relative z-30 pt-7 pb-3 px-8 shrink-0">
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

        {/* ── MIDDLE: Slider — cards are 100vw each so only 1 shows ── */}
        <div className="relative z-20 flex-1 flex items-stretch overflow-visible">
          <div
            ref={sliderRef}
            className="flex will-change-transform"
            style={{ width: "max-content" }}
          >
            {TIMELINE_EVENTS.map((event, index) => {
              const ac = ACCENT_COLORS[index];
              const icon = EVENT_ICONS[event.id] ?? "⚡";

              return (
                <div
                  key={event.id}
                  className="shrink-0 flex items-center justify-center px-8"
                  style={{ width: "100vw" }}
                >
                  <div
                    className="w-full max-w-lg border-4 border-black shadow-[10px_10px_0_0_#000] overflow-hidden relative"
                    style={{ backgroundColor: ac.bg }}
                  >
                    {/* Large background number */}
                    <div
                      className="absolute top-0 right-2 text-[8rem] font-black leading-none opacity-10 select-none pointer-events-none"
                      style={{ fontFamily: "var(--font-display)", color: ac.text }}
                      aria-hidden
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="relative p-8">
                      <div className="text-5xl mb-4">{icon}</div>
                      <div
                        className="text-6xl md:text-7xl font-black tracking-tighter leading-none mb-2"
                        style={{ fontFamily: "var(--font-display)", color: ac.text }}
                      >
                        {event.time}
                      </div>
                      <div
                        className="text-xl md:text-2xl font-bold leading-snug"
                        style={{ color: ac.text, fontFamily: "var(--font-body)" }}
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
              );
            })}

            {/* Final "That's a Wrap" card */}
            <div
              className="shrink-0 flex items-center justify-center px-8"
              style={{ width: "100vw" }}
            >
              <div className="w-full max-w-lg border-4 border-black shadow-[10px_10px_0_0_#000] bg-black p-10 flex flex-col items-center justify-center text-center">
                <span className="text-6xl mb-4">🏁</span>
                <p
                  className="text-4xl font-black uppercase text-flat-green leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  That&apos;s a Wrap!
                </p>
                <p
                  className="text-sm font-bold text-white/50 mt-3"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Codessiance &apos;26
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM: Progress rail + Info box ─────────────────────── */}
        <div className="relative z-30 px-6 pb-5 shrink-0">
          {/* Dot progress rail */}
          <div className="relative h-2 bg-black/25 border-2 border-black mb-4">
            <div
              className="absolute inset-y-0 left-0 bg-black transition-none"
              style={{
                width: `${(activeIndex / TIMELINE_EVENTS.length) * 100}%`,
              }}
            />
            {TIMELINE_EVENTS.map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-black z-10 transition-colors duration-200"
                style={{
                  left: `${(i / TIMELINE_EVENTS.length) * 100}%`,
                  backgroundColor: i <= activeIndex ? "#000" : "#fff",
                }}
              />
            ))}
          </div>

          {/* Info text box */}
          <div className="border-4 border-black shadow-[6px_6px_0_0_#000] bg-white p-4 flex items-center gap-5">
            <span className="text-4xl shrink-0">
              {EVENT_ICONS[activeEvent?.id] ?? "🏁"}
            </span>
            <div className="flex-1 min-w-0">
              <p
                className="text-xs font-black uppercase tracking-widest text-black/40 mb-0.5"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Day {activeEvent?.day ?? "—"} · Event {activeIndex + 1} of {TIMELINE_EVENTS.length}
              </p>
              <p
                className="text-xl font-black leading-tight truncate"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {activeEvent?.time}
                <span
                  className="ml-3 text-base font-bold text-black/70"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {activeEvent?.label}
                </span>
              </p>
            </div>
            <div className="shrink-0 hidden sm:flex flex-col items-end">
              <p
                className="text-xs font-bold text-black/40 uppercase tracking-widest"
                style={{ fontFamily: "var(--font-body)" }}
              >
                scroll ↓
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
