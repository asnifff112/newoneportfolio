"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import About from "@/app/components/sections/About";
import Skills from "@/app/components/sections/Skills";
import Projects from "@/app/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>(".section");

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <main>
      <section id="about" className="section h-screen">
        <About />
      </section>

      <section id="skills" className="section h-screen">
        <Skills />
      </section>

      <section id="projects" className="section h-screen">
        <Projects />
      </section>

      <section id="contact" className="section h-screen">
        <Contact />
      </section>

      <section className="section h-screen">
        <Footer />
      </section>
    </main>
  );
}
