"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function Navbar() {
  useEffect(() => {
    gsap.from("nav", {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  return (
    <nav
      className="
        fixed top-0 left-0 w-full z-50
        bg-[var(--bg)]/80 backdrop-blur-md
        border-b border-[var(--surface)]
      "
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-lg font-semibold tracking-wide text-[var(--text)]">
          Asnif
        </h1>

        {/* Links */}
        <ul className="flex gap-8 text-sm text-[var(--muted)]">
          {["about", "skills", "projects", "contact"].map((item) => (
            <li key={item}>
              <a
                href={`#${item}`}
                className="
                  relative
                  transition-colors duration-300
                  hover:text-[var(--text)]
                  after:content-['']
                  after:absolute after:left-0 after:-bottom-1
                  after:w-0 after:h-[1px]
                  after:bg-[var(--text)]
                  after:transition-all after:duration-300
                  hover:after:w-full
                "
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            </li>
          ))}
        </ul>

      </div>
    </nav>
  );
}
