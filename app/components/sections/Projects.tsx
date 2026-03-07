"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    title: "Anatomy - 3D Hub",
    tech: "Next.js · Three.js · GSAP",
    desc: "Interactive 3D automotive visualization with 360° views and cinematic part breakdowns.",
    image: "/anatomy.png",
    link: "#",
    github: "https://github.com/asnifff112/anatomy.git"
  },
  {
    title: "Thriftrobe E-com",
    tech: "Next.js · Redux · Tailwind",
    desc: "Fashion store with custom admin dashboard, CRUD operations, and smooth user flow.",
    image: "/thriftrobe.png",
    link: "#",
    github: "https://github.com/asnifff112/thriftrobeee.git"
  },
  {
    title: "3D Solar System",
    tech: "Three.js · R3F · Physics",
    desc: "Frame-synced orbital simulation of 8+ planets maintaining high performance ~60 FPS.",
    image: "/solarsystem.png",
    link: "#",
    github: "https://github.com/asnifff112/three.js.git"
  },
  {
    title: "Timesync E-commerce",
    tech: "Next.js · Tailwind · Framer · Recharts",
    desc: "A premium horology platform featuring a curated collection of luxury timepieces with smooth animations and real-time sales analytics.",
    image: "/timesync.png",
    link: "#",
    github: "https://github.com/asnifff112/Time-sync.git"
  },
];

