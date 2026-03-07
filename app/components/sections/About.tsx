"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scanStatus, setScanStatus] = useState("AWAITING_AUTHORIZATION");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          onEnter: () => setScanStatus("DECRYPTING_USER_DATA..."),
        }
      });

      // Terminal Window scale in
      tl.from(".about-terminal", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: "power3.out"
      });

      // Command line typing
      tl.from(".cmd-line", {
        opacity: 0,
        x: -10,
        duration: 0.3
      });

      // Photo scanning animation
      tl.from(".profile-scan", {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "expo.out"
      }, "-=0.2");

      // Text lines staggered reveal
      tl.from(".about-text-line", {
        opacity: 0,
        x: -20,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => setScanStatus("IDENTITY_VERIFIED [OK]")
      }, "-=0.4");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="w-full font-mono py-24 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Terminal Window */}
        <div className="about-terminal border border-[#00ff41]/20 bg-black rounded shadow-[0_0_40px_rgba(0,255,65,0.05)] overflow-hidden relative">
          
          {/* Top Bar */}
          <div className="bg-[#111] px-4 py-3 border-b border-[#00ff41]/20 flex justify-between items-center text-[10px] md:text-xs relative z-10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-white/40 uppercase tracking-widest">asnif_identity_module</span>
            <span className="text-[#00ff41]">v1.0.0</span>
          </div>

          <div className="p-6 md:p-10 relative z-10 flex flex-col lg:flex-row gap-10 md:gap-16">
            
            {/* Left Column: Stylized Profile Scanner */}
            <div className="profile-scan lg:w-1/3 flex flex-col items-center justify-start relative">
               
               {/* Image Container with Scanning Effect */}
               <div className="w-48 h-48 md:w-64 md:h-64 relative border border-[#00ff41]/40 bg-[#00ff41]/5 p-2 overflow-hidden group">
                  {/* Decorative corners */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00ff41]" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00ff41]" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00ff41]" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00ff41]" />

                  {/* Scanning Laser Line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#00ff41] shadow-[0_0_15px_#00ff41] z-20 animate-[scan_2s_ease-in-out_infinite]" />
                  
                  {/* Image (Replace with your actual photo path) */}
                  <div className="relative w-full h-full overflow-hidden bg-black mix-blend-screen">
                     <div className="absolute inset-0 bg-[#00ff41]/20 mix-blend-color z-10" />
                     {/* UPDATE YOUR IMAGE PATH HERE */}
                     <img 
                       src='/img/asii.hous.jpeg'
                       alt="Asnif Identity" 
                       className="w-full h-full object-cover grayscale contrast-125 opacity-80"
                     />
                     {/* Static Overlay */}
                     <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.1)_1px,transparent_1px)] bg-[size:100%_3px] pointer-events-none z-20" />
                  </div>
               </div>

               {/* Bio-metric Status */}
               <div className="mt-6 w-full text-center border border-[#00ff41]/20 bg-[#00ff41]/5 py-2">
                  <p className="text-[10px] text-[#00ff41] tracking-widest uppercase">
                    MATCH FOUND: 99.9%
                  </p>
                  <p className="text-[9px] text-white/40 mt-1">ID: ASNIF-7X9-DEV</p>
               </div>
            </div>

            {/* Right Column: Bio Data Terminal output */}
            <div className="lg:w-2/3 flex flex-col text-xs md:text-sm">
               
               <div className="cmd-line mb-6 border-l-2 border-[#00ff41] pl-4">
                 <p className="text-white">
                   <span className="text-red-500 font-bold">root@asnif:~#</span> whoami --verbose
                 </p>
                 <p className="mt-2 text-[10px] md:text-xs">
                    <span className="text-[#00ff41]">{`>`} STATUS:</span> 
                    <span className={scanStatus === "DECRYPTING_USER_DATA..." ? "animate-pulse text-yellow-400 font-bold ml-2" : "text-[#00ff41] font-bold ml-2"}>
                      {scanStatus}
                    </span>
                 </p>
               </div>

               <div className="space-y-4 text-white/70">
                 
                 {/* Key-Value Pairs */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="about-text-line flex flex-col border border-white/5 bg-white/[0.02] p-3">
                     <span className="text-[#00ff41]/50 text-[10px] mb-1">[ DESIGNATION ]</span>
                     <span className="text-white font-bold tracking-wide">Creative Frontend Developer</span>
                   </div>
                   <div className="about-text-line flex flex-col border border-white/5 bg-white/[0.02] p-3">
                     <span className="text-[#00ff41]/50 text-[10px] mb-1">[ BASE_LOCATION ]</span>
                     <span className="text-white font-bold tracking-wide">Kerala, India</span>
                   </div>
                 </div>

                 {/* Main Bio Text */}
                 <div className="about-text-line border border-white/5 bg-white/[0.02] p-4 mt-4 relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#00ff41]/50" />
                    <p className="leading-relaxed mb-4">
                      {`> `} I am a frontend developer specializing in building high-performance, immersive web experiences. I bridge the gap between heavy technical architecture and smooth, creative UI/UX.
                    </p>
                    <p className="leading-relaxed text-white/50">
                      {`> `} With expertise in Next.js, React, and TypeScript, combined with advanced animation libraries like GSAP and Three.js, I engineer digital environments that are not just usable, but memorable. My current mission involves pushing the boundaries of what browsers can render natively.
                    </p>
                 </div>

                 {/* Directives / Interests */}
                 <div className="about-text-line flex flex-col gap-2 mt-4 pt-4 border-t border-white/10">
                    <span className="text-[#00ff41] text-[10px] uppercase tracking-widest mb-2">CURRENT_DIRECTIVES:</span>
                    <p className="text-white/60 flex items-center gap-2">
                       <span className="text-cyan-400">[*]</span> Optimizing UI/UX micro-interactions.
                    </p>
                    <p className="text-white/60 flex items-center gap-2">
                       <span className="text-cyan-400">[*]</span> Architecting seamless 3D web configurations.
                    </p>
                    <p className="text-white/60 flex items-center gap-2">
                       <span className="text-cyan-400">[*]</span> Compiling reality into the DOM.
                    </p>
                 </div>

               </div>
            </div>

          </div>
        </div>
      </div>

      {/* Custom Animation for Scanner Laser */}
      <style jsx>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}