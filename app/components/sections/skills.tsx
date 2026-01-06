"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

/* ---------- SKILL DATA ---------- */
const skills = [
  { name: "HTML5", color: "#E34F26" },
  { name: "CSS3", color: "#1572B6" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "React", color: "#61DAFB" },
  { name: "Tailwind", color: "#38BDF8" },
  { name: "Redux", color: "#764ABC" },
  { name: "GSAP", color: "#88CE02" },
  { name: "GitHub", color: "#FFFFFF" },
];

/* ---------- 3D ICON SHAPE ---------- */
function FloatingIcon({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    // Subtle motion (not full spin)
    meshRef.current.rotation.y += 0.01;
    meshRef.current.rotation.x = Math.sin(t * 0.6) * 0.2;
    meshRef.current.position.y = Math.sin(t) * 0.15;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={color}
        roughness={0.4}
        metalness={0.6}
      />
    </mesh>
  );
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  /* ---------- GSAP ENTRY ---------- */
  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll(".skill-card"),
      { opacity: 0, y: 60, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="
        min-h-screen w-full
        flex flex-col items-center justify-center
        px-8
        text-[var(--text)]
      "
    >
      {/* ---------- TITLE ---------- */}
      <h2 className="text-5xl font-bold mb-4 tracking-wide">
        My Skills
      </h2>

      <p className="text-sm opacity-70 mb-14 text-center max-w-md">
        Technologies I use to build modern, interactive web experiences.
      </p>

      {/* ---------- GRID ---------- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="
              skill-card
              relative
              w-[180px] h-[200px]
              rounded-2xl
              bg-[var(--surface-dark)]/70
              backdrop-blur-xl
              border border-white/10
              shadow-xl
              flex flex-col items-center justify-center
              hover:scale-105
              transition-transform duration-300
            "
          >
            {/* ---------- 3D ICON ---------- */}
            <div className="w-full h-[110px]">
              <Canvas camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={0.9} />
                <directionalLight position={[3, 3, 3]} intensity={1.2} />
                <FloatingIcon color={skill.color} />
              </Canvas>
            </div>

            {/* ---------- LABEL ---------- */}
            <p className="mt-4 text-sm tracking-wider opacity-90">
              {skill.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
