"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";

type Point = {
  x: number;
  y: number;
};

interface TextPressureProps {
  text?: string;
  fontFamily?: string;
  fontUrl?: string;

  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;

  flex?: boolean;
  stroke?: boolean;
  scale?: boolean;

  textColor?: string;
  strokeColor?: string;
  className?: string;

  minFontSize?: number;
}

const dist = (a: Point, b: Point): number => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const getAttr = (
  distance: number,
  maxDist: number,
  minVal: number,
  maxVal: number
): number => {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
};

const debounce = (fn: () => void, delay: number) => {
  let timeoutId: number;
  return () => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(fn, delay);
  };
};

const TextPressure = ({
  text = "Compressa",
  fontFamily = "Compressa VF",
  fontUrl = "https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2",

  width = true,
  weight = true,
  italic = true,
  alpha = false,

  flex = true,
  stroke = false,
  scale = false,

  textColor = "#FFFFFF",
  strokeColor = "#FF0000",
  className = "",

  minFontSize = 24,
}: TextPressureProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const cursorRef = useRef<Point>({ x: 0, y: 0 });

  const [fontSize, setFontSize] = useState<number>(minFontSize);
  const [scaleY, setScaleY] = useState<number>(1);
  const [lineHeight, setLineHeight] = useState<number>(1);

  const chars = text.split("");

  /* ---------------- MOUSE / TOUCH TRACKING ---------------- */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = rect.left + rect.width / 2;
      mouseRef.current.y = rect.top + rect.height / 2;
      cursorRef.current = { ...mouseRef.current };
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  /* ---------------- RESIZE HANDLING ---------------- */
  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;

    const { width: containerW, height: containerH } =
      containerRef.current.getBoundingClientRect();

    let newFontSize = containerW / (chars.length / 2);
    newFontSize = Math.max(newFontSize, minFontSize);

    setFontSize(newFontSize);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();

      if (scale && textRect.height > 0) {
        const ratio = containerH / textRect.height;
        setScaleY(ratio);
        setLineHeight(ratio);
      }
    });
  }, [chars.length, minFontSize, scale]);

  useEffect(() => {
    const debounced = debounce(setSize, 100);
    debounced();
    window.addEventListener("resize", debounced);
    return () => window.removeEventListener("resize", debounced);
  }, [setSize]);

  /* ---------------- ANIMATION LOOP ---------------- */
  useEffect(() => {
    let rafId: number;

    const animate = () => {
      mouseRef.current.x +=
        (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y +=
        (cursorRef.current.y - mouseRef.current.y) / 15;

      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        const maxDist = rect.width / 2;

        spansRef.current.forEach(span => {
          if (!span) return;

          const r = span.getBoundingClientRect();
          const center: Point = {
            x: r.x + r.width / 2,
            y: r.y + r.height / 2,
          };

          const d = dist(mouseRef.current, center);

          const wdth = width ? Math.floor(getAttr(d, maxDist, 5, 200)) : 100;
          const wght = weight ? Math.floor(getAttr(d, maxDist, 100, 900)) : 400;
          const ital = italic ? getAttr(d, maxDist, 0, 1).toFixed(2) : "0";
          const alphaVal = alpha ? getAttr(d, maxDist, 0, 1).toFixed(2) : "1";

          span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${ital}`;
          if (alpha) span.style.opacity = alphaVal;
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [width, weight, italic, alpha]);

  /* ---------------- STYLES ---------------- */
  const styleElement = useMemo(
    () => (
      <style>{`
        @font-face {
          font-family: '${fontFamily}';
          src: url('${fontUrl}');
          font-style: normal;
        }

        .flex {
          display: flex;
          justify-content: space-between;
        }

        .stroke span {
          position: relative;
          color: ${textColor};
        }

        .stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: 3px;
          -webkit-text-stroke-color: ${strokeColor};
        }

        .text-pressure-title {
          color: ${textColor};
        }
      `}</style>
    ),
    [fontFamily, fontUrl, textColor, strokeColor]
  );

  const dynamicClassName = [
    className,
    flex ? "flex" : "",
    stroke ? "stroke" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "transparent",
      }}
    >
      {styleElement}

      <h1
        ref={titleRef}
        className={`text-pressure-title ${dynamicClassName}`}
        style={{
          fontFamily,
          textTransform: "uppercase",
          fontSize,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: "center top",
          margin: 0,
          textAlign: "center",
          userSelect: "none",
          whiteSpace: "nowrap",
          fontWeight: 100,
          width: "100%",
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              spansRef.current[i] = el;
            }}
            data-char={char}
            style={{
              display: "inline-block",
              color: stroke ? undefined : textColor,
            }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;
