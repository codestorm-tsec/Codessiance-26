"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TIMELINE_EVENTS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const markersContainerRef = useRef<HTMLDivElement>(null);

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

      // Desktop: Scrub-linked playhead animation
      const track = trackRef.current;
      const playhead = playheadRef.current;
      const fill = fillRef.current;
      const markers = markersContainerRef.current?.querySelectorAll(".timeline-marker");

      if (track && playhead && fill && markers && markers.length > 0) {
        // Scrub timeline tied to section scroll
        const scrubTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 20%",
            end: "bottom 80%",
            scrub: 1,
          },
        });

        // Animate playhead position and fill width
        scrubTl.to(playhead, { left: "100%", ease: "none", duration: 1 });
        scrubTl.to(fill, { width: "100%", ease: "none", duration: 1 }, 0);

        // Stagger marker reveals tied to scroll progress
        markers.forEach((marker, index) => {
          const progress = index / (markers.length - 1);
          const dot = marker.querySelector(".marker-dot");
          const info = marker.querySelector(".marker-info");

          scrubTl.fromTo(
            dot,
            { scale: 0.5, backgroundColor: "#000" },
            {
              scale: 1.5,
              backgroundColor: "#1ED760",
              duration: 0.05,
              ease: "power2.out",
            },
            progress * 0.95
          );

          scrubTl.fromTo(
            info,
            { opacity: 0.3, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.05,
              ease: "power2.out",
            },
            progress * 0.95
          );
        });
      }

      // Mobile: simple stagger reveal
      const mobileMarkers = sectionRef.current?.querySelectorAll(
        ".timeline-marker-mobile"
      );
      if (mobileMarkers) {
        gsap.fromTo(
          mobileMarkers,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
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
      id="timeline"
      className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-flat-pink text-black border-b-8 border-black"
    >
      {/* Waveform SVG texture */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.08]">
        <svg
          viewBox="0 0 1200 200"
          className="w-full max-w-[1600px] h-auto"
          preserveAspectRatio="none"
        >
          {Array.from({ length: 80 }).map((_, i) => {
            const exactHeight = Math.max(4, 20 + Math.sin(i * 0.4) * 40 + Math.cos(i * 0.7) * 30);
            const height = Number(exactHeight.toFixed(2));
            const y = Number((100 - height / 2).toFixed(2));
            return (
              <rect
                key={i}
                x={i * 15}
                y={y}
                width={8}
                height={height}
                fill="black"
              />
            );
          })}
        </svg>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div ref={headerRef} className="mb-24 text-center opacity-0">
          <p
            className="text-lg uppercase tracking-[0.3em] font-bold mb-3 border-4 border-black inline-block px-4 py-1 bg-white shadow-[4px_4px_0_0_#000]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Minutes Listened
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase mt-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            24 Hours of
            <br />
            <span className="text-flat-yellow [-webkit-text-stroke:2px_black] md:[-webkit-text-stroke:4px_black]">Pure Code</span>
          </h2>
        </div>

        {/* Desktop: horizontal track with scrub-linked playhead */}
        <div className="hidden md:block">
          {/* Track line */}
          <div ref={trackRef} className="relative h-4 bg-black rounded-full mx-8 mb-16 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]">
            {/* Fill */}
            <div
              ref={fillRef}
              className="absolute inset-y-0 left-0 bg-flat-green rounded-full"
              style={{ width: "0%" }}
            />
            {/* Playhead dot */}
            <div
              ref={playheadRef}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full border-4 border-black z-10"
              style={{ left: "0%" }}
            />

            {/* Marker dots on the track */}
            {TIMELINE_EVENTS.map((event, index) => {
              const position = (index / (TIMELINE_EVENTS.length - 1)) * 100;
              return (
                <div
                  key={`dot-${event.id}`}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black"
                  style={{ left: `${position}%` }}
                />
              );
            })}
          </div>

          {/* Milestone markers below track */}
          <div ref={markersContainerRef} className="grid grid-cols-5 gap-x-4 gap-y-8">
            {TIMELINE_EVENTS.map((event, index) => (
              <div
                key={event.id}
                className="timeline-marker flex flex-col items-center text-center group"
              >
                {/* Marker dot */}
                <div className="marker-dot w-6 h-6 rounded-full bg-black mb-4 border-4 border-black transition-all shadow-[2px_2px_0_0_#000]" />

                {/* Info */}
                <div className="marker-info opacity-50 transition-opacity">
                  <span className="text-sm uppercase font-bold text-black/60 block mb-1">
                    Day {event.day}
                  </span>
                  <span
                    className="text-2xl lg:text-3xl font-black text-black block mb-1 uppercase"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {event.time}
                  </span>
                  <span
                    className="text-base font-bold text-black leading-tight block"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {event.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden">
          <div className="relative ml-8">
            <div className="absolute top-0 bottom-10 left-[-4px] w-2 bg-black rounded-full" />
            {TIMELINE_EVENTS.map((event, index) => {
              return (
                <div
                  key={event.id}
                  className="timeline-marker-mobile relative flex gap-6 pb-12 opacity-0"
                >
                  <div className="flex flex-col items-center absolute left-[-11px] top-1">
                    <div className="w-6 h-6 rounded-full bg-flat-yellow border-4 border-black shrink-0 z-10" />
                  </div>
                  <div className="ml-4">
                    <span className="text-xs uppercase font-bold text-black/60">
                      Day {event.day}
                    </span>
                    <div className="flex flex-col mt-1">
                      <span
                        className="text-3xl font-black text-black uppercase"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {event.time}
                      </span>
                      <span
                        className="text-lg font-bold text-black mt-1"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {event.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
