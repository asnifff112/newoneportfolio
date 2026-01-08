"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";


import {  SiCss3, SiFigma, SiGithub, SiHtml5, SiJavascript, SiNextdotjs, SiNodedotjs, SiReact, SiThreedotjs, SiTypescript } from "react-icons/si";

const ICONS = [
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiThreedotjs,
  SiTypescript,
  SiGithub,
  SiFigma,
  SiNodedotjs
  
];

function FloatingIcon({ Icon }: { Icon: any }) {
  const ref = useRef<THREE.Group>(null);

  const data = useMemo(() => ({
    x: (Math.random() - 0.5) * 6,
    y: (Math.random() - 0.5) * 4,
    vx: (Math.random() * 0.3 + 0.15) * (Math.random() > 0.5 ? 1 : -1),
    vy: (Math.random() * 0.3 + 0.15) * (Math.random() > 0.5 ? 1 : -1),
  }), []);

  useFrame((_, delta) => {
    if (!ref.current) return;

    data.x += data.vx * delta;
    data.y += data.vy * delta;

    if (data.x > 3.2 || data.x < -3.2) data.vx *= -1;
    if (data.y > 2.2 || data.y < -2.2) data.vy *= -1;

    ref.current.position.set(data.x, data.y, 0);
  });

  return (
    <group ref={ref}>
      <Html center>
        <Icon size={42} color="white" />
      </Html>
    </group>
  );
}

function FloatingIconsScene() {
  return (
    <>
      {ICONS.map((Icon, i) => (
        <FloatingIcon key={i} Icon={Icon} />
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
 
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-3">
          My Skills
        </h2>
        <p className="text-sm md:text-base opacity-70 text-[var(--text)]">
          Technologies I work with daily
        </p>
      </div>

      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={1} />
          <FloatingIconsScene />
        </Canvas>
      </div>
    </section>
  );
}
