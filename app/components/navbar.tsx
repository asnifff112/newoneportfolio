"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);

const navItems = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  useEffect(() => {
    // Navbar entry animation
    gsap.from(".nav", {
      y: -80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });

    // Active section highlight
    navItems.forEach((item) => {
      ScrollTrigger.create({
        trigger: `#${item.id}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActive(item.id),
        onEnterBack: () => setActive(item.id),
      });
    });
  }, []);

  const setActive = (id: string) => {
    document.querySelectorAll(".nav-link").forEach((el) => {
      el.classList.remove("active");
    });
    document.getElementById(`nav-${id}`)?.classList.add("active");
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;

    gsap.to(window, {
      scrollTo: section,
      duration: 1.2,
      ease: "power3.inOut",
    });
  };

  return (
    <nav
      className="
        nav fixed top-6 left-1/2 -translate-x-1/2
        z-50 px-10 py-4
        flex gap-8 items-center
        rounded-2xl
        bg-[var(--surface-dark)]/50
        backdrop-blur-2xl
        border border-[var(--accent)]
        shadow-xl
      "
    >
      {navItems.map((item) => (
        <button
          key={item.id}
          id={`nav-${item.id}`}
          onClick={() => scrollToSection(item.id)}
          className="
            nav-link relative text-sm uppercase tracking-widest
            text-[var(--text-muted)]
            transition-all duration-300
          "
        >
          {item.label}
        </button>
      ))}

      <style jsx>{`
        .nav-link.active {
          color: var(--text);
        }

        .nav-link.active::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -6px;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-light);
        }
      `}</style>
    </nav>
  );
}
