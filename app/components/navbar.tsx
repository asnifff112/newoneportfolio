"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    // BUG FIX: fromTo upayogikkumpol orikkalum opacity 0-il stuck aavilla
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.5 }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-[100] p-4 md:p-6 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto bg-black/40 backdrop-blur-lg border border-[#00ff41]/20 rounded-lg px-6 py-3 shadow-[0_0_20px_rgba(0,255,65,0.1)]">
        
        {/* Left Side: Terminal User Info */}
        <div className="flex items-center gap-2 font-mono text-sm">
          <span className="text-[#00ff41]">guest@asnif:</span>
          <span className="text-white opacity-80">~</span>
          <span className="text-[#00ff41] animate-pulse">_</span>
        </div>

        {/* Right Side: Navigation as Commands */}
        <ul className="hidden md:flex gap-8 font-mono text-xs tracking-tighter">
          {["about", "skills", "projects", "contact"].map((item) => (
            <li key={item} className="group">
              <a
                href={`#${item}`}
                className="flex items-center gap-1 transition-all duration-300"
              >
                <span className="text-[#00ff41] opacity-0 group-hover:opacity-100 transition-opacity">
                  ./
                </span>
                <span className="text-white/60 group-hover:text-[#00ff41] uppercase">
                  {item}
                </span>
                <span className="text-[#00ff41]/30 group-hover:text-[#00ff41]">
                  ()
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Status Indicator */}
        <div className="md:hidden flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-[#00ff41] animate-ping" />
           <span className="text-[#00ff41] font-mono text-[10px]">LIVE_MODE</span>
        </div>

      </div>

      {/* Decorative Scanline effect inside Nav */}
      <style jsx>{`
        nav::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%,
            rgba(0, 0, 0, 0.1) 50%
          ),
          linear-gradient(
            90deg,
            rgba(255, 0, 0, 0.02),
            rgba(0, 255, 0, 0.01),
            rgba(0, 0, 255, 0.02)
          );
          background-size: 100% 2px, 3px 100%;
          pointer-events: none;
          z-index: -1;
        }
      `}</style>
    </nav>
  );
}