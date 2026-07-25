"use client";

import { useRef, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VerticalBars } from "@/components/ui/DecorativePatterns";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function Outro() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaKitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        mediaKitRef.current,
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: mediaKitRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="outro" className="relative overflow-hidden">
      
      {/* Spotify MEDIA KIT / REGISTER Red Banner */}
      <div
        ref={mediaKitRef}
        className="relative overflow-hidden w-full py-12 md:py-16 px-6 flex items-center justify-between opacity-0"
        style={{ backgroundColor: "#FF4632" }}
      >
        {/* Left vertical stripes */}
        <div className="pointer-events-none opacity-90 hidden sm:block">
          <VerticalBars bars={6} color="#000000" className="h-20 w-auto" />
        </div>

        {/* Center Banner Title: REGISTER NOW */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <h2
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-black uppercase leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            REGISTER NOW
          </h2>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 pill-btn bg-black text-white border-black hover:bg-white hover:text-black transition-all px-10 py-3 text-sm inline-flex items-center gap-2"
          >
            Go to Registration
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Right vertical stripes */}
        <div className="pointer-events-none opacity-90 hidden sm:block">
          <VerticalBars bars={6} color="#000000" className="h-20 w-auto" />
        </div>
      </div>

      {/* Spotify Black Footer */}
      <footer className="bg-black text-white pt-20 pb-16 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Logo & Brand (3 cols) */}
          <div className="md:col-span-3">
            <div className="flex items-center gap-2 mb-6">
              <svg viewBox="0 0 2361 708" className="h-8 w-auto fill-current text-white">
                <path d="M1180.5 0C528.5 0 0 528.5 0 1180.5S528.5 2361 1180.5 2361 2361 1832.5 2361 1180.5 1832.5 0 1180.5 0zm541.4 1702.4c-21.2 34.7-66.6 45.8-101.3 24.6-277.6-169.6-627.1-208-1038.7-114-39.3 9-78.9-15.6-87.9-54.8-9-39.3 15.6-78.9 54.8-87.9 449.6-102.7 834.7-58.8 1148.5 130.8 34.7 21.2 45.8 66.6 24.6 101.3zm144.6-321.8c-26.7 43.4-83.6 57.3-127 30.6-317.5-195.1-801.5-251.5-1177.1-137.6-48.8 14.8-100.5-12.7-115.3-61.5-14.8-48.8 12.7-100.5 61.5-115.3 429.3-130.2 961.5-67.4 1327.3 156.8 43.4 26.7 57.3 83.6 30.6 127zm13.1-335.7C1500 827.1 873 806.3 509 916.8c-59.5 18-122.4-15.7-140.4-75.2-18-59.5 15.7-122.4 75.2-140.4 418.1-126.9 1109.8-103.3 1557.2 162.3 53.5 31.7 71.1 100.9 39.4 154.4-31.7 53.4-100.9 71-154.4 39.4z" />
              </svg>
              <span className="text-2xl font-black tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                Spotify
              </span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed">
              Codessiance &apos;26 — TSEC CodeStorm&apos;s Flagship 24-Hour Offline Hackathon.
            </p>
          </div>

          {/* Communities & Links (6 cols) */}
          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
                Communities
              </h4>
              <ul className="space-y-2.5 text-sm font-bold text-white">
                <li><a href="#genres" className="hover:underline">For Hackers</a></li>
                <li><a href="#timeline" className="hover:underline">For Mentors</a></li>
                <li><a href="#prizes" className="hover:underline">For Sponsors</a></li>
                <li><a href="#sponsors" className="hover:underline">Life at Codessiance</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
                Company
              </h4>
              <ul className="space-y-2.5 text-sm font-bold text-white">
                <li><a href="#intro" className="hover:underline">About</a></li>
                <li><a href="#timeline" className="hover:underline">Schedule</a></li>
                <li><a href="#recap" className="hover:underline">FAQs</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
                Useful Links
              </h4>
              <ul className="space-y-2.5 text-sm font-bold text-white">
                <li><a href="#recap" className="hover:underline">Help & Support</a></li>
                <li><a href="#" className="hover:underline">Registration</a></li>
              </ul>
            </div>
          </div>

          {/* Social Icons & CTA (3 cols) */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between gap-6">
            <div className="flex gap-4">
              <a href="#" className="w-11 h-11 rounded-full bg-[#222] flex items-center justify-center hover:bg-[#333] transition-colors">
                <InstagramIcon className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-11 h-11 rounded-full bg-[#222] flex items-center justify-center hover:bg-[#333] transition-colors">
                <TwitterIcon className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-11 h-11 rounded-full bg-[#222] flex items-center justify-center hover:bg-[#333] transition-colors">
                <FacebookIcon className="w-5 h-5 text-white" />
              </a>
            </div>

            <a
              href="#"
              className="pill-btn bg-white text-black hover:bg-[#1DB954] hover:text-black transition-all px-8 py-3 text-sm font-black"
            >
              Get Codessiance
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-xs text-white/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 TSEC CodeStorm. All rights reserved.</p>
          <p>Inspired by Spotify 2025 Wrapped</p>
        </div>
      </footer>
    </section>
  );
}
