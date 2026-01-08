"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

/* ================= HEART ================= */
function AnimatedHeart({
  liked,
  onClick,
}: {
  liked: boolean;
  onClick: () => void;
}) {
  const leftRef = useRef<THREE.Mesh>(null);
  const rightRef = useRef<THREE.Mesh>(null);

  const shape = new THREE.Shape();
  shape.moveTo(0, 1);
  shape.bezierCurveTo(-2, 3, -4, 0, 0, -3);
  shape.bezierCurveTo(4, 0, 2, 3, 0, 1);

  const geometry = new THREE.ShapeGeometry(shape);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const floatY = Math.sin(t) * 0.2;
    const gap = liked ? 0 : 0.5;

    if (leftRef.current && rightRef.current) {
      leftRef.current.position.set(-gap, floatY, 0);
      rightRef.current.position.set(gap, floatY, 0);

      const scale = 1 + Math.sin(t * 2) * 0.04;
      leftRef.current.scale.set(scale, scale, scale);
      rightRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group
      scale={[0.4, 0.4, 0.4]}
      rotation={[0, 0, Math.PI]}
      onClick={onClick}
    >
      <mesh ref={leftRef}>
        <primitive object={geometry} />
        <meshPhysicalMaterial
          color={liked ? "#e11d48" : "#D8CFBC"}
          roughness={0.25}
          metalness={0.1}
          clearcoat={0.6}
        />
      </mesh>

      <mesh ref={rightRef}>
        <primitive object={geometry} />
        <meshPhysicalMaterial
          color={liked ? "#e11d48" : "#D8CFBC"}
          roughness={0.25}
          metalness={0.1}
          clearcoat={0.6}
        />
      </mesh>
    </group>
  );
}

/* ================= CONTACT ================= */
export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        })
        .from([leftRef.current, rightRef.current], {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="
        min-h-screen w-full
        flex items-center justify-center
        px-8
        bg-[var(--bg)]
        text-[var(--text)]
      "
    >
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl w-full">

        {/* ========== LEFT : CONTACT FORM ========== */}
        <div
          ref={leftRef}
          className="
            h-[440px]
            p-8 rounded-2xl
            bg-[var(--surface)]/70
            backdrop-blur-xl
            border border-[var(--accent)]/40
            flex flex-col justify-center
          "
        >
          <h2 className="text-4xl font-bold mb-4">
            Contact
          </h2>

          <p className="opacity-70 mb-6">
            Let’s connect and build something meaningful together.
          </p>

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

        {/* ========== RIGHT : HEART ========== */}
        <div
          ref={rightRef}
          className="
            h-[440px]
            rounded-2xl
            bg-[var(--surface)]/50
            backdrop-blur-xl
            border border-[var(--accent)]/30
            flex flex-col items-center justify-center
          "
        >
          <h3 className="text-2xl font-semibold mb-2">
            Thank You
          </h3>

          <p className="text-sm opacity-60 mb-4">
            Click the heart ❤️
          </p>

          <div className="w-full h-[260px]">
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

      </div>
    </section>
  );
}
