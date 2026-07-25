"use client";

import { Search } from "lucide-react";

export default function HeaderNav() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black text-white border-b border-white/10 h-16 flex items-center px-4 md:px-8 justify-between">
      {/* Left: Spotify-style Logo & "For the Record" text */}
      <div className="flex items-center gap-3">
        {/* Spotify Logo SVG */}
        <svg viewBox="0 0 2361 708" className="h-6 w-auto fill-current text-white">
          <path d="M1180.5 0C528.5 0 0 528.5 0 1180.5S528.5 2361 1180.5 2361 2361 1832.5 2361 1180.5 1832.5 0 1180.5 0zm541.4 1702.4c-21.2 34.7-66.6 45.8-101.3 24.6-277.6-169.6-627.1-208-1038.7-114-39.3 9-78.9-15.6-87.9-54.8-9-39.3 15.6-78.9 54.8-87.9 449.6-102.7 834.7-58.8 1148.5 130.8 34.7 21.2 45.8 66.6 24.6 101.3zm144.6-321.8c-26.7 43.4-83.6 57.3-127 30.6-317.5-195.1-801.5-251.5-1177.1-137.6-48.8 14.8-100.5-12.7-115.3-61.5-14.8-48.8 12.7-100.5 61.5-115.3 429.3-130.2 961.5-67.4 1327.3 156.8 43.4 26.7 57.3 83.6 30.6 127zm13.1-335.7C1500 827.1 873 806.3 509 916.8c-59.5 18-122.4-15.7-140.4-75.2-18-59.5 15.7-122.4 75.2-140.4 418.1-126.9 1109.8-103.3 1557.2 162.3 53.5 31.7 71.1 100.9 39.4 154.4-31.7 53.4-100.9 71-154.4 39.4z" />
        </svg>
        <span
          className="text-lg md:text-xl font-bold tracking-tight text-white border-l border-white/20 pl-3 ml-1"
          style={{ fontFamily: "var(--font-body)" }}
        >
          For the Record
        </span>

        {/* Dropdown Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 ml-8">
          <button className="flex items-center gap-1 text-sm font-bold text-white/90 hover:text-white transition-colors">
            News <span className="text-xs">▾</span>
          </button>
          <button className="flex items-center gap-1 text-sm font-bold text-white/90 hover:text-white transition-colors">
            Company <span className="text-xs">▾</span>
          </button>
        </nav>
      </div>

      {/* Right: Search Input */}
      <div className="flex items-center gap-2">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-b border-white/80 px-2 py-1 text-sm font-medium text-white placeholder:text-white/70 focus:outline-none focus:border-white w-40 sm:w-64"
            style={{ fontFamily: "var(--font-body)" }}
          />
          <Search className="w-4 h-4 text-white absolute right-2 pointer-events-none" />
        </div>
      </div>
    </header>
  );
}
