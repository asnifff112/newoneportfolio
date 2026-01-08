"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "E-Commerce Website",
    tech: "Next.js · TypeScript · GSAP",
    desc: "Modern e-commerce UI with smooth animations and clean UX.",
  },
  {
    title: "3D Portfolio",
    tech: "Three.js · React Three Fiber",
    desc: "Interactive 3D portfolio with scroll-based animations.",
  },
  {
    title: "Landing Page",
    tech: "React · Tailwind · GSAP",
    desc: "High-conversion landing page with motion effects.",
  },
  {
    title: "Dashboard UI",
    tech: "Next.js · Charts · Animations",
    desc: "Responsive admin dashboard with modern UI patterns.",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll(".project-card"),
      {
        opacity: 0,
        y: 80,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.1,
        stagger: 0.15,
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
        bg-[var(--surface-dark)]
        text-[var(--text)]
      "
    >
      
      <h2 className="text-4xl font-bold mb-4 tracking-wide">
        Projects
      </h2>

      <p className="text-sm opacity-70 mb-12 text-center max-w-md">
        Selected works showcasing my frontend and animation skills.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl w-full">
        {projects.map((project, index) => (
          <div
            key={index}
            className="
              project-card
              p-6 rounded-2xl
              bg-[var(--surface)]/60
              backdrop-blur-xl
              border border-[var(--accent)]
              hover:bg-[var(--surface)]/80
              hover:scale-[1.03]
              transition-all duration-300
            "
          >
            <h3 className="text-xl font-semibold mb-2">
              {project.title}
            </h3>

            <p className="text-xs uppercase tracking-widest opacity-60 mb-3">
              {project.tech}
            </p>

            <p className="text-sm opacity-80 leading-relaxed">
              {project.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
