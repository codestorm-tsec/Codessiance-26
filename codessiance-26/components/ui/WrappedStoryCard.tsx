"use client";

import React from "react";

/**
 * Reusable Spotify Wrapped 2025 Story Card component
 * Designed according to the Figma template specification (9:16 vertical story card aspect ratio)
 */
export function TopGenresCard({
  title = "My Top Genres",
  genres = [
    { rank: 1, name: "Web / App Dev" },
    { rank: 2, name: "AI / ML Innovation" },
    { rank: 3, name: "Industry Track" },
    { rank: 4, name: "Cybersecurity" },
    { rank: 5, name: "Cloud & DevOps" },
  ],
  theme = "cream",
}: {
  title?: string;
  genres?: { rank: number; name: string }[];
  theme?: "cream" | "dark" | "purple";
}) {
  const isDark = theme === "dark";

  return (
    <div
      className={`relative w-full max-w-[320px] aspect-[9/16] rounded-2xl overflow-hidden p-6 flex flex-col justify-between shadow-2xl border ${
        isDark
          ? "bg-[#121212] text-white border-white/10"
          : "bg-[#EBE6DF] text-black border-black/10"
      }`}
    >
      {/* Background Graphic Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="checkers" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill={isDark ? "#FFF" : "#000"} />
            <rect x="20" y="20" width="20" height="20" fill={isDark ? "#FFF" : "#000"} />
          </pattern>
          <rect width="100%" height="100%" fill="url(#checkers)" />
        </svg>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center pt-2">
        <span
          className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-black/10 rounded-full inline-block mb-3"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {title}
        </span>
      </div>

      {/* Genres List matching Figma Typography */}
      <div className="relative z-10 space-y-3 my-auto">
        {genres.map((g) => (
          <div key={g.rank} className="flex items-center gap-3">
            <span
              className="text-2xl font-black opacity-40 w-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {g.rank}
            </span>
            <div className="flex-1 bg-black text-white px-4 py-2 rounded-md font-black uppercase text-base sm:text-lg tracking-tight shadow-md">
              {g.name}
            </div>
          </div>
        ))}
      </div>

      {/* Card Footer Badge matching Figma */}
      <div className="relative z-10 flex items-center justify-between pt-4 border-t border-current/10">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#1DB954]" />
          <span className="text-[10px] font-black tracking-widest uppercase">
            CODESSiANCE.COM/WRAPPED
          </span>
        </div>
        <span className="text-[10px] font-bold opacity-60">2026</span>
      </div>
    </div>
  );
}

export function ClubFavouriteCard({
  percentage = "12%",
  title = "You're in great company.",
  subtitle = "of global hackers are in your track.",
  items = ["AI / ML", "Fullstack Web", "Smart Contracts", "Cloud DevOps"],
}: {
  percentage?: string;
  title?: string;
  subtitle?: string;
  items?: string[];
}) {
  return (
    <div className="relative w-full max-w-[320px] aspect-[9/16] rounded-2xl overflow-hidden p-6 flex flex-col justify-between shadow-2xl bg-[#121212] text-white border border-white/10">
      {/* Background circles graphic */}
      <div className="absolute -right-20 top-1/3 w-64 h-64 rounded-full border-[12px] border-white/10 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center pt-2">
        <p className="text-xs font-bold uppercase tracking-wider text-white/70">{title}</p>
        <div
          className="text-6xl font-black text-[#1DB954] my-2 leading-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {percentage}
        </div>
        <p className="text-xs text-white/50">{subtitle}</p>
      </div>

      {/* Items Grid matching Figma */}
      <div className="relative z-10 grid grid-cols-2 gap-3 my-auto">
        {items.map((item, i) => (
          <div
            key={i}
            className="aspect-square bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors"
          >
            <span className="text-xl mb-1">⚡</span>
            <span className="text-xs font-black uppercase tracking-tight">{item}</span>
          </div>
        ))}
      </div>

      {/* Card Footer Badge */}
      <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#1DB954]" />
          <span className="text-[10px] font-black tracking-widest uppercase">
            CODESSiANCE.COM/WRAPPED
          </span>
        </div>
        <span className="text-[10px] font-bold text-white/60">2026</span>
      </div>
    </div>
  );
}
