"use client";

import { useEffect, useRef, useState, useMemo } from "react";

type LogoItem =
  | {
      node: React.ReactNode;
      title?: string;
      href?: string;
    }
  | {
      src: string;
      alt?: string;
      href?: string;
    };

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right";
  gap?: number;
  logoHeight?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  className?: string;
  ariaLabel?: string;
}

export default function LogoLoop({
  logos,
  speed = 120,
  direction = "left",
  gap = 48,
  logoHeight = 40,
  fadeOut = false,
  fadeOutColor = "transparent",
  scaleOnHover = false,
  className = "",
  ariaLabel = "Logo loop",
}: LogoLoopProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!trackRef.current) return;
    setWidth(trackRef.current.scrollWidth);
  }, [logos]);

  const duration = useMemo(() => {
    return width > 0 ? width / speed : 0;
  }, [width, speed]);

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      aria-label={ariaLabel}
      style={
        fadeOut
          ? {
              maskImage: `linear-gradient(to right, transparent, ${fadeOutColor} 10%, ${fadeOutColor} 90%, transparent)`,
              WebkitMaskImage: `linear-gradient(to right, transparent, ${fadeOutColor} 10%, ${fadeOutColor} 90%, transparent)`,
            }
          : undefined
      }
    >
      <div
        ref={trackRef}
        className="flex w-max items-center logoloop-track"
        style={{
          gap: `${gap}px`,
          animation: `logoloop ${duration}s linear infinite`,
          animationDirection: direction === "left" ? "normal" : "reverse",
        }}
      >
        {[...logos, ...logos].map((item, index) => {
          const content =
            "node" in item ? (
              <span
                className={`
                  inline-flex items-center justify-center
                  transition-transform duration-300
                  ${scaleOnHover ? "hover:scale-110" : ""}
                `}
                style={{ height: logoHeight }}
                title={item.title}
              >
                {item.node}
              </span>
            ) : (
              <img
                src={item.src}
                alt={item.alt || ""}
                style={{ height: logoHeight }}
                className="object-contain"
              />
            );

          return item.href ? (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center"
            >
              {content}
            </a>
          ) : (
            <div key={index}>{content}</div>
          );
        })}
      </div>

      {/* KEY CHANGE: PAUSE ON HOVER */}
      <style jsx>{`
        .logoloop-track:hover {
          animation-play-state: paused;
        }

        @keyframes logoloop {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
