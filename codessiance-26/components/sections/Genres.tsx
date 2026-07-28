"use client";

import { useRef, useEffect, useState } from "react";
import {
  Globe,
  Brain,
  Factory,
  Users,
  Trophy,
  Headphones,
  X,
  Play,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import { DOMAINS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Brain,
  Factory,
};

/* CD image per domain */
const cdImages: Record<string, string> = {
  "web-app": "/cd-web-app.png",
  "ai-ml": "/cd-ai-ml.png",
  industry: "/cd-industry.png",
};

/* Accent colors per domain */
const domainAccents: Record<string, { bg: string; glow: string; text: string }> = {
  "web-app": { bg: "#6C63FF", glow: "rgba(108,99,255,0.4)", text: "#C4BFFF" },
  "ai-ml": { bg: "#FF6B9D", glow: "rgba(255,107,157,0.4)", text: "#FFB8D0" },
  industry: { bg: "#1DB954", glow: "rgba(29,185,84,0.4)", text: "#7EE8A5" },
};

export default function Genres() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeDomain, setActiveDomain] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        }
      );

      const cards = cardsRef.current?.querySelectorAll(".cd-case");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 100, scale: 0.85 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.2,
            ease: "back.out(1.4)",
            scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Lock body scroll when detail panel is open */
  useEffect(() => {
    if (activeDomain) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeDomain]);

  const activeDomainData = DOMAINS.find((d) => d.id === activeDomain);

  return (
    <section
      ref={sectionRef}
      id="genres"
      className="relative overflow-hidden py-24 md:py-36"
      style={{ backgroundColor: "#1a1a1a" }}
    >


      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-24 text-center opacity-0 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1DB954]/30 bg-[#1DB954]/10 px-5 py-2 mb-8">
            <Headphones className="h-4 w-4 text-[#1DB954]" />
            <span
              className="font-bold text-[#1DB954] text-sm tracking-wide"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Curated for you
            </span>
          </div>

          <h2
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Find your
            <br />
            <span className="relative inline-block italic text-transparent" style={{ WebkitTextStroke: "2px white", WebkitTextFillColor: "transparent" }}>
              favourite
            </span>{" "}
            <span className="relative inline-block">
              track
              <span
                className="absolute -bottom-1 left-0 -z-10 h-4 w-full"
                style={{ background: "#1DB954", transform: "rotate(-2deg)" }}
              />
            </span>
          </h2>

          <p
            className="mt-10 mx-auto max-w-md text-base md:text-lg text-white/50 font-medium"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Every builder has a genre. Pick a CD below to discover your next big hit.
          </p>
        </div>

        {/* CD Cases Grid */}
        <div
          ref={cardsRef}
          className="grid gap-12 md:gap-16 grid-cols-1 md:grid-cols-3 justify-items-center"
        >
          {DOMAINS.map((domain) => {
            const accent = domainAccents[domain.id];
            return (
              <div key={domain.id} className="cd-case opacity-0">
                {/* Domain label */}
                <p
                  className="text-center mb-4 text-sm font-bold uppercase tracking-[0.3em]"
                  style={{ color: accent.text, fontFamily: "var(--font-body)" }}
                >
                  {domain.name}
                </p>

                {/* The CD holder */}
                <button
                  onClick={() => setActiveDomain(domain.id)}
                  className="cd-holder-btn group relative block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1DB954] rounded-2xl"
                  aria-label={`View details for ${domain.name}`}
                >
                  {/* Glow behind the case */}
                  <div
                    className="absolute rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-[60px] -z-10"
                    style={{
                      background: accent.glow,
                      top: "10%",
                      left: "5%",
                      width: "90%",
                      height: "80%",
                    }}
                  />

                  {/* CD Case container */}
                  <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] transition-transform duration-500 group-hover:scale-[1.04]">
                    {/* The CD disc (sits behind the case) */}
                    <div
                      className="absolute flex items-center justify-center z-0"
                      style={{
                        top: "6%",
                        left: "6%",
                        width: "88%",
                        height: "88%",
                      }}
                    >
                      <div className="w-full h-full rounded-full overflow-hidden transition-transform duration-[3s] ease-linear group-hover:rotate-[360deg]">
                        <Image
                          src={cdImages[domain.id]}
                          alt={`${domain.name} CD`}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover rounded-full"
                          draggable={false}
                        />
                      </div>
                    </div>

                    {/* The transparent CD case overlay */}
                    <div className="absolute inset-0 z-10">
                      <Image
                        src="/cd.png"
                        alt="CD Case"
                        width={400}
                        height={400}
                        className="w-full h-full object-contain"
                        style={{
                          filter: "drop-shadow(4px 8px 16px rgba(0,0,0,0.5))",
                        }}
                        draggable={false}
                      />
                    </div>

                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 z-20 rounded-2xl overflow-hidden pointer-events-none">
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    </div>
                  </div>

                  {/* Click hint */}
                  <p className="text-center mt-4 text-xs text-white/30 group-hover:text-white/60 transition-colors duration-300 font-medium tracking-wider uppercase">
                    Click to explore →
                  </p>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          Domain Detail Modal / Overlay
         ══════════════════════════════════════════ */}
      {activeDomainData && (() => {
        const accent = domainAccents[activeDomainData.id];
        return (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            onClick={() => setActiveDomain(null)}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              style={{ animation: "fadeIn 0.3s ease-out forwards" }}
            />

            {/* Modal Content */}
            <div
              className="relative z-10 mx-4 w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
              style={{ animation: "modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
            >
              {/* Close button */}
              <button
                onClick={() => setActiveDomain(null)}
                className="absolute -top-12 right-0 flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm cursor-pointer"
              >
                <span className="hidden md:inline">ESC</span>
                <X className="h-5 w-5" />
              </button>

              <div
                className="rounded-3xl border border-white/10 p-8 md:p-12 overflow-hidden relative"
                style={{
                  background: `linear-gradient(145deg, ${accent.bg}15 0%, #1a1a1a 40%, #111 100%)`,
                }}
              >
                {/* Decorative glow */}
                <div
                  className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-[100px] opacity-30"
                  style={{ background: accent.bg }}
                />

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
                  {/* CD artwork */}
                  <div className="flex-shrink-0 relative w-40 h-40 md:w-48 md:h-48">
                    <div
                      className="w-full h-full rounded-full overflow-hidden border-2"
                      style={{
                        borderColor: accent.bg + "40",
                        animation: "cdSpin 8s linear infinite",
                      }}
                    >
                      <Image
                        src={cdImages[activeDomainData.id]}
                        alt={activeDomainData.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Center hole overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-5 h-5 rounded-full bg-[#111] border border-white/10" />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 text-center md:text-left">
                    <p
                      className="text-xs font-bold uppercase tracking-[0.4em] mb-2"
                      style={{ color: accent.text }}
                    >
                      DOMAIN
                    </p>

                    <h3
                      className="text-3xl md:text-4xl font-black text-white uppercase leading-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {activeDomainData.name}
                    </h3>

                    <p
                      className="mt-4 text-white/60 text-base leading-relaxed"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {activeDomainData.description}
                    </p>

                    {/* Stats */}
                    <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                      <div
                        className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold"
                        style={{
                          backgroundColor: accent.bg + "20",
                          color: accent.text,
                          border: `1px solid ${accent.bg}30`,
                        }}
                      >
                        <Users className="h-4 w-4" />
                        <span>{activeDomainData.teamSlots}</span>
                      </div>

                      <div className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold bg-[#1DB954]/20 text-[#7EE8A5] border border-[#1DB954]/30">
                        <Trophy className="h-4 w-4" />
                        <span>{activeDomainData.prize}</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-8">
                      <a
                        href="#outro"
                        onClick={() => setActiveDomain(null)}
                        className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
                        style={{
                          backgroundColor: accent.bg,
                          color: "#000",
                        }}
                      >
                        Register Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes cdSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
