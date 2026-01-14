"use client";

import { useEffect, useRef, useState, useMemo } from "react";

type LogoItem = {
  node: React.ReactNode;
  title?: string;
};

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right";
  gap?: number;
  logoSize?: number;
  className?: string;
}

export default function LogoLoop({
  logos,
  speed = 80,
  direction = "left",
  gap = 56,
  logoSize = 48,
  className = "",
}: LogoLoopProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!trackRef.current) return;
    setWidth(trackRef.current.scrollWidth / 2);
  }, [logos]);

  const duration = useMemo(() => {
    return width > 0 ? width / speed : 0;
  }, [width, speed]);

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div
        ref={trackRef}
        className="flex w-max items-center"
        style={{
          gap,
          animation: `logoloop ${duration}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
          animationDirection: direction === "left" ? "normal" : "reverse",
        }}
      >
        {[...logos, ...logos].map((item, index) => (
          <div
            key={index}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="flex items-center cursor-pointer"
            title={item.title}
          >
            <span
              className="flex items-center justify-center transition-transform duration-300 hover:scale-110"
              style={{ fontSize: logoSize }}
            >
              {item.node}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
