import React from "react";
import { cn } from "@/lib/utils";

interface StarburstProps extends Omit<React.SVGProps<SVGSVGElement>, "points"> {
  points?: number;
  innerRadius?: number;
  outerRadius?: number;
}

export function Starburst({
  className,
  points = 12,
  innerRadius = 50,
  outerRadius = 100,
  fill = "currentColor",
  ...props
}: StarburstProps) {
  const cx = 100;
  const cy = 100;
  const pts = [];

  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (Math.PI * i) / points;
    const x = Number((cx + radius * Math.cos(angle)).toFixed(4));
    const y = Number((cy + radius * Math.sin(angle)).toFixed(4));
    pts.push(`${x},${y}`);
  }

  return (
    <svg
      className={cn("origin-center", className)}
      viewBox="0 0 200 200"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <polygon points={pts.join(" ")} />
    </svg>
  );
}
