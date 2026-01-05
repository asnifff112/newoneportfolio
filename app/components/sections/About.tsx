"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Three.js subtle shape ---------- */
function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.3;
    meshRef.current.rotation.x = t * 0.2;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.4, 1]} />
      <meshStandardMaterial
        color="#9FB8C9"
        roughness={0.4}
        metalness={0.6}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
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

      tl.from(textRef.current, {
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

        {/* ---------- TEXT CONTENT ---------- */}
        <div ref={textRef}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-wide">
            About Me
          </h2>

          <p className="opacity-90 leading-relaxed mb-4">
            I’m <span className="font-semibold">Asnif</span>, a frontend developer
            focused on building modern, animated, and high-performance web
            experiences.
          </p>

          <p className="opacity-80 leading-relaxed mb-4">
            I specialize in <b>Next.js</b>, <b>TypeScript</b>, <b>GSAP</b>, and{" "}
            <b>Three.js</b>, crafting interfaces that feel smooth, immersive, and
            premium.
          </p>

          <p className="opacity-70 leading-relaxed">
            My goal is to combine clean architecture with creative motion — so
            every interaction feels intentional and memorable.
          </p>
        </div>

        {/* ---------- IMAGE + THREE.JS ---------- */}
        <div className="relative w-full h-[420px] rounded-2xl overflow-hidden">
          {/* Photo */}
          <img
            ref={imageRef}
            src="/profile.jpg"   // 🔁 replace with your image
            alt="Asnif"
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
            <FloatingShape />
          </Canvas>
        </div>
      </div>
    </section>
  );
}
