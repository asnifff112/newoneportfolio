"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import MovingBanner from "./components/MovingBanner";

import TextPressure from "./components/sections/TextPressure";
import TextType from "./components/sections/TextType";

import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaPhone,
  FaDownload,
} from "react-icons/fa";

export default function Page() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // Hero intro animation
    gsap.from(".hero-line", {
      y: 80,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: "power4.out",
    });
  }, []);

  return (
    <main className="relative z-10 bg-[var(--bg)] text-[var(--text)] overflow-hidden">

      {/* ================= HERO ================= */}
      <section
        id="home"
        ref={heroRef}
        className="min-h-screen flex items-center justify-center px-8"
      >
        <div className="grid md:grid-cols-2 gap-16 max-w-7xl w-full items-center">

          {/* ---------- LEFT CONTENT ---------- */}
          <div>
            <p className="hero-line text-sm tracking-widest uppercase opacity-70 mb-4">
              Hello, I’m
            </p>

            {/* NAME — TEXT PRESSURE */}
            <div className="hero-line mb-6">
              <TextPressure
                text="Asnif"
                minFontSize={140}
                textColor="var(--text)"
              />
            </div>

            {/* ROLE — TEXTTYPE (FIXED) */}
            <div className="hero-line text-2xl md:text-3xl font-light opacity-80 mb-8">
              <TextType
                text={["Frontend Developer"]}
                typingSpeed={75}
                pauseDuration={2000}
                showCursor={true}
                cursorCharacter="|"
              />
            </div>

            <p className="hero-line max-w-md opacity-70 leading-relaxed">
              I build modern, animated, and high-performance web experiences
              using Next.js, GSAP, and Three.js.
            </p>

            {/* ---------- SOCIAL ICONS ---------- */}
            <div className="hero-line mt-6 flex items-center gap-5">
              {[
                {
                  href: "tel:+919746156270",
                  icon: <FaPhone />,
                  label: "Phone",
                },
                {
                  href: "https://instagram.com/4.ziiiii",
                  icon: <FaInstagram />,
                  label: "Instagram",
                },
                {
                  href: "https://linkedin.com/in/Asnif-p",
                  icon: <FaLinkedin />,
                  label: "LinkedIn",
                },
                {
                  href: "https://github.com/asnifff112",
                  icon: <FaGithub />,
                  label: "GitHub",
                },
                {
                  href: "/Asnif p.pdf",
                  icon: <FaDownload />,
                  label: "Resume",
                  download: true,
                },
              ].map(({ href, icon, label, download }) => (
                <a
                  key={label}
                  href={href}
                  download={download}
                  target={download ? undefined : "_blank"}
                  aria-label={label}
                  className="
                    group relative p-3 rounded-full
                    bg-[var(--surface)]
                    text-[var(--text)]
                    transition-all duration-300
                    hover:bg-[var(--accent)]
                    hover:text-black
                    hover:-translate-y-1
                    hover:shadow-lg
                    hover:shadow-[var(--accent)]/40
                  "
                >
                  <span
                    className="
                      absolute inset-0 rounded-full
                      border border-[var(--accent)]/40
                      opacity-0 scale-90
                      group-hover:opacity-100
                      group-hover:scale-110
                      transition-all duration-300
                    "
                  />
                  <span className="relative z-10 text-lg">
                    {icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* ---------- RIGHT IMAGE ---------- */}
          <div className="relative w-full h-[520px] flex items-center justify-center">
            {/* BIG NAME BEHIND IMAGE */}
            <h1
              className="
                absolute
                text-[140px] md:text-[200px]
                font-extrabold
                tracking-tight
                text-[var(--text)]
                opacity-[0.06]
                select-none
                z-0
              "
            >
              Asnif
            </h1>

            {/* BACKGROUND REMOVED IMAGE */}
            <img
              src="/asnif.png"
              alt="Asnif"
              className="
                relative z-10
                h-[420px]
                object-contain
                drop-shadow-2xl
              "
            />
          </div>
        </div>
      </section>

      {/* ================= MOVING BANNER ================= */}
      <MovingBanner />

      {/* ================= SECTIONS ================= */}
      <section id="about" className="min-h-screen">
        <About />
      </section>

      <section id="skills" className="min-h-screen">
        <Skills />
      </section>

      <section id="projects" className="min-h-screen">
        <Projects />
      </section>

      <section id="contact" className="min-h-screen">
        <Contact />
      </section>

    </main>
  );
}
