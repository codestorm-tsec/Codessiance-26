"use client";

import { useRef, useEffect } from "react";
import {
  Globe,
  Brain,
  Factory,
  Users,
  Trophy,
  Play,
  Headphones,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { DOMAINS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Brain,
  Factory,
};

const cardColors = [
  "bg-flat-yellow",
  "bg-flat-pink",
  "bg-flat-blue",
];

export default function Genres() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: 70,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        }
      );

      const cards =
        cardsRef.current?.querySelectorAll(".genre-card");

      if (cards) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 120,
            scale: 0.85,
            rotation: -5,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.9,
            stagger: 0.18,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            },
          }
        );
      }

      gsap.to(".floatingBlob", {
        y: 30,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 5,
        stagger: 0.8,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="genres"
      className="relative overflow-hidden bg-flat-orange border-y-8 border-black py-24 md:py-32"
    >
      {/* Background Blobs */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="floatingBlob absolute -left-20 top-0 h-80 w-80 rounded-full bg-flat-pink opacity-25 blur-[120px]" />

        <div className="floatingBlob absolute right-0 top-1/3 h-[30rem] w-[30rem] rounded-full bg-flat-blue opacity-20 blur-[140px]" />

        <div className="floatingBlob absolute bottom-0 left-1/2 h-[24rem] w-[24rem] rounded-full bg-flat-yellow opacity-30 blur-[110px]" />

      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Header */}

        <div
          ref={headerRef}
          className="mb-24 text-center md:text-left opacity-0"
        >

          <div className="inline-flex items-center gap-3 rounded-full border-4 border-black bg-white px-6 py-3 shadow-[6px_6px_0_#000]">

            <Headphones className="h-5 w-5" />

            <span
              className="font-black uppercase tracking-[0.35em] text-black"
              style={{ fontFamily: "var(--font-body)" }}
            >
              YOUR TOP GENRES
            </span>

          </div>

          <h2
            className="mt-8 text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.9]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Pick Your
            <br />

            <span className="relative inline-block">

              Track

              <span className="absolute bottom-2 left-0 -z-10 h-3 w-full rotate-[-2deg] bg-flat-green" />

            </span>

          </h2>

          <p
            className="mt-8 max-w-xl text-xl font-bold"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Every builder has a favorite genre.
            Pick yours and create your next hit.
          </p>

        </div>

        {/* Cards */}

        <div
          ref={cardsRef}
          className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"
        >

          {DOMAINS.map((domain, idx) => {

            const Icon = iconMap[domain.icon] || Globe;

            const bg = cardColors[idx % 3];

            const rotation =
              idx % 3 === 0
                ? "-rotate-2"
                : idx % 3 === 1
                ? "rotate-2"
                : "-rotate-1";

            return (

              <div
                key={domain.id}
                className={`
                  genre-card
                  group
                  relative
                  overflow-hidden
                  rounded-[32px]
                  border-[6px]
                  border-black
                  ${bg}
                  ${rotation}
                  p-8
                  shadow-[14px_14px_0_#000]
                  transition-all
                  duration-500
                  hover:-translate-y-4
                  hover:rotate-0
                  hover:scale-[1.03]
                  hover:shadow-[8px_8px_0_#000]
                  opacity-0
                `}
              >

                {/* Shine */}

                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

               
                {/* Now Playing */}

                <div className="absolute left-6 top-6 rounded-full border-2 border-black bg-black px-4 py-1 text-xs font-black uppercase tracking-[0.25em] text-white">

                  NOW PLAYING

                </div>

                {/* Vinyl Record */}

                <div className="mt-14 mb-8 flex justify-center md:justify-start">

                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-black">

                    <div className="absolute h-16 w-16 rounded-full border border-white/30" />

                    <div className="absolute h-10 w-10 rounded-full border border-white/20" />

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">

                      <Icon className="h-4 w-4 text-black" />

                    </div>

                  </div>

                </div>
                                {/* Domain Title */}

                <h3
                  className="text-4xl md:text-5xl font-black uppercase leading-none"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {domain.name}
                </h3>

                {/* Description */}

                <p
                  className="mt-5 text-lg font-bold leading-relaxed"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {domain.description}
                </p>

                
                {/* Stats */}

                <div className="mt-8 flex flex-wrap gap-3">

                 <div className="flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-2 font-black text-black">

  <Users className="h-4 w-4 text-black" />

  <span>{domain.teamSlots}</span>

</div>

                  
                  <div className="flex items-center gap-2 rounded-full border-2 border-black bg-flat-green px-4 py-2 font-black">

                    <Trophy className="h-4 w-4" />

                    <span>{domain.prize}</span>

                  </div>

                </div>

                {/* Bottom Row */}

                <div className="mt-10 flex items-center justify-between">

                  <div>

                    <p className="text-xs font-black uppercase tracking-[0.3em]">
                      Genre
                    </p>

                    <p
                      className="mt-1 text-xl font-black uppercase"
                      style={{
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {domain.name}
                    </p>

                  </div>

                  {/* Play Button */}

                  <div
                    className="
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-full
                      border-4
                      border-black
                      bg-flat-green
                      shadow-[4px_4px_0_#000]
                      transition-all
                      duration-300
                      group-hover:scale-110
                      group-hover:rotate-12
                    "
                  >
                    <Play className="ml-1 h-7 w-7 fill-black text-black" />
                  </div>

                </div>

              </div>

            );

          })}
                  </div>
      </div>
    </section>
  );
}
