"use client";

import LogoLoop from "@/app/components/sections/LogoLoop";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiThreedotjs,
  SiTypescript,
  SiGithub,
  SiFigma,
  SiNodedotjs,
  SiTailwindcss,
} from "react-icons/si";

const techLogos = [
  { node: <SiHtml5 />, title: "HTML" },
  { node: <SiCss3 />, title: "CSS" },
  { node: <SiJavascript />, title: "JavaScript" },
  { node: <SiReact />, title: "React" },
  { node: <SiNextdotjs />, title: "Next.js" },
  { node: <SiTypescript />, title: "TypeScript" },
  { node: <SiTailwindcss />, title: "Tailwind CSS" },
  { node: <SiThreedotjs />, title: "Three.js" },
  { node: <SiNodedotjs />, title: "Node.js" },
  { node: <SiGithub />, title: "GitHub" },
  { node: <SiFigma />, title: "Figma" },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col justify-center gap-12"
    >
      {/* TITLE */}
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold">My Skills</h2>
        <p className="opacity-70 mt-2">Technologies I work with</p>
      </div>

      {/* ROW 1 */}
      <LogoLoop
        logos={techLogos}
        speed={90}
        logoSize={56}
        gap={64}
      />

      {/* ROW 2 */}
      <LogoLoop
        logos={techLogos}
        speed={70}
        direction="right"
        logoSize={52}
        gap={60}
        className="opacity-80"
      />

      {/* ROW 3 */}
      <LogoLoop
        logos={techLogos}
        speed={50}
        logoSize={48}
        gap={56}
        className="opacity-60"
      />
    </section>
  );
}
