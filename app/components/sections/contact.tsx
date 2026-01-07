"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

/* ---------- HEART SHAPE (THREE.JS) ---------- */
function AnimatedHeart({
  liked,
  onClick,
}: {
  liked: boolean;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    // subtle floating + breathing
    meshRef.current.position.y = Math.sin(t) * 0.25;
    const s = 1 + Math.sin(t * 2) * 0.05;
    meshRef.current.scale.set(s, s, s);
  });

  // Heart shape geometry
  const heartShape = new THREE.Shape();
  heartShape.moveTo(0, 0);
  heartShape.bezierCurveTo(0, 0, -1, -1, -2, 0);
  heartShape.bezierCurveTo(-3, 1.5, -1.5, 3, 0, 4);
  heartShape.bezierCurveTo(1.5, 3, 3, 1.5, 2, 0);
  heartShape.bezierCurveTo(1, -1, 0, 0, 0, 0);

  const geometry = new THREE.ShapeGeometry(heartShape);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      onClick={onClick}
      scale={[0.35, 0.35, 0.35]}
      rotation={[0, 0, Math.PI]} 
    >
      <meshStandardMaterial
        color={liked ? "#ef4444" : "#D8CFBC"} 
        roughness={0.35}
        metalness={0.2}
      />
    </mesh>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        })
        .from(formRef.current, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        })
        .from(
          visualRef.current,
          {
            y: 40,
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
        min-h-screen w-full
        flex items-center justify-center
        px-8
        bg-[var(--bg)]
        text-[var(--text)]
      "
    >
      <div className="grid md:grid-cols-2 gap-14 max-w-6xl w-full items-center">

      
        <div ref={formRef}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Contact
          </h2>

          <p className="opacity-70 mb-8 max-w-md">
            Let’s connect and build something meaningful together.
          </p>

          <div
            className="
              p-8 rounded-2xl
              bg-[var(--surface)]/70
              backdrop-blur-xl
              border border-[var(--accent)]/40
            "
          >
            <form className="flex flex-col gap-4">
              <input
                placeholder="Your Name"
                className="
                  px-4 py-3 rounded-lg bg-transparent
                  border border-[var(--accent)]/40
                  outline-none placeholder:text-[var(--text)]/50
                "
              />
              <input
                placeholder="Your Email"
                className="
                  px-4 py-3 rounded-lg bg-transparent
                  border border-[var(--accent)]/40
                  outline-none placeholder:text-[var(--text)]/50
                "
              />
              <textarea
                rows={4}
                placeholder="Your Message"
                className="
                  px-4 py-3 rounded-lg bg-transparent
                  border border-[var(--accent)]/40
                  outline-none resize-none
                  placeholder:text-[var(--text)]/50
                "
              />

              <button
                type="submit"
                className="
                  mt-4 py-3 rounded-lg
                  bg-[var(--accent)]
                  text-black font-medium
                  hover:opacity-90 transition
                "
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

      
        <div
          ref={visualRef}
          className="
            relative w-full h-[420px]
            rounded-2xl
            flex flex-col items-center justify-center
            bg-[var(--surface)]/40
            backdrop-blur-xl
            border border-[var(--accent)]/30
          "
        >
          <h3 className="text-2xl font-semibold mb-2">
            Thank You
          </h3>

          <p className="text-sm opacity-70 mb-4">
            Click the heart ❤️
          </p>

          <Canvas camera={{ position: [0, 0, 6] }}>
            <ambientLight intensity={0.9} />
            <directionalLight position={[3, 3, 3]} intensity={1} />
            <AnimatedHeart
              liked={liked}
              onClick={() => setLiked(!liked)}
            />
          </Canvas>
        </div>

      </div>
    </section>
  );
}
