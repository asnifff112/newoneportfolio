"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: `#${id}`, offsetY: 50 },
      ease: "power3.inOut",
    });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[var(--surface)]/80 backdrop-blur-lg rounded-full px-6 py-3 border border-[var(--accent)]/20 shadow-xl"
    >
      <ul className="flex gap-8 items-center">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <button
              onClick={() => scrollToSection(id)}
              className={`relative text-sm font-medium transition-colors duration-300 ${
                activeSection === id
                  ? "text-[var(--accent)]"
                  : "text-[var(--text)]/70 hover:text-[var(--text)]"
              }`}
            >
              {label}
              {activeSection === id && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[var(--accent)] rounded-full" />
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}