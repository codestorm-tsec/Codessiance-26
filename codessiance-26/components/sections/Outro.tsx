"use client";

import { useRef, useEffect } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VerticalBars, ConcentricCircles, CheckeredPattern, DotGrid } from "@/components/ui/DecorativePatterns";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function Outro() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        {
          opacity: 0,
          y: 80,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
          },
        }
      );

      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          ease: "none",
          repeat: -1,
          duration: 25,
        });
      }

      gsap.to(".greenGlow", {
        y: -40,
        x: 30,
        repeat: -1,
        yoyo: true,
        duration: 8,
        ease: "sine.inOut",
      });

      gsap.to(".blackGlow", {
        y: 50,
        x: -30,
        repeat: -1,
        yoyo: true,
        duration: 10,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="outro"
      className="relative overflow-hidden bg-[#0B0B0B]"
    >
      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="greenGlow absolute -left-32 top-10 h-[500px] w-[500px] rounded-full bg-[#1DB954]/20 blur-[150px]" />

        <div className="blackGlow absolute right-[-120px] bottom-[-120px] h-[450px] w-[450px] rounded-full bg-[#FF4632]/20 blur-[150px]" />

      </div>

      {/* Decorative: Concentric Circles — top right */}
      <div className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] md:w-[35vw] md:h-[35vw] opacity-[0.05] pointer-events-none">
        <ConcentricCircles size={700} rings={11} baseColor="#FF4632" altColor="#0B0B0B" highlightRing={3} highlightColor="#1DB954" />
      </div>

      {/* Decorative: Warped Checkered — bottom left */}
      <div className="absolute -bottom-[8%] -left-[5%] opacity-[0.04] pointer-events-none rotate-[-6deg]">
        <CheckeredPattern cols={7} rows={10} size={40} color1="#1DB954" color2="transparent" warp />
      </div>

      {/* Decorative: Dot Grid — left edge */}
      <div className="absolute top-[30%] left-6 opacity-[0.06] pointer-events-none hidden md:block">
        <DotGrid rows={8} cols={2} dotSize={10} gap={12} color="#FFFFFF" />
      </div>

      {/* HERO */}

      <div
        ref={heroRef}
        className="relative overflow-hidden min-h-[75vh] bg-[#FF4632] flex items-center justify-center px-6 opacity-0"
      >
        {/* Transparent Background Text */}

        <h1
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            text-[23vw]
            font-black
            uppercase
            text-black/10
            leading-none
            pointer-events-none
            select-none
            tracking-[-0.08em]
          "
        >
          REGISTER
        </h1>

        {/* Decorative Bars */}

        <div className="absolute left-10 hidden lg:block">
          <VerticalBars bars={7} color="#000000" className="h-40" />
        </div>

        <div className="absolute right-10 hidden lg:block">
          <VerticalBars bars={7} color="#000000" className="h-40" />
        </div>

        {/* Main Content */}

        <div className="relative z-10 max-w-5xl text-center">

          <p className="uppercase tracking-[0.5em] font-bold text-black/70 mb-8">
            TSEC CODESTORM PRESENTS
          </p>

          <h2
            className="
              text-[15vw]
              md:text-[10rem]
              leading-none
              font-black
              tracking-[-0.06em]
              uppercase
              text-black
              transition-all duration-300
              [-webkit-text-stroke:2px_transparent]
              hover:text-[#EBE6DF]
              hover:[-webkit-text-stroke:2px_black]
            "
          >
            REGISTER
            <br />
            NOW
          </h2>

          <a
            href="#"
            className="
              inline-flex
              items-center
              gap-3
              mt-12
              rounded-full
              bg-black
              text-white
              px-10
              py-5
              text-lg
              font-bold
              transition-all
              duration-300
              hover:scale-105
              hover:bg-white
              hover:text-black
              shadow-[0_25px_80px_rgba(0,0,0,.25)]
            "
          >
            Register Today

            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>

        </div>

      </div>

      {/* Infinite Marquee */}

      <div className="overflow-hidden border-y border-white/10 bg-black py-5">

        <div
          ref={marqueeRef}
          className="flex w-max gap-16 whitespace-nowrap"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-16 text-3xl font-black uppercase tracking-tight"
            >
              <span>Codeissance '26</span>
              <span className="text-[#1DB954]">•</span>
              <span>Register Now</span>
              <span className="text-[#1DB954]">•</span>
              <span>24 Hours</span>
              <span className="text-[#1DB954]">•</span>
              <span>₹60,000+</span>
            </div>
          ))}
        </div>

      </div>

    </section>

  );
}
