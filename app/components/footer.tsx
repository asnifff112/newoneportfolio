"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function Footer() {
  useEffect(() => {
    gsap.from(".footer", {
      opacity: 0,
      y: 80,
      duration: 1.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <div
      className="
        footer h-full
        flex flex-col items-center justify-center
        bg-[var(--surface-dark)]
        text-[var(--text)]
        px-6
      "
    >
      <h2 className="text-4xl font-bold mb-4 tracking-wide">
        Asnif
      </h2>
      <p className="text-sm opacity-70 mb-8 text-center max-w-md">
        Frontend Developer building immersive web experiences with
        Next.js, GSAP & Three.js
      </p>

   
      <div className="w-40 h-[1px] bg-[var(--accent)] mb-8" />

     
      <div className="flex gap-6 text-sm uppercase tracking-widest">
        <a
          href="https://github.com/asnifff112"
          target="_blank"
          className="hover:text-[var(--accent-light)] transition"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/asnif"
          target="_blank"
          className="hover:text-[var(--accent-light)] transition"
        >
          LinkedIn
        </a>
        <a
          href="mailto:asnifkl@gmail.com"
          className="hover:text-[var(--accent-light)] transition"
        >
          Email
        </a>
      </div>

     
      <p className="mt-10 text-xs opacity-50">
        © {new Date().getFullYear()} Asnif · All rights reserved
      </p>
    </div>
  );
}
