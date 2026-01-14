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
  { node: <SiHtml5 />, title: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { node: <SiCss3 />, title: "CSS", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { node: <SiJavascript />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiThreedotjs />, title: "Three.js", href: "https://threejs.org" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
  { node: <SiFigma />, title: "Figma", href: "https://figma.com" },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col justify-center overflow-hidden"
    >
      {/* ---------- TITLE ---------- */}
      <div className="text-center mb-14 px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-3">
          My Skills
        </h2>
        <p className="opacity-70 text-sm md:text-base">
          Technologies I work with daily
        </p>
      </div>

      {/* ---------- LOGO LOOP ---------- */}
      <div className="relative w-full">
        <LogoLoop
          logos={techLogos}
          speed={100}
          direction="left"
          logoHeight={30}
          gap={48}
          scaleOnHover
          fadeOut
          fadeOutColor="var(--bg)"
          ariaLabel="Technology skills"
          className="
            text-[var(--text)]
            [&_.logoloop__node]:text-3xl
            [&_.logoloop__node]:opacity-80
            [&_.logoloop__node]:transition
            [&_.logoloop__node:hover]:opacity-100
            [&_.logoloop__node:hover]:text-[var(--accent)]
          "
        />
      </div>

      {/* ---------- SECOND ROW (OPTIONAL, OPPOSITE DIRECTION) ---------- */}
      <div className="relative w-full mt-10">
        <LogoLoop
          logos={techLogos}
          speed={80}
          direction="right"
          logoHeight={100}
          gap={56}
          fadeOut
          fadeOutColor="var(--bg)"
          ariaLabel="Technology skills secondary"
          className="
            text-[var(--text)]
            opacity-60
            [&_.logoloop__node:hover]:opacity-100
          "
        />
      </div>
    </section>
  );
}
