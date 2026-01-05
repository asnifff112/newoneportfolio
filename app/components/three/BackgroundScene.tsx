"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function FloatingSphere() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.2;
    ref.current.position.y = Math.sin(clock.getElapsedTime()) * 0.3;
  });

  return (
    <Sphere ref={ref} args={[1.2, 64, 64]}>
      <meshStandardMaterial
        color="#9FB8C9"
        roughness={0.4}
        metalness={0.6}
        transparent
        opacity={0.6}
      />
    </Sphere>
  );
}

export default function BackgroundScene() {
  return (
    <Canvas className="fixed inset-0 -z-10">
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} />
      <FloatingSphere />
    </Canvas>
  );
}
