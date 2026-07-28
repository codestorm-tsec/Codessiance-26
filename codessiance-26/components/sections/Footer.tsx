"use client";

import React from "react";
import {
  Anchor,
  Home,
  Layers,
  Users,
  Clock,
  Mail,
  Phone,
  HelpCircle,
  Sparkles,
} from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
  </svg>
);

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-black text-white pt-12 sm:pt-16 pb-8 sm:pb-12 px-4 sm:px-10 lg:px-16 border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid Section — OG Spotify Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16 items-start">

          {/* Logo (Top Left) */}
          <div className="lg:col-span-2 flex flex-col items-start gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <Anchor className="w-8 h-8 text-white transition-transform group-hover:scale-105" />
              <span className="text-2xl font-black tracking-tight text-white font-serif">
                CodeStorm
              </span>
            </a>
            <p className="text-xs text-white/60 leading-relaxed max-w-[200px]">
              Embark on the greatest coding adventure. Codeissiance 2.0.
            </p>
          </div>

          {/* COMMUNITIES / QUICK LINKS Column 1 (OG Circular Icon Badges) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs uppercase font-bold tracking-widest text-white/50 mb-6">
              QUICK LINKS
            </h3>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => scrollTo("hero")}
                  className="flex items-center gap-3 group text-white font-bold hover:text-[#1DB954] transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-full border border-white/30 group-hover:border-[#1DB954] flex items-center justify-center transition-colors shrink-0">
                    <Home className="w-4 h-4" />
                  </div>
                  <span className="text-base sm:text-lg">Home</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("genres")}
                  className="flex items-center gap-3 group text-white font-bold hover:text-[#1DB954] transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-full border border-white/30 group-hover:border-[#1DB954] flex items-center justify-center transition-colors shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <span className="text-base sm:text-lg">Domains</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("in-rotation")}
                  className="flex items-center gap-3 group text-white font-bold hover:text-[#1DB954] transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-full border border-white/30 group-hover:border-[#1DB954] flex items-center justify-center transition-colors shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-base sm:text-lg">Crew</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("timeline")}
                  className="flex items-center gap-3 group text-white font-bold hover:text-[#1DB954] transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-full border border-white/30 group-hover:border-[#1DB954] flex items-center justify-center transition-colors shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-base sm:text-lg">Timeline</span>
                </button>
              </li>
            </ul>
          </div>

          {/* CONTACT Column 2 (OG Circular Icon Badges) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs uppercase font-bold tracking-widest text-white/50 mb-6">
              CONTACT US
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:tseccodestorm@gmail.com"
                  className="flex items-center gap-3 group text-white font-bold hover:text-[#1DB954] transition-colors"
                >
                  <div className="w-10 h-10 rounded-full border border-white/30 group-hover:border-[#1DB954] flex items-center justify-center transition-colors shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm sm:text-base truncate">
                    tseccodestorm@gmail.com
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+918850967604"
                  className="flex items-center gap-3 group text-white font-bold hover:text-[#1DB954] transition-colors"
                >
                  <div className="w-10 h-10 rounded-full border border-white/30 group-hover:border-[#1DB954] flex items-center justify-center transition-colors shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-base sm:text-lg">+91 88509 67604</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+917039954217"
                  className="flex items-center gap-3 group text-white font-bold hover:text-[#1DB954] transition-colors"
                >
                  <div className="w-10 h-10 rounded-full border border-white/30 group-hover:border-[#1DB954] flex items-center justify-center transition-colors shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-base sm:text-lg">+91 70399 54217</span>
                </a>
              </li>
            </ul>
          </div>

          {/* COMPANY Column */}
          <div className="lg:col-span-2">
            <h3 className="text-xs uppercase font-bold tracking-widest text-white/50 mb-6">
              COMPANY
            </h3>
            <ul className="space-y-4 font-bold text-base sm:text-lg">
              <li>
                <button
                  onClick={() => scrollTo("intro")}
                  className="hover:text-[#1DB954] transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("recap")}
                  className="hover:text-[#1DB954] transition-colors"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("top-artist")}
                  className="hover:text-[#1DB954] transition-colors"
                >
                  Sponsors
                </button>
              </li>
            </ul>
          </div>

          {/* Socials & CTA Button Column */}
          <div className="lg:col-span-2 flex flex-col justify-between h-full space-y-6">
            <div>
              <h3 className="text-xs uppercase font-bold tracking-widest text-white/50 mb-6">
                USEFUL LINKS
              </h3>
              <ul className="space-y-4 font-bold text-base sm:text-lg mb-8">
                <li>
                  <button
                    onClick={() => scrollTo("outro")}
                    className="hover:text-[#1DB954] transition-colors"
                  >
                    Register Now
                  </button>
                </li>
              </ul>
            </div>

            {/* Social Icons & Get Codeissance CTA Button */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com/tseccodestorm"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-11 h-11 rounded-full bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-white transition-colors"
                >
                  <InstagramIcon className="w-5 h-5 text-[#E1306C]" />
                </a>
                <a
                  href="https://www.linkedin.com/company/tsec-codestorm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-11 h-11 rounded-full bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-white transition-colors"
                >
                  <LinkedInIcon className="w-5 h-5 text-[#0077B5]" />
                </a>
                <a
                  href="https://x.com/TCodestorm"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="w-11 h-11 rounded-full bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-white transition-colors"
                >
                  <TwitterIcon className="w-5 h-5 text-[#1DA1F2]" />
                </a>
              </div>

              <button
                onClick={() => scrollTo("outro")}
                className="w-full bg-white text-black font-bold text-base px-6 py-3.5 rounded-full hover:scale-105 transition-transform active:scale-95 text-center shadow-lg"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex flex-wrap items-center gap-6 font-semibold">
            <a href="#" className="hover:text-white transition-colors">
              Legal
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Code of Conduct
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookies
            </a>
          </div>

          <p className="text-white/40">
            © 2026 CodeStorm. All rights reserved. | Made with{" "}
            <span className="text-red-500">❤️</span> for the coding community
          </p>
        </div>
      </div>
    </footer>
  );
}
