"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Subtle Three.js decoration ---------- */
function FloatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.4;
    meshRef.current.position.y = Math.sin(t) * 0.3;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshStandardMaterial
        color="#C7D8E2"
        roughness={0.35}
        metalness={0.5}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });

      tl.from(formRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }).from(
        imageRef.current,
        {
          scale: 0.9,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        h-screen w-full
        flex items-center justify-center
        px-8
        text-[var(--text)]
      "
    >
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl w-full items-center">

        {/* ---------- CONTACT FORM ---------- */}
        <div ref={formRef}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide">
            Contact
          </h2>

          <p className="opacity-70 mb-8 max-w-md">
            Let’s connect and build something meaningful together.
          </p>

          <div
            className="
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

        {/* ---------- IMAGE + THREE.JS ---------- */}
        <div className="relative w-full h-[420px] rounded-2xl overflow-hidden">
          {/* Photo */}
          <img
            ref={imageRef}
            src="/contact.jpg"   // 🔁 replace with your image
            alt="Contact"
            className="
              absolute inset-0 w-full h-full
              object-cover rounded-2xl
            "
          />

          {/* Glass overlay */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

          {/* Three.js layer */}
          <Canvas className="absolute inset-0">
            <ambientLight intensity={0.6} />
            <directionalLight position={[4, 4, 4]} intensity={1} />
            <FloatingOrb />
          </Canvas>
        </div>
      </div>
    </section>
  );
}
