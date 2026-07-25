"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DotGrid, WavyStripes, ConcentricCircles, CheckeredPattern, VerticalBars } from "@/components/ui/DecorativePatterns";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOC_ITEMS = [
  { label: "Hackathon Domains", href: "#genres" },
  { label: "24-Hour Schedule", href: "#timeline" },
  { label: "Grand Prize Pool", href: "#prizes" },
  { label: "Our Sponsors", href: "#sponsors" },
  { label: "FAQs", href: "#recap" },
  { label: "Register Now", href: "#outro" },
];

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      if (stampRef.current) {
        gsap.to(stampRef.current, {
          rotation: 360,
          duration: 16,
          repeat: -1,
          ease: "none",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="intro"
      className="section-light grain-overlay relative pt-16 pb-28 md:pt-24 md:pb-36 overflow-visible"
      style={{ backgroundColor: "#EBE6DF" }}
    >
      {/* Decorative: Concentric Circles — mid right, flowing from Hero */}
      <div className="absolute -top-[10%] -right-[20%] w-[70vw] h-[70vw] md:w-[45vw] md:h-[45vw] opacity-[0.05] pointer-events-none">
        <ConcentricCircles size={900} rings={12} baseColor="#1DB954" altColor="#EBE6DF" highlightRing={5} highlightColor="#8B7CFF" />
      </div>

      {/* Decorative: Warped Checkered — bottom left */}
      <div className="absolute -bottom-[5%] -left-[8%] opacity-[0.04] pointer-events-none rotate-[6deg] hidden md:block">
        <CheckeredPattern cols={6} rows={8} size={45} color1="#C8A200" color2="transparent" warp />
      </div>

      {/* Decorative: Vertical Bars — right edge */}
      <div className="absolute bottom-[20%] right-8 opacity-[0.08] pointer-events-none hidden lg:block">
        <VerticalBars bars={4} color="#1A1A1A" className="h-24" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Folder Graphic + Contents TOC (5 cols) */}
          <div ref={leftRef} className="lg:col-span-5 opacity-0">
            
            {/* Black Polka Dots Cluster */}
            <div className="mb-6 pointer-events-none">
              <DotGrid rows={4} cols={6} dotSize={22} gap={14} color="#1A1A1A" />
            </div>

            {/* Spotify-style Purple Tabbed Folder Graphic */}
            <div className="relative w-full max-w-sm rounded-t-2xl overflow-hidden shadow-lg border-2 border-black bg-[#7C4DFF] mb-8">
              {/* Folder Tab */}
              <div className="bg-[#7C4DFF] border-b-2 border-black px-6 py-2.5 inline-block rounded-t-xl">
                <span
                  className="text-xl md:text-2xl font-black uppercase tracking-wider text-black"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  CONTENTS
                </span>
              </div>
              
              {/* Folder Body with Black Wavy Zebra Stripes */}
              <div className="relative h-32 w-full overflow-hidden bg-[#7C4DFF] flex items-center justify-center">
                <WavyStripes stripes={6} color="#000000" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* TOC Links */}
            <nav className="space-y-3 pl-2">
              {TOC_ITEMS.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="group flex items-center gap-4 py-1.5 transition-all duration-300 hover:translate-x-1"
                >
                  <span
                    className="w-6 text-sm font-black opacity-40 group-hover:opacity-100 transition-opacity"
                    style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-lg md:text-xl font-extrabold text-[#1A1A1A] group-hover:underline decoration-2 underline-offset-4"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.label}
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* Right Column: High-Impact Editorial Text (7 cols) */}
          <div ref={rightRef} className="lg:col-span-7 pt-4 opacity-0">
            <p
              className="text-3xl sm:text-4xl md:text-5xl leading-[1.25] font-normal text-[#1A1A1A]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <strong className="font-black text-black">Codessiance &apos;26</strong> is here, and it&apos;s more dynamic, personal, and{" "}
              <strong className="font-black italic text-black">unmistakably you</strong> than ever before. This year brings fresh ways to build, innovate, and{" "}
              <strong className="font-black text-black">moments that defined your year</strong>, and to share them with the world around you.
            </p>

            <div className="mt-10">
              <a
                href="#outro"
                className="pill-btn pill-btn-dark text-sm py-3 px-8 inline-flex"
              >
                READ MORE
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Red Circular Stamp / Badge hanging over section boundary */}
      <div className="absolute -bottom-16 right-8 md:right-20 z-30 pointer-events-auto">
        <a href="#outro" className="block relative w-36 h-36 md:w-44 md:h-44 group">
          <div
            ref={stampRef}
            className="w-full h-full flex items-center justify-center rounded-full bg-[#FF4632] text-black shadow-2xl transition-transform duration-300 group-hover:scale-105"
            style={{
              border: "3px stroke #000",
            }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path
                id="stamp-circle-path"
                d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                fill="none"
              />
              <text
                fill="black"
                fontSize="14"
                fontWeight="900"
                letterSpacing="3.5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <textPath href="#stamp-circle-path" startOffset="0%">
                  CLICK HERE FOR YOUR WRAPPED • CLICK HERE FOR YOUR WRAPPED •
                </textPath>
              </text>
            </svg>

            {/* Inner Star/Text */}
            <div className="absolute inset-0 flex items-center justify-center text-center font-black text-xs uppercase px-4 leading-tight">
              CLICK HERE
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
