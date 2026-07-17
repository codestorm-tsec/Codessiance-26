"use client";

import { useRef, useEffect } from "react";
import {
  ExternalLink,
  Music,
  Clock,
  Trophy,
  Disc3,
} from "lucide-react";

// Brand icons (removed from lucide-react in recent versions)
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
import { Separator } from "@/components/ui/separator";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Outro() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
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

      // Share card
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 100, rotation: 5 },
        {
          opacity: 1,
          y: 0,
          rotation: -2,
          duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: { trigger: cardRef.current, start: "top 80%" },
        }
      );

      // Footer
      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="outro"
      className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-flat-orange text-black"
    >
      <div className="relative z-20 max-w-5xl mx-auto px-6">
        {/* Wrapped share card */}
        <div className="mb-32">
          <div ref={headerRef} className="text-center mb-16 opacity-0">
            <p
              className="text-lg uppercase tracking-[0.3em] font-bold mb-3 border-4 border-black inline-block px-4 py-1 bg-white shadow-[4px_4px_0_0_#000]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Add to Playlist
            </p>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase mt-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your<br/>Codessiance<br/>
              <span className="text-white [-webkit-text-stroke:2px_black] md:[-webkit-text-stroke:4px_black]">Wrap</span>
            </h2>
          </div>

          {/* Share card mockup */}
          <div
            ref={cardRef}
            className="max-w-md mx-auto bg-white border-8 border-black shadow-[16px_16px_0_0_#000] overflow-hidden opacity-0"
          >
            {/* Card header */}
            <div className="p-8 pb-6 flex items-center gap-4 bg-flat-yellow border-b-8 border-black">
              <Disc3 className="w-12 h-12 text-black" />
              <div>
                <p
                  className="text-2xl font-black text-black uppercase leading-none"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Codessiance &apos;26
                </p>
                <p className="text-sm font-bold text-black uppercase mt-1">TSEC CodeStorm</p>
              </div>
            </div>

            {/* Stat rows */}
            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between border-b-4 border-black pb-4">
                <div className="flex items-center gap-4">
                  <Music className="w-8 h-8 text-black" />
                  <span
                    className="text-xl font-black text-black uppercase"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Top Genre
                  </span>
                </div>
                <span
                  className="text-2xl font-black text-black uppercase"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  AI / ML
                </span>
              </div>

              <div className="flex items-center justify-between border-b-4 border-black pb-4">
                <div className="flex items-center gap-4">
                  <Clock className="w-8 h-8 text-black" />
                  <span
                    className="text-xl font-black text-black uppercase"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Duration
                  </span>
                </div>
                <span
                  className="text-2xl font-black text-black uppercase"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  24 Hours
                </span>
              </div>

              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-4">
                  <Trophy className="w-8 h-8 text-black" />
                  <span
                    className="text-xl font-black text-black uppercase"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Prize Pool
                  </span>
                </div>
                <span
                  className="text-2xl font-black text-black uppercase"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  ₹60,000+
                </span>
              </div>
            </div>

            {/* Register CTA */}
            <div className="p-8 pt-0 mt-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-black text-white font-black py-5 text-2xl uppercase border-4 border-black hover:bg-flat-pink hover:text-black transition-all duration-200 shadow-[6px_6px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#000]"
              >
                Register Now
                <ExternalLink className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer ref={footerRef} className="border-t-8 border-black pt-16 opacity-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Branding */}
            <div>
              <h3
                className="text-3xl font-black mb-4 uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Codessiance &apos;26
              </h3>
              <p
                className="text-lg font-bold text-black leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                TSEC CodeStorm&apos;s flagship 24-hour offline hackathon.
                <br />
                Your code, your story — wrapped.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4
                className="text-xl font-black text-black uppercase tracking-wider mb-6 border-b-4 border-black inline-block pb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Quick Links
              </h4>
              <ul className="space-y-4 text-lg font-bold text-black uppercase">
                <li>
                  <a href="#genres" className="hover:text-white transition-colors hover:underline">
                    Domains
                  </a>
                </li>
                <li>
                  <a href="#timeline" className="hover:text-white transition-colors hover:underline">
                    Schedule
                  </a>
                </li>
                <li>
                  <a href="#prizes" className="hover:text-white transition-colors hover:underline">
                    Prizes
                  </a>
                </li>
                <li>
                  <a href="#recap" className="hover:text-white transition-colors hover:underline">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact / Socials */}
            <div>
              <h4
                className="text-xl font-black text-black uppercase tracking-wider mb-6 border-b-4 border-black inline-block pb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Connect
              </h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-14 h-14 border-4 border-black bg-white flex items-center justify-center hover:bg-flat-pink hover:-translate-y-1 transition-all duration-200 shadow-[4px_4px_0_0_#000]"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-8 h-8" />
                </a>
                <a
                  href="#"
                  className="w-14 h-14 border-4 border-black bg-white flex items-center justify-center hover:bg-flat-pink hover:-translate-y-1 transition-all duration-200 shadow-[4px_4px_0_0_#000]"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-8 h-8" />
                </a>
                <a
                  href="#"
                  className="w-14 h-14 border-4 border-black bg-white flex items-center justify-center hover:bg-flat-pink hover:-translate-y-1 transition-all duration-200 shadow-[4px_4px_0_0_#000]"
                  aria-label="X / Twitter"
                >
                  <TwitterIcon className="w-8 h-8" />
                </a>
              </div>
              <p
                className="mt-6 text-lg font-bold text-black"
                style={{ fontFamily: "var(--font-body)" }}
              >
                codestorm@tsec.edu
              </p>
            </div>
          </div>

          <div className="text-center text-sm font-bold text-black pb-24 uppercase border-t-4 border-black pt-6">
            <p>© 2026 TSEC CodeStorm. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </section>
  );
}
