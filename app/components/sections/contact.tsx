"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll(".contact-item"),
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
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
        bg-[var(--bg)]
        text-[var(--text)]
      "
    >
      {/* Heading */}
      <h2 className="contact-item text-4xl font-bold mb-4 tracking-wide">
        Contact
      </h2>

      <p className="contact-item text-sm opacity-70 mb-10 text-center max-w-md">
        Let’s connect and build something meaningful together.
      </p>

      {/* Contact Card */}
      <div
        className="
          contact-item
          w-full max-w-md
          p-8 rounded-2xl
          bg-[var(--surface)]/60
          backdrop-blur-xl
          border border-[var(--accent)]
          shadow-xl
        "
      >
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="
              px-4 py-3 rounded-lg
              bg-transparent
              border border-[var(--accent)]
              outline-none
              placeholder:text-[var(--text)]/50
            "
          />

          <input
            type="email"
            placeholder="Your Email"
            className="
              px-4 py-3 rounded-lg
              bg-transparent
              border border-[var(--accent)]
              outline-none
              placeholder:text-[var(--text)]/50
            "
          />

          <textarea
            rows={4}
            placeholder="Your Message"
            className="
              px-4 py-3 rounded-lg
              bg-transparent
              border border-[var(--accent)]
              outline-none
              resize-none
              placeholder:text-[var(--text)]/50
            "
          />

          <button
            type="submit"
            className="
              mt-4 py-3 rounded-lg
              bg-[var(--accent)]
              text-black
              font-medium
              hover:bg-[var(--accent-light)]
              transition
            "
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