export default function Projects() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("AWAITING_EXECUTION");
  const [hexCode, setHexCode] = useState("0x0000");
  
  const windowRef = useRef(null);
  const sectionRef = useRef(null);

  // Decryption Loading Animation Logic
  useEffect(() => {
    if (isDecrypting) {
      let p = 0;
      const statusMessages = [
        "BYPASSING_FIREWALL...",
        "DECRYPTING_ARCHIVE...",
        "EXTRACTING_ASSETS...",
        "COMPILING_DOM...",
        "INJECTING_STYLES..."
      ];

      const interval = setInterval(() => {
        // Randomly jump progress
        p += Math.floor(Math.random() * 15) + 5;
        
        if (p >= 100) {
          p = 100;
          setProgress(100);
          setStatusText("ACCESS_GRANTED");
          setHexCode("0xFFFF");
          clearInterval(interval);
          
          // Wait half a second before opening the terminal window
          setTimeout(() => {
            setIsDecrypting(false);
            setIsOpen(true);
          }, 600);
        } else {
          setProgress(p);
          setStatusText(statusMessages[Math.floor(Math.random() * statusMessages.length)]);
          // Generate random Hex code for extra hacker vibe
          setHexCode("0x" + Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, '0'));
        }
      }, 150); // Speed of the loading bar

      return () => clearInterval(interval);
    }
  }, [isDecrypting]);

  // Terminal Window Open Animation
  useEffect(() => {
    if (isOpen) {
      const ctx = gsap.context(() => {
        gsap.fromTo(windowRef.current, 
          { scale: 0.95, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }
        );
        
        gsap.fromTo(".proj-card", 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: "power2.out", delay: 0.2 }
        );
      });
      return () => ctx.revert();
    }
  }, [isOpen]);

  const handleStartDecryption = () => {
    if (!isDecrypting && !isOpen) {
      setIsDecrypting(true);
    }
  };

  return (
    <section ref={sectionRef} id="projects" className="min-h-screen w-full py-32 bg-[#0a0a0a] flex flex-col items-center justify-center relative overflow-hidden font-mono">
      
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-[#00ff41]/[0.02] select-none pointer-events-none uppercase tracking-widest">
        SYSTEM_ARCHIVE
      </div>

      <div className="max-w-7xl w-full px-4 md:px-6 relative z-10 flex flex-col items-center">
        
        {/* ================= CLOSED / LOADING STATE ================= */}
        {!isOpen && (
          <div className="w-full max-w-md bg-black border border-[#00ff41]/30 p-1 shadow-[0_0_30px_rgba(0,255,65,0.05)] relative group transition-all duration-300">
            {/* Inner frame */}
            <div className="border border-[#00ff41]/20 p-6 md:p-8 relative overflow-hidden">
              
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
              
              <div className="relative z-10">
                <p className="text-[#00ff41] text-xs font-bold mb-1">TARGET: PORTFOLIO_PROJECTS.BIN</p>
                <p className="text-white/40 text-[10px] mb-8 uppercase tracking-widest">Encryption: AES-256 | Size: 4.2GB</p>

                {!isDecrypting ? (
                  // Initial Button State
                  <button 
                    onClick={handleStartDecryption}
                    className="w-full py-3 bg-[#00ff41]/10 border border-[#00ff41] text-[#00ff41] font-bold text-xs tracking-[0.2em] hover:bg-[#00ff41] hover:text-black transition-all group-hover:shadow-[0_0_15px_rgba(0,255,65,0.4)] relative overflow-hidden"
                  >
                    <span className="relative z-10">[ INITIATE_DECRYPTION ]</span>
                    {/* Hover effect scanline */}
                    <div className="absolute top-0 left-[-100%] w-full h-full bg-white/20 skew-x-[-45deg] group-hover:animate-[slideRight_0.5s_ease-out_forwards]" />
                  </button>
                ) : (
                  // Decrypting Loading State
                  <div className="w-full">
                    <div className="flex justify-between text-[10px] mb-2 font-bold uppercase tracking-widest">
                       <span className={progress === 100 ? "text-[#00ff41]" : "text-yellow-400 animate-pulse"}>
                         {statusText}
                       </span>
                       <span className="text-[#00ff41]">{hexCode}</span>
                    </div>
                    
                    {/* The Progress Bar */}
                    <div className="w-full h-3 border border-[#00ff41]/50 p-[1px] bg-black/50 relative">
                       <div 
                         className="h-full bg-[#00ff41] transition-all duration-100 ease-out shadow-[0_0_10px_#00ff41]" 
                         style={{ width: `${progress}%` }}
                       />
                       {/* Grid overlay to make it look segmented */}
                       <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,black_4px,black_6px)] pointer-events-none" />
                    </div>
                    
                    <div className="flex justify-between text-[10px] mt-2 text-[#00ff41]">
                       <span>PROGRESS</span>
                       <span className="font-bold">{progress}%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= OPEN TERMINAL STATE ================= */}
        {isOpen && (
          <div 
            ref={windowRef}
            className="w-full max-w-6xl bg-black border border-[#00ff41]/50 rounded shadow-[0_0_50px_rgba(0,255,65,0.15)] overflow-hidden flex flex-col"
          >
            {/* Terminal Header */}
            <div className="bg-[#00ff41]/10 px-4 py-3 flex justify-between items-center border-b border-[#00ff41]/50">
              <div className="flex gap-2">
                <button onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-red-500 hover:shadow-[0_0_10px_red] transition-all cursor-pointer" title="Close" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="hidden md:flex items-center gap-2 text-[#00ff41] text-[10px] tracking-widest uppercase font-bold">
                 <span>guest@asnif: ~/portfolio/projects</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-[10px] text-[#00ff41]/80 hover:text-white uppercase transition-colors font-bold tracking-widest">
                [ CLOSE ]
              </button>
            </div>

            {/* Terminal Content Area */}
            <div className="p-4 md:p-8 max-h-[75vh] overflow-y-auto custom-scrollbar relative bg-[#050505]">
              
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.02)_1px,transparent_1px)] bg-[size:100%_3px] z-0" />

              <div className="mb-6 text-[#00ff41] text-xs md:text-sm relative z-10 font-bold">
                <p>{`> DECRYPTION SUCCESSFUL...`}</p>
                <p>{`> FOUND ${projects.length} REPOSITORIES.`}</p>
                <p className="opacity-50 mt-1">----------------------------------------</p>
              </div>

              {/* Grid Layout Fix & Text Visibility Fix */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                {projects.map((proj, idx) => (
                  <div key={idx} className="proj-card group relative bg-[#0a0a0a] border border-[#00ff41]/40 p-5 hover:border-[#00ff41] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] flex flex-col">
                    
                    {/* Project Image */}
                    <div className="relative aspect-video overflow-hidden mb-5 border border-[#00ff41]/20 bg-[#00ff41]/5">
                      <div className="absolute inset-0 bg-[#00ff41]/10 mix-blend-color z-10 group-hover:opacity-0 transition-opacity duration-500" />
                      <img 
                        src={proj.image} 
                        alt={proj.title} 
                        // Reduced grayscale to make images clearer
                        className="w-full h-full object-cover grayscale-[30%] opacity-90 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                      />
                    </div>
                    
                    {/* Project Details */}
                    <div className="flex-1 flex flex-col space-y-3">
                      <div>
                         <p className="text-[#00ff41] text-[10px] font-bold uppercase tracking-[0.1em] mb-2">
                           [ {proj.tech.split('·').join(' | ')} ]
                         </p>
                         {/* Bright White Title */}
                         <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-[#00ff41] transition-colors">
                           {proj.title}
                         </h3>
                      </div>
                      
                      {/* Lighter description text for readability */}
                      <p className="text-sm text-gray-300 leading-relaxed flex-1 font-sans">
                        {`> ${proj.desc}`}
                      </p>

                      {/* Action Links */}
                      <div className="flex gap-4 pt-5 border-t border-[#00ff41]/20 mt-auto">
                        <a href={proj.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:border-[#00ff41] hover:bg-[#00ff41]/10 text-xs text-white hover:text-[#00ff41] transition-all uppercase tracking-widest font-bold rounded-sm">
                          <FaGithub className="text-sm" /> Source
                        </a>
                        <a href={proj.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-[#00ff41]/10 border border-[#00ff41]/30 hover:border-[#00ff41] hover:bg-[#00ff41]/20 text-xs text-[#00ff41] hover:text-white transition-all uppercase tracking-widest font-bold rounded-sm">
                          <FaExternalLinkAlt className="text-sm" /> Live_Deploy
                        </a>
                      </div>
                    </div>

                    {/* Hacker Brackets on Hover */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00ff41] opacity-30 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00ff41] opacity-30 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Terminal Footer Bar */}
            <div className="bg-[#00ff41]/10 px-6 py-2 border-t border-[#00ff41]/50 flex justify-between items-center text-[10px] text-[#00ff41]/80 uppercase tracking-widest font-bold">
              <span>STATUS: IDLE</span>
              <span className="animate-pulse">_</span>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideRight {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #050505; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 255, 65, 0.4); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 255, 65, 0.9); }
      `}</style>
    </section>
  );
}