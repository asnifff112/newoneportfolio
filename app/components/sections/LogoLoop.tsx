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
}

export default function LogoLoop({
  logos,
  speed = 50,
  direction = "left",
  gap = 60,
  logoSize = 56,
}: LogoLoopProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!trackRef.current) return;
    // Calculate width of one set
    setWidth(trackRef.current.scrollWidth / 3);
  }, [logos]);

  const duration = useMemo(() => {
    return width > 0 ? width / speed : 0;
  }, [width, speed]);

  return (
    <div className="relative w-full overflow-hidden select-none">
      <div
        ref={trackRef}
        className="flex w-max items-center will-change-transform"
        style={{
          gap: `${gap}px`,
          /* Separate properties instead of shorthand to avoid conflicting property error */
          animationName: "logoloop",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDirection: direction === "left" ? "normal" : "reverse",
          animationPlayState: paused ? "paused" : "running",
          // Custom property for the translate distance
          "--move-x": `-${width + gap}px`,
        } as React.CSSProperties}
      >
        {[...logos, ...logos, ...logos].map((item, index) => (
          <div
            key={index}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="group flex items-center cursor-pointer px-2"
            title={item.title}
          >
            <span
              className="
                flex items-center justify-center
                transition-all duration-300 ease-out
                group-hover:scale-125
                group-hover:rotate-6
                drop-shadow-md
                brightness-90 group-hover:brightness-110
              "
              style={{ fontSize: logoSize }}
            >
              {item.node}
            </span>
          </div>
        ))}
      </div>

      {/* Side Fade Gradients */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--bg)] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--bg)] to-transparent z-10 pointer-events-none" />

      {/* Injecting keyframes safely */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes logoloop {
          from { transform: translateX(0); }
          to { transform: translateX(var(--move-x)); }
        }
      `}} />
    </div>
  );
}