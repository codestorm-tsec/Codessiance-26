"use client";

/**
 * Decorative geometric patterns inspired by Spotify Wrapped 2025 newsroom.
 * Dot grids, wavy stripes, checkered patterns, and line scribbles.
 */

export function DotGrid({
  className = "",
  rows = 4,
  cols = 10,
  dotSize = 24,
  gap = 12,
  color = "currentColor",
}: {
  className?: string;
  rows?: number;
  cols?: number;
  dotSize?: number;
  gap?: number;
  color?: string;
}) {
  const dots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push(
        <circle
          key={`${r}-${c}`}
          cx={c * (dotSize + gap) + dotSize / 2}
          cy={r * (dotSize + gap) + dotSize / 2}
          r={dotSize / 2}
          fill={color}
        />
      );
    }
  }

  const width = cols * (dotSize + gap) - gap;
  const height = rows * (dotSize + gap) - gap;

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      aria-hidden="true"
    >
      {dots}
    </svg>
  );
}

export function WavyStripes({
  className = "",
  stripes = 6,
  color = "currentColor",
}: {
  className?: string;
  stripes?: number;
  color?: string;
}) {
  const paths = [];
  for (let i = 0; i < stripes; i++) {
    const y = 20 + i * 28;
    paths.push(
      <path
        key={i}
        d={`M0 ${y} Q 60 ${y - 15}, 120 ${y} T 240 ${y} T 360 ${y} T 480 ${y}`}
        stroke={color}
        strokeWidth={i % 2 === 0 ? 8 : 5}
        fill="none"
        opacity={0.8 - i * 0.1}
      />
    );
  }

  return (
    <svg
      className={className}
      viewBox="0 0 480 200"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {paths}
    </svg>
  );
}

export function CheckeredPattern({
  className = "",
  size = 40,
  cols = 8,
  rows = 4,
  color1 = "#000",
  color2 = "#F0EDEA",
  warp = false,
}: {
  className?: string;
  size?: number;
  cols?: number;
  rows?: number;
  color1?: string;
  color2?: string;
  warp?: boolean;
}) {
  const rects = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isBlack = (r + c) % 2 === 0;
      rects.push(
        <rect
          key={`${r}-${c}`}
          x={c * size}
          y={r * size}
          width={size}
          height={size}
          fill={isBlack ? color1 : color2}
        />
      );
    }
  }

  return (
    <svg
      className={className}
      viewBox={`0 0 ${cols * size} ${rows * size}`}
      width={cols * size}
      height={rows * size}
      style={warp ? { transform: "perspective(400px) rotateY(-15deg) rotateX(5deg)" } : undefined}
      aria-hidden="true"
    >
      {rects}
    </svg>
  );
}

export function LineScribble({
  className = "",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 180 C 40 120, 80 160, 100 100 S 160 40, 180 20"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <path
        d="M30 170 C 50 130, 70 150, 110 90 S 150 50, 170 30"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        opacity={0.5}
      />
      <ellipse
        cx="60"
        cy="140"
        rx="40"
        ry="30"
        stroke={color}
        strokeWidth={2}
        transform="rotate(-20 60 140)"
      />
    </svg>
  );
}

export function VerticalBars({
  className = "",
  bars = 6,
  color = "currentColor",
}: {
  className?: string;
  bars?: number;
  color?: string;
}) {
  const barElements = [];
  for (let i = 0; i < bars; i++) {
    barElements.push(
      <rect
        key={i}
        x={i * 22}
        y={0}
        width={12}
        height={120}
        fill={color}
        rx={2}
      />
    );
  }

  return (
    <svg
      className={className}
      viewBox={`0 0 ${bars * 22} 120`}
      width={bars * 22}
      height={120}
      aria-hidden="true"
    >
      {barElements}
    </svg>
  );
}

export function ConcentricCircles({
  className = "",
  size = 400,
  rings = 10,
  baseColor = "#1A1A1A",
  altColor = "#F0EDEA",
  highlightRing = -1,
  highlightColor = "#1DB954",
}: {
  className?: string;
  size?: number;
  rings?: number;
  baseColor?: string;
  altColor?: string;
  highlightRing?: number;
  highlightColor?: string;
}) {
  const circles = [];
  const maxRadius = size / 2;
  const thickness = maxRadius / rings;
  
  for (let i = 0; i < rings; i++) {
    const isHighlight = i === highlightRing;
    const isAlt = i % 2 !== 0;
    const r = maxRadius - (i * thickness);
    circles.push(
      <circle
        key={i}
        cx={maxRadius}
        cy={maxRadius}
        r={r}
        fill={isHighlight ? highlightColor : (isAlt ? altColor : baseColor)}
      />
    );
  }

  return (
    <svg
      className={className}
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {circles}
    </svg>
  );
}
