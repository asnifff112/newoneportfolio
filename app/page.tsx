"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";

export default function Page() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const typingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!heroRef.current || !typingRef.current) return;

   
    gsap.from(".hero-line", {
      y: 80,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: "power4.out",
    });

    gsap.from(imageRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.6,
    });

    
    const chars = typingRef.current.querySelectorAll(".char");

    const typeTl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });

    typeTl
      .set(chars, { opacity: 0 }) 
      .to(chars, {
        opacity: 1,
        stagger: 0.08,
        duration: 0.01,
        ease: "none",
      });
  }, []);

  return (
    <main className="relative z-10">

      
      <section
        id="home"
        ref={heroRef}
        className="min-h-screen flex items-center justify-center px-8"
      >
        <div className="grid md:grid-cols-2 gap-16 max-w-7xl w-full items-center">

         
          <div>
            <p className="hero-line text-sm tracking-widest uppercase opacity-70 mb-4">
              Hello, I’M
            </p>

            <h1 className="hero-line text-6xl md:text-8xl font-bold mb-6">
              Asnif
            </h1>
            <h2
              ref={typingRef}
              className="
                text-2xl md:text-3xl
                font-light
                opacity-80
                mb-8
                flex
              "
            >
              {"Frontend Developer".split("").map((char, i) => (
                <span key={i} className="char inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h2>

            <p className="hero-line max-w-md opacity-70 leading-relaxed">
              I build modern, animated, and high-performance web experiences
              using Next.js, GSAP, and Three.js.
            </p>
          </div>

         
          <div className="relative w-full h-[480px] rounded-3xl overflow-hidden">
            <img
              ref={imageRef}
              src="/asniff.jpeg"   
              alt="Asnif"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/25" />
          </div>

        </div>
      </section>


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
