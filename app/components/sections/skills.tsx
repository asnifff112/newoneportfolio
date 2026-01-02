"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "GSAP",
  "Three.js",
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll(".skill-card"),
      {
        opacity: 0,
        y: 60,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
        },
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="
        h-full w-full
        flex flex-col items-center justify-center
        px-6
        bg-[var(--bg)]
        text-[var(--text)]
      "
    >
      {/* Heading */}
      <h2 className="text-4xl font-bold mb-4 tracking-wide">
        Skills
      </h2>

      <p className="text-sm opacity-70 mb-12 text-center max-w-md">
        Technologies I use to build modern, interactive web experiences.
      </p>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {skills.map((skill) => (
          <div
            key={skill}
            className="
              skill-card
              px-6 py-5
              text-center text-sm tracking-wider
              rounded-2xl
              bg-[var(--surface)]/60
              backdrop-blur-xl
              border border-[var(--accent)]
              hover:bg-[var(--surface-dark)]/70
              hover:scale-105
              transition-all duration-300
            "
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
}
