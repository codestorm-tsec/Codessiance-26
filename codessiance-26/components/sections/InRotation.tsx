"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Disc3, Play, Music2, Headphones } from "lucide-react";
import { SPONSORS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function InRotation() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const titleSponsors = SPONSORS.filter((s) => s.tier === "title");
  const poweredBy = SPONSORS.filter((s) => s.tier === "powered-by");
  const partners = SPONSORS.filter((s) => s.tier === "partner");

  const tierSections = [
    { label: "TOP TRACK", sponsors: titleSponsors },
    { label: "FEATURED ARTIST", sponsors: poweredBy },
    { label: "PLAYLIST", sponsors: partners },
  ];

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
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        }
      );

      // Tier blocks stagger
      const tiers = sectionRef.current?.querySelectorAll(".sponsor-tier");
      if (tiers) {
        gsap.fromTo(
          tiers,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.2,
            ease: "back.out(1.2)",
            scrollTrigger: { trigger: tiers[0], start: "top 85%" },
          }
        );
      }

      // Infinite horizontal marquee for partner logos
      const marquee = marqueeRef.current;
      if (marquee) {
        const inner = marquee.querySelector(".marquee-inner") as HTMLElement;
        if (inner) {
          // Prevent duplicate appending on multiple re-renders
          if (!inner.dataset.duplicated) {
            inner.innerHTML += inner.innerHTML;
            inner.dataset.duplicated = "true";
          }

          const marqueeAnim = gsap.to(inner, {
            xPercent: -50,
            duration: 20,
            ease: "none",
            repeat: -1,
          });

          const onEnter = () => marqueeAnim.pause();
          const onLeave = () => marqueeAnim.resume();

          marquee.addEventListener("mouseenter", onEnter);
          marquee.addEventListener("mouseleave", onLeave);

          return () => {
            marquee.removeEventListener("mouseenter", onEnter);
            marquee.removeEventListener("mouseleave", onLeave);
          };
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sponsors"
      className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-flat-blue text-black border-b-8 border-black"
    >
      {/* 🎨 Colorful Spotify Wrapped Ambient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 h-80 w-80 rounded-full bg-flat-pink opacity-25 blur-[120px]" />
        <div className="absolute bottom-10 right-0 h-[28rem] w-[28rem] rounded-full bg-flat-yellow opacity-20 blur-[140px]" />
        <div className="absolute left-1/2 top-1/2 h-[20rem] w-[20rem] rounded-full bg-flat-green opacity-20 blur-[110px]" />

        {/* 🌈 Floating Music Notes */}
        <Music2 className="absolute top-20 left-12 w-16 h-16 opacity-10 blur-sm rotate-12" />
        <Disc3 className="absolute bottom-32 left-20 w-24 h-24 opacity-10 blur-sm -rotate-45" />
        <Headphones className="absolute top-1/3 right-16 w-20 h-20 opacity-10 blur-sm rotate-12" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6">
        {/* 🎵 Section Header */}
        <div ref={headerRef} className="mb-20 text-center opacity-0">
          <div className="inline-flex items-center gap-3 rounded-full border-4 border-black bg-white px-6 py-3 shadow-[6px_6px_0_#000]">
            <Disc3 className="w-5 h-5 animate-spin-slow" />
            <span className="uppercase tracking-[0.35em] font-black">
              IN ROTATION
            </span>
          </div>

          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase mt-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our<br />Sponsors
          </h2>
        </div>

        {/* Sponsor Tiers */}
        <div className="space-y-20">
          {/* TOP TRACK & FEATURED ARTIST — Static Grid */}
          {tierSections
            .filter((t) => t.label !== "PLAYLIST")
            .map((tier) => (
              <div key={tier.label} className="sponsor-tier opacity-0">
                <div className="flex justify-center mb-8">
                  <p
                    className="text-sm uppercase font-black tracking-widest text-black bg-flat-yellow border-2 border-black px-5 py-1.5 rotate-[-2deg] shadow-[3px_3px_0_#000]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {tier.label}
                  </p>
                </div>

                <div
                  className={`grid gap-8 justify-items-center ${
                    tier.label === "TOP TRACK"
                      ? "grid-cols-1 max-w-lg mx-auto"
                      : "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
                  }`}
                >
                  {tier.sponsors.map((sponsor) => (
                    <div
                      key={sponsor.id}
                      className={`group relative overflow-hidden rounded-[32px] border-[6px] border-black bg-white shadow-[10px_10px_0_0_#000] transition-all duration-500 hover:-translate-y-4 hover:rotate-0 hover:scale-[1.03] cursor-pointer w-full flex flex-col items-center justify-center p-8 ${
                        tier.label === "TOP TRACK"
                          ? "min-h-[20rem]"
                          : "min-h-[16rem]"
                      }`}
                    >
                      {/* ✨ Shine Animation */}
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full pointer-events-none z-10" />

                      {/* 🎧 NOW PLAYING Badge */}
                      <div className="absolute left-5 top-5 rounded-full border-2 border-black bg-black px-4 py-1 text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-white">
                        NOW PLAYING
                      </div>

                    

                    
                      {/* 🎵 Sponsor Name */}
                      <span
                        className="text-3xl md:text-4xl font-black leading-none uppercase text-center text-black tracking-tight"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {sponsor.name}
                      </span>

                      {/* 🎼 Fake Track Info */}
                      <p
                        className="mt-3 text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-black/70"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Official Sponsor
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          {/* 🎬 PLAYLIST — Imperfect Rotated Infinite Marquee */}
          <div className="sponsor-tier opacity-0">
            <div className="flex justify-center mb-8">
              <p
                className="text-sm uppercase font-black tracking-widest text-black bg-flat-pink border-2 border-black px-5 py-1.5 rotate-[2deg] shadow-[3px_3px_0_#000]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                PLAYLIST
              </p>
            </div>

            <div
              ref={marqueeRef}
              className="overflow-hidden py-6 rotate-[-2deg] transition-transform duration-300 hover:rotate-0"
            >
              <div className="marquee-inner flex gap-8 w-max">
                {partners.map((sponsor) => (
                  <div
                    key={sponsor.id}
                    className="group relative overflow-hidden rounded-[28px] border-[5px] border-black bg-white shadow-[8px_8px_0_0_#000] transition-all duration-500 hover:-translate-y-2 hover:scale-[1.03] cursor-pointer w-64 h-36 md:w-72 md:h-40 shrink-0 flex flex-col items-center justify-center p-4"
                  >
                    {/* ✨ Shine Animation */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full pointer-events-none z-10" />

                    

                    {/* 💿 Mini Vinyl Graphic */}
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-black border-2 border-white mb-2">
                      <div className="absolute h-7 w-7 rounded-full border border-white/30" />
                      <div className="h-2.5 w-2.5 rounded-full bg-white" />
                    </div>

                    <span
                      className="text-xl md:text-2xl font-black text-center px-2 uppercase leading-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {sponsor.name}
                    </span>

                    <p className="mt-1 text-[10px] font-black uppercase tracking-[0.15em] text-black/60">
                      Partner Track
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
