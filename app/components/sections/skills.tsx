"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// System Memory Process Data
const skillModules = [
  {
    id: "CORE_LANG",
    sysPath: "/root/bin/core",
    theme: "text-[#00ff41]",
    barColor: "bg-[#00ff41]",
    skills: [
      { name: "JavaScript (ES6+)", pct: 95, hex: "0x7F00", size: "32kb" },
      { name: "HTML5 / CSS3", pct: 98, hex: "0x7F04", size: "16kb" },
      { name: "TypeScript", pct: 90, hex: "0x7F08", size: "64kb" }
    ]
  },
  {
    id: "FRAMEWORKS",
    sysPath: "/root/lib/react",
    theme: "text-cyan-400",
    barColor: "bg-cyan-400",
    skills: [
      { name: "React.js", pct: 98, hex: "0x8A12", size: "128kb" },
      { name: "Next.js (App Router)", pct: 95, hex: "0x8A16", size: "256kb" },
      { name: "Tailwind CSS", pct: 95, hex: "0x8A20", size: "48kb" }
    ]
  },
  {
    id: "GRAPHICS_&_MOTION",
    sysPath: "/root/opt/webgl",
    theme: "text-fuchsia-400",
    barColor: "bg-fuchsia-400",
    skills: [
      { name: "Three.js / R3F", pct: 85, hex: "0x9B44", size: "512kb" },
      { name: "GSAP (GreenSock)", pct: 92, hex: "0x9B48", size: "84kb" },
      { name: "Framer Motion", pct: 85, hex: "0x9B52", size: "42kb" }
    ]
  },
  {
    id: "SYSTEM_TOOLS",
    sysPath: "/usr/local/env",
    theme: "text-yellow-400",
    barColor: "bg-yellow-400",
    skills: [
      { name: "Git / GitHub", pct: 95, hex: "0xC004", size: "12kb" },
      { name: "Vite / Webpack", pct: 80, hex: "0xC008", size: "110kb" },
      { name: "Vercel / CI-CD", pct: 85, hex: "0xC012", size: "0kb (Cloud)" }
    ]
  }
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scanStatus, setScanStatus] = useState("AWAITING_COMMAND");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          onEnter: () => setScanStatus("ALLOCATING_MEMORY..."),
        }
      });

      tl.from(".term-header", { opacity: 0, y: -10, duration: 0.4, ease: "power2.out" });
      tl.from(".skill-block", { opacity: 0, x: -20, stagger: 0.1, duration: 0.5, ease: "power2.out" }, "-=0.2");

      // Progress bar fill animation
      tl.fromTo(".skill-bar-fill", 
        { width: "0%" }, 
        { 
          width: (i, el) => el.getAttribute("data-width") || "0%", 
          duration: 1.5, 
          ease: "expo.out",
          stagger: 0.05,
          onComplete: () => setScanStatus("ALL_PROCESSES_RUNNING [OK]")
        }
      );

      // Percentage and Hex decode animation
      tl.fromTo(".decode-text", { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.05 }, "<");
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full font-mono py-24 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Terminal Window Wrapper */}
        <div className="border border-white/10 bg-[#050505] rounded shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden relative">
          
          {/* Top Bar */}
          <div className="bg-[#111] px-4 py-3 border-b border-white/10 flex justify-between items-center text-[10px] md:text-xs relative z-10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-white/40 uppercase tracking-widest">system_monitor_v2.0</span>
            <span className="text-[#00ff41] animate-pulse">● LIVE</span>
          </div>

          <div className="p-6 md:p-10 relative z-10">
            
            {/* Terminal Command Header */}
            <div className="term-header mb-10 border-l-2 border-[#00ff41] pl-4">
               <p className="flex items-center gap-2 text-xs md:text-sm mb-2">
                  <span className="text-red-500 font-bold">root@asnif:~#</span> 
                  <span className="text-white">htop --view=skills --format=matrix</span>
               </p>
               <p className="flex items-center gap-2 text-[10px] md:text-xs">
                  <span className="text-white/40">SYS_STATUS:</span> 
                  <span className={scanStatus === "ALLOCATING_MEMORY..." ? "animate-pulse text-yellow-400 font-bold" : "text-[#00ff41] font-bold"}>
                    {scanStatus}
                  </span>
               </p>
            </div>

            {/* Grid of Skill Modules */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-12">
              {skillModules.map((module, mIdx) => (
                <div key={mIdx} className="skill-block relative">
                  
                  {/* Module Header */}
                  <div className="flex justify-between items-end border-b border-white/10 pb-2 mb-4">
                    <h3 className={`text-sm md:text-base font-bold tracking-widest ${module.theme}`}>
                      [{module.id}]
                    </h3>
                    <span className="text-[10px] text-white/30 uppercase">{module.sysPath}</span>
                  </div>

                  {/* Skills List */}
                  <ul className="space-y-5">
                    {module.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="w-full group">
                        
                        {/* Process Info Row */}
                        <div className="flex justify-between items-end mb-2 text-[10px] md:text-xs">
                           <div className="flex items-center gap-3">
                              <span className="text-white/40 group-hover:text-white/80 transition-colors">
                                [{skill.hex}]
                              </span>
                              <span className="text-white/90 font-bold tracking-wide">
                                {skill.name}
                              </span>
                           </div>
                           <div className="flex items-center gap-3 decode-text">
                              <span className="text-white/30 hidden sm:inline">{skill.size}</span>
                              {/* The Percentage Bar */}
                              <span className={`${module.theme} font-bold tracking-widest`}>
                                {skill.pct}%
                              </span>
                           </div>
                        </div>
                        
                        {/* Memory Dump Progress Bar */}
                        <div className="flex items-center gap-2 w-full text-[10px] text-white/30">
                          <span>{`>`}</span>
                          <div className="flex-1 h-1.5 bg-white/5 relative overflow-hidden">
                             {/* The actual animated fill */}
                             <div 
                               className={`skill-bar-fill h-full ${module.barColor} shadow-[0_0_10px_currentColor]`} 
                               data-width={`${skill.pct}%`}
                               style={{ width: "0%" }}
                             />
                             {/* Segmented Overlays to make it look like blocks */}
                             <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,rgba(0,0,0,0.8)_4px,rgba(0,0,0,0.8)_6px)] pointer-events-none" />
                          </div>
                        </div>

                      </li>
                    ))}
                  </ul>

                </div>
              ))}
            </div>

            {/* Bottom Footer Info */}
            <div className="term-header mt-12 pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between text-[10px] text-white/30 gap-2">
               <span>UPTIME: 24d 14h 32m</span>
               <span>LOAD AVG: 0.14, 0.08, 0.04</span>
               <span className="text-[#00ff41]/50">SECURE_CONNECTION_ESTABLISHED</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}