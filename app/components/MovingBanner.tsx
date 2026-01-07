"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MovingBanner() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 18,
        ease: "linear",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="
        relative
        w-full
        overflow-hidden
        py-6
        bg-[var(--surface)]
        border-y border-white/10
      "
    >
      <div
        ref={trackRef}
        className="
          flex
          w-[200%]
          gap-12
          text-[var(--text)]
          opacity-80
          text-3xl md:text-5xl
          font-semibold
          tracking-widest
          whitespace-nowrap
        "
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i}>FRONT-END</span>
        ))}
      </div>
    </div>
  );
}
