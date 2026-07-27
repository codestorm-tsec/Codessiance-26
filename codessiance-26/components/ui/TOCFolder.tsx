"use client";

import { useState } from "react";
import { WavyStripes } from "@/components/ui/DecorativePatterns";

interface TOCFolderProps {
  items: { label: string; href: string }[];
}

export default function TOCFolder({ items }: TOCFolderProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Calculate approximate open height: padding + (item count * row height) + bottom padding for wavy pattern
  const closedHeight = 120;
  const openHeight = 16 + (items.length * 70) + 90;

  return (
    <div 
      className="relative w-full max-w-sm mx-auto lg:mx-0 group cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div 
        className={`relative w-full transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${!isOpen ? "group-hover:-translate-y-3" : ""}`}
      >
        {/* Folder Tab */}
        <div className="flex">
          <div className="bg-[#9691FF] border-2 border-b-0 border-black px-6 py-2 rounded-t-2xl inline-flex items-center gap-2 relative z-10 translate-y-[2px]">
            <span
              className="text-xl md:text-2xl font-black uppercase tracking-wider text-black"
              style={{ fontFamily: "var(--font-display)" }}
            >
              CONTENTS
            </span>
          </div>
        </div>

        {/* Folder Body */}
        <div 
          className="relative w-full bg-[#9691FF] border-2 border-black rounded-b-2xl rounded-tr-2xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{ height: isOpen ? `${openHeight}px` : `${closedHeight}px` }}
        >
          {/* Wavy Background Layer (fixed to bottom) */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-[#9691FF]">
             <WavyStripes stripes={6} color="#1A1A1A" className="w-full h-full object-cover" />
          </div>

          {/* The White List Container */}
          <div 
            className={`absolute top-4 left-4 right-4 z-10 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="bg-[#F3EBE1] border-2 border-black rounded-xl overflow-hidden shadow-sm">
              <ul className="flex flex-col divide-y-2 divide-black">
                {items.map((item, idx) => (
                  <li key={idx}>
                    <a 
                      href={item.href} 
                      className="block px-4 py-3 md:py-4 text-base md:text-xl font-black text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
                      style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em" }}
                      onClick={(e) => {
                        e.stopPropagation(); // Keep folder open if they just click the link
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
