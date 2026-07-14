"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * Formats a scroll progress (0–1) to a mm:ss timestamp
 * mapped to a fictional track length.
 */
function formatTimestamp(progress: number, totalSeconds: number): string {
  const current = Math.floor(progress * totalSeconds);
  const mins = Math.floor(current / 60);
  const secs = current % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function formatTotal(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

interface ScrollProgressProps {
  /** Fictional total track length in seconds */
  trackLength?: number;
}

export default function ScrollProgress({
  trackLength = 204, // 3:24 as specified
}: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      setProgress(Math.min(1, Math.max(0, scrollTop / docHeight)));
    }
  }, []);

  useEffect(() => {
    // Use passive listener for performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="flex items-center gap-3 w-full max-w-md">
      {/* Current time */}
      <span
        className="text-[11px] text-spotify-grey-subtle tabular-nums min-w-[32px] text-right"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {formatTimestamp(progress, trackLength)}
      </span>

      {/* Progress bar */}
      <div className="group relative flex-1 h-1 bg-spotify-elevated-hover rounded-full cursor-pointer">
        {/* Filled portion */}
        <div
          className="absolute inset-y-0 left-0 bg-spotify-white group-hover:bg-spotify-green rounded-full transition-colors duration-150"
          style={{ width: `${progress * 100}%` }}
        />
        {/* Playhead dot — visible on hover */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-spotify-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150 shadow-md"
          style={{ left: `calc(${progress * 100}% - 6px)` }}
        />
      </div>

      {/* Total time */}
      <span
        className="text-[11px] text-spotify-grey-subtle tabular-nums min-w-[32px]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {formatTotal(trackLength)}
      </span>
    </div>
  );
}
