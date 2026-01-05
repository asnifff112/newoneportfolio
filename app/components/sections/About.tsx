"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll(".about-item"),
      {
        opacity: 0,
        y: 70,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
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
        bg-[var(--surface)]
        text-[var(--text)]
      "
    >
      {/* Heading */}
      <h2 className="about-item text-4xl font-bold mb-6 tracking-wide">
        About Me
      </h2>

      <div
        className="
          about-item
          max-w-3xl
          p-8 md:p-10
          rounded-2xl
          bg-[var(--surface-dark)]/60
          backdrop-blur-xl
          border border-[var(--accent)]
          shadow-xl
        "
      >
        <p className="text-sm md:text-base leading-relaxed opacity-90 mb-4">
          I’m <span className="font-semibold">Asnif</span>, a frontend developer
          focused on building modern, interactive, and visually engaging web
          experiences.
        </p>

        <p className="text-sm md:text-base leading-relaxed opacity-80 mb-4">
          I specialize in <b>Next.js</b>, <b>TypeScript</b>, <b>GSAP</b>, and
          <b> Three.js</b>, creating smooth animations and immersive UI
          interactions that feel premium and intuitive.
        </p>

        <p className="text-sm md:text-base leading-relaxed opacity-70">
          My goal is to blend clean code with creative motion, delivering
          interfaces that are not just functional, but memorable.
        </p>
      </div>
    </div>
  );
}
