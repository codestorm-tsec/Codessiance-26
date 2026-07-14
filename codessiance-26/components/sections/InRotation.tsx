"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
    { label: "Title Sponsor", sponsors: titleSponsors },
    { label: "Powered By", sponsors: poweredBy },
    { label: "Partners", sponsors: partners },
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
          // Duplicate content for seamless loop
          inner.innerHTML += inner.innerHTML;

          const marqueeAnim = gsap.to(inner, {
            xPercent: -50,
            duration: 20,
            ease: "none",
            repeat: -1,
          });

          // Pause on hover
          marquee.addEventListener("mouseenter", () => marqueeAnim.pause());
          marquee.addEventListener("mouseleave", () => marqueeAnim.resume());
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
      <div className="relative z-20 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div ref={headerRef} className="mb-20 text-center opacity-0">
          <p
            className="text-lg uppercase tracking-[0.3em] font-bold mb-3 border-4 border-black inline-block px-4 py-1 bg-white shadow-[4px_4px_0_0_#000]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            In Rotation
          </p>
          <h2
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase mt-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our<br/>Sponsors
          </h2>
        </div>

        {/* Sponsor tiers */}
        <div className="space-y-16">
          {/* Title + Powered By — static grid */}
          {tierSections
            .filter((t) => t.label !== "Partners")
            .map((tier) => (
              <div key={tier.label} className="sponsor-tier opacity-0">
                <div className="flex justify-center mb-6">
                  <p
                    className="text-sm uppercase font-black tracking-widest text-black bg-flat-yellow border-2 border-black px-4 py-1 rotate-[-2deg]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {tier.label}
                  </p>
                </div>
                <div
                  className={`grid gap-6 justify-items-center ${
                    tier.label === "Title Sponsor"
                      ? "grid-cols-1 max-w-lg mx-auto"
                      : "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
                  }`}
                >
                  {tier.sponsors.map((sponsor) => (
                    <div
                      key={sponsor.id}
                      className={`group flex items-center justify-center border-4 border-black bg-white shadow-[8px_8px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] transition-all duration-200 hover:-translate-y-1 hover:translate-x-1 cursor-pointer ${
                        tier.label === "Title Sponsor"
                          ? "w-full h-48 md:h-64"
                          : "w-full h-32 md:h-40"
                      }`}
                    >
                      <span
                        className="text-black text-xl md:text-2xl font-black text-center px-4 uppercase"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {sponsor.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          {/* Partners — infinite marquee */}
          <div className="sponsor-tier opacity-0">
            <div className="flex justify-center mb-6">
              <p
                className="text-sm uppercase font-black tracking-widest text-black bg-flat-pink border-2 border-black px-4 py-1 rotate-[2deg]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Partners
              </p>
            </div>
            <div
              ref={marqueeRef}
              className="overflow-hidden py-4"
            >
              <div className="marquee-inner flex gap-6 w-max">
                {partners.map((sponsor) => (
                  <div
                    key={sponsor.id}
                    className="flex items-center justify-center border-4 border-black bg-white shadow-[6px_6px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] transition-all duration-200 cursor-pointer w-56 h-28 md:w-64 md:h-32 shrink-0 hover:-translate-y-1 hover:translate-x-1"
                  >
                    <span
                      className="text-black text-lg md:text-xl font-black text-center px-4 uppercase"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {sponsor.name}
                    </span>
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
