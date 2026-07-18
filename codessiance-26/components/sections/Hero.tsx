"use client";

import { useRef, useEffect } from "react";
import { Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Starburst } from "@/components/ui/Starburst";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subcopyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const graphicRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Spinning starburst background
      gsap.to(".spin-slow", {
        rotation: 360,
        duration: 25,
        repeat: -1,
        ease: "none"
      });

      const words = headlineRef.current?.querySelectorAll(".hero-word");
      if (!words) return;

      const hasLoaded = sessionStorage.getItem("codessiance-loaded");
      const delay = hasLoaded ? 0.2 : 3;

      const tl = gsap.timeline({ delay });

      // Staggered graphic pop-in
      tl.fromTo(
        graphicRef.current,
        { scale: 0, rotation: -45, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)" }
      );

      // Massive blocky typography slam
      tl.fromTo(
        words,
        { scale: 2, opacity: 0, y: 100 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.5"
      );

      // Subcopy
      tl.fromTo(
        subcopyRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      );

      // CTAs
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-flat-green text-flat-black"
    >
      {/* Massive Graphic Background */}
      <div ref={graphicRef} className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <Starburst
          points={14}
          innerRadius={45}
          outerRadius={100}
          className="spin-slow w-[800px] h-[800px] text-flat-yellow opacity-90 mix-blend-multiply"
        />
        <Starburst
          points={8}
          innerRadius={60}
          outerRadius={100}
          className="spin-slow w-[600px] h-[600px] text-flat-pink absolute opacity-90 mix-blend-multiply"
          style={{ animationDirection: 'reverse', animationDuration: '30s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
        {/* Left Column: Big Typography */}
        <div ref={headlineRef} className="space-y-[-2vw]">
          <h1
            className="text-[9vw] md:text-[6vw] font-black tracking-tighter leading-[0.85] uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="block overflow-hidden pb-4">
              <span className="hero-word inline-block origin-bottom-left">24&nbsp;</span>
              <span className="hero-word inline-block origin-bottom-left">Hours</span>
            </span>
            <span className="block overflow-hidden pb-4 text-flat-yellow [-webkit-text-stroke:2px_black] md:[-webkit-text-stroke:4px_black]">
              <span className="hero-word inline-block origin-bottom-left">1&nbsp;</span>
              <span className="hero-word inline-block origin-bottom-left">Campus</span>
            </span>
            <span className="block overflow-hidden pb-4 bg-flat-black text-flat-green inline-block px-4 -ml-4 mt-2 border-4 border-black shadow-[8px_8px_0_0_#000]">
              <span className="hero-word inline-block">Your&nbsp;</span>
              <span className="hero-word inline-block">Story</span>
            </span>
          </h1>
        </div>

        {/* Right Column: Subcopy and CTAs */}
        <div className="flex flex-col items-start md:items-end text-left md:text-right mt-12 md:mt-0">
          {/* Decorative thick border box */}
          <div className="border-4 border-black p-8 bg-flat-pink shadow-[12px_12px_0_0_#000] max-w-md w-full mb-8 relative">
            <div className="absolute -top-6 -right-6">
              <Starburst points={6} className="w-16 h-16 text-flat-yellow spin-slow" />
            </div>
            <p
              ref={subcopyRef}
              className="text-xl md:text-2xl font-bold text-black opacity-0"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Codeissance &apos;26 — TSEC CodeStorm&apos;s flagship 24-hour offline
              hackathon. Your code, your story — wrapped.
            </p>
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 opacity-0 w-full md:w-auto">
            <a
              href="#outro"
              className="group flex items-center justify-center gap-2 bg-flat-black text-flat-green font-black px-10 py-5 text-xl border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] transition-all"
            >
              <Play className="w-6 h-6 fill-current" />
              REGISTER
            </a>
            <a
              href="#genres"
              className="flex items-center justify-center gap-2 bg-white text-black font-black px-10 py-5 text-xl border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] transition-all"
            >
              SCROLL ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
