/**
 * Codessiance '26 — Color Token Map
 * Mirrors globals.css CSS variables for use in JS/TS (GSAP, Three.js, etc.)
 */

export const colors = {
  // Spotify core
  spotifyBlack: "#121212",
  spotifyBlackPure: "#000000",
  spotifyElevated: "#181818",
  spotifyElevatedHover: "#282828",
  spotifyGreen: "#1DB954",
  spotifyGreenBright: "#1ED760",
  spotifyWhite: "#FFFFFF",
  spotifyGrey: "#B3B3B3",
  spotifyGreySubtle: "#727272",

  // Wrap gradient accents
  wrapPink: "#F037A5",
  wrapBlue: "#536AE2",
  wrapYellow: "#FFCC00",
  wrapOrange: "#FF6437",
} as const;

export const sectionGradients = {
  hero: { from: "#1DB954", to: "#121212" },
  genres: { from: "#8B5CF6", to: "#536AE2" },
  timeline: { from: "#FF6437", to: "#F037A5" },
  prizes: { from: "#FFCC00", to: "#1DB954" },
  sponsors: { from: "#536AE2", to: "#1DB954" },
  outro: { from: "#1DB954", to: "#000000" },
} as const;

export type SectionKey = keyof typeof sectionGradients;
