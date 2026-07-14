"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  SkipBack,
  Play,
  Pause,
  SkipForward,
  ListMusic,
  Disc3,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ScrollProgress from "./ScrollProgress";
import { SECTIONS } from "@/lib/constants";

export default function PlayerBar() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Detect which section is in viewport via IntersectionObserver
  useEffect(() => {
    const sectionElements = SECTIONS.map((s) =>
      document.getElementById(s.id)
    ).filter(Boolean) as HTMLElement[];

    if (sectionElements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the entry with the largest intersection ratio
        let maxRatio = 0;
        let maxEntry: IntersectionObserverEntry | null = null;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            maxEntry = entry;
          }
        });

        if (maxEntry) {
          const found = SECTIONS.find(
            (s) => s.id === (maxEntry as IntersectionObserverEntry).target.id
          );
          if (found) setActiveSection(found);
        }
      },
      {
        threshold: [0.1, 0.3, 0.5, 0.7],
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    sectionElements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-spotify-black-pure border-t border-white/5">
      {/* Main bar */}
      <div className="flex items-center justify-between px-4 md:px-6 h-[72px] md:h-[80px] gap-4">
        {/* ── Left Zone: Now Playing ── */}
        <div className="flex items-center gap-3 min-w-0 flex-1 md:flex-[0_0_25%]">
          {/* Rotating disc icon */}
          <div className="shrink-0">
            <Disc3
              className={`w-10 h-10 text-spotify-green ${
                isPlaying ? "animate-spin" : ""
              }`}
              style={{ animationDuration: "3s" }}
            />
          </div>
          <div className="min-w-0">
            <p
              className="text-sm font-semibold text-spotify-white truncate"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {activeSection.wrappedTitle}
            </p>
            <p
              className="text-xs text-spotify-grey-subtle truncate"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Codessiance &apos;26
            </p>
          </div>
        </div>

        {/* ── Center Zone: Controls + Progress ── */}
        <div className="flex flex-col items-center gap-1.5 flex-1 md:flex-[0_0_50%] max-w-xl">
          {/* Playback controls */}
          <div className="flex items-center gap-4">
            <button
              className="text-spotify-grey-subtle hover:text-spotify-white transition-colors"
              aria-label="Previous section"
              onClick={() => {
                const idx = SECTIONS.findIndex(
                  (s) => s.id === activeSection.id
                );
                if (idx > 0) scrollToSection(SECTIONS[idx - 1].id);
              }}
            >
              <SkipBack className="w-4 h-4 fill-current" />
            </button>

            <button
              className="w-8 h-8 rounded-full bg-spotify-white flex items-center justify-center hover:scale-105 transition-transform"
              aria-label={isPlaying ? "Pause" : "Play"}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-spotify-black-pure fill-current" />
              ) : (
                <Play className="w-4 h-4 text-spotify-black-pure fill-current ml-0.5" />
              )}
            </button>

            <button
              className="text-spotify-grey-subtle hover:text-spotify-white transition-colors"
              aria-label="Next section"
              onClick={() => {
                const idx = SECTIONS.findIndex(
                  (s) => s.id === activeSection.id
                );
                if (idx < SECTIONS.length - 1)
                  scrollToSection(SECTIONS[idx + 1].id);
              }}
            >
              <SkipForward className="w-4 h-4 fill-current" />
            </button>
          </div>

          {/* Scroll progress scrubber */}
          <ScrollProgress />
        </div>

        {/* ── Right Zone: Nav/Queue ── */}
        <div className="flex items-center justify-end flex-1 md:flex-[0_0_25%]">
          <Sheet>
            <SheetTrigger
              className="text-spotify-grey-subtle hover:text-spotify-white transition-colors p-2"
              aria-label="Section navigation"
            >
              <ListMusic className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-spotify-black-pure border-l border-white/5 w-80"
            >
              <SheetHeader className="mb-6">
                <SheetTitle
                  className="text-spotify-white text-lg"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Queue
                </SheetTitle>
              </SheetHeader>

              <nav className="space-y-1">
                {SECTIONS.map((section, index) => {
                  const isActive = section.id === activeSection.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center gap-4 px-4 py-3 rounded-md text-left transition-all duration-200 group ${
                        isActive
                          ? "bg-spotify-elevated text-spotify-green"
                          : "text-spotify-grey hover:text-spotify-white hover:bg-spotify-elevated"
                      }`}
                    >
                      {/* Track number */}
                      <span
                        className={`text-sm tabular-nums min-w-[20px] ${
                          isActive
                            ? "text-spotify-green"
                            : "text-spotify-grey-subtle"
                        }`}
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {isActive ? "▶" : index + 1}
                      </span>

                      {/* Section info */}
                      <div className="min-w-0">
                        <p
                          className={`text-sm font-medium truncate ${
                            isActive ? "text-spotify-green" : ""
                          }`}
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {section.wrappedTitle}
                        </p>
                        <p
                          className="text-xs text-spotify-grey-subtle truncate"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {section.label}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
