"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

/* ---------- 3D TEXT : ASNIF (SUBTLE ANIMATION) ---------- */
function AsnifText() {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, mouse }) => {
    if (!textRef.current) return;

    const t = clock.getElapsedTime();

    // ✅ Subtle premium motion (NO FULL ROTATION)
    textRef.current.position.y = Math.sin(t * 1.2) * 0.15;
    textRef.current.rotation.x = mouse.y * 0.15;
    textRef.current.rotation.y = mouse.x * 0.15;
  });

  return (
    <Text
      ref={textRef}
      fontSize={1.8}
      letterSpacing={-0.06}
      position={[0, 0, 0]}
      color="#565449" 
    >
      ASNIF
    </Text>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const threeRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      threeRef.current,
      { x: -120, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      textRef.current,
      { x: 120, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        min-h-screen w-full
        flex items-center justify-center
        px-10
        text-[var(--text)]
      "
    >
      <div className="grid md:grid-cols-2 gap-20 max-w-7xl w-full items-center">

        
        <div
          ref={threeRef}
          className="
            relative w-full h-[420px]
            rounded-3xl overflow-hidden
            bg-black/40
            backdrop-blur-xl
            border border-white/10
            shadow-2xl
          "
        >
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={1.4} />
            <pointLight position={[-5, -5, 5]} intensity={0.6} />

            <AsnifText />
          </Canvas>
        </div>

       
        <div ref={textRef}>
          <h2 className="text-5xl font-bold mb-6 tracking-wide">
            About Me
          </h2>

          <p className="opacity-90 leading-relaxed mb-5">
            I’m <span className="font-semibold">Asnif</span>, a frontend developer
            passionate about building modern, animated, and high-performance web
            experiences.
          </p>

          <p className="opacity-80 leading-relaxed mb-5">
            I mainly work with{" "}
            <b>Next.js</b>, <b>TypeScript</b>, <b>GSAP</b>, and{" "}
            <b>Three.js</b> to craft smooth, immersive, and premium interfaces.
          </p>

          <p className="opacity-70 leading-relaxed">
            I believe great UI is a balance of motion, clarity, and intention.
          </p>
        </div>

      </div>
    </section>
  );
}
