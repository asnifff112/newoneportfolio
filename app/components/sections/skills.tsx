"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useMemo } from "react";

const ICONS = [
  { name: "HTML", src: "/icons/html.png" },
  { name: "CSS", src: "/icons/css-3.png" },
  { name: "JavaScript", src: "/icons/js.png" },
  { name: "React", src: "/icons/react.png" },
  { name: "Next.js", src: "/icons/nextjs.png" },
];

function FloatingIcon({ src }: { src: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, src);

  const data = useMemo(() => ({
    x: (Math.random() - 0.5) * 6,
    y: (Math.random() - 0.5) * 4,
    vx: (Math.random() * 0.35 + 0.15) * (Math.random() > 0.5 ? 1 : -1),
    vy: (Math.random() * 0.35 + 0.15) * (Math.random() > 0.5 ? 1 : -1),
  }), []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    data.x += data.vx * delta;
    data.y += data.vy * delta;

    if (data.x > 3.2 || data.x < -3.2) data.vx *= -1;
    if (data.y > 2.2 || data.y < -2.2) data.vy *= -1;

    meshRef.current.position.set(data.x, data.y, 0);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1.15, 1.15]} />
      <meshBasicMaterial map={texture} transparent opacity={0.95} />
    </mesh>
  );
}

function FloatingIconsScene() {
  return (
    <>
      {ICONS.map(icon => (
        <FloatingIcon key={icon.name} src={icon.src} />
      ))}
    </>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative min-h-screen w-full overflow-hidden bg-[var(--bg)]"
    >
      {/* TEXT */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-3">
          My Skills
        </h2>
        <p className="text-sm md:text-base opacity-70 text-[var(--text)]">
          Technologies I work with daily
        </p>
      </div>

      {/* THREE.JS */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={1} />
          <FloatingIconsScene />
        </Canvas>
      </div>
    </section>
  );
}
