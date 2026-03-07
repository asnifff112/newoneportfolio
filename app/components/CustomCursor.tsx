"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Mouse movement logic
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5, // Smoothness adjust cheyyaam
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    // Hover effects for links and buttons
    const handleHover = () => gsap.to(cursor, { scale: 2, duration: 0.3 });
    const handleUnhover = () => gsap.to(cursor, { scale: 1, duration: 0.3 });

    const interactiveElements = document.querySelectorAll("a, button, .cursor-pointer");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleUnhover);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-5 h-5 bg-[#00ff41] rounded-full pointer-events-none z-[9999] mix-blend-difference shadow-[0_0_15px_#00ff41]"
      style={{ transform: "translate(-50%, -50%)" }}
    />
  );
}