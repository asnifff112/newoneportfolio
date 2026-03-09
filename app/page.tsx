"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";

// Sections & Components
import About from "./components/sections/About";
import Skills from "@/app/components/sections/skills"
import Projects from "./components/sections/Projects";
import Contact from "@/app/components/sections/contact"
import MovingBanner from "./components/MovingBanner";
import Navbar from "@/app/components/navbar"; 
import TerminalEntry from "./components/sections/TerminalEntry"; 
import TextPressure from "./components/sections/TextPressure";
import TextType from "./components/sections/TextType";
import DomeGallery from '@/components/DomeGallery';

import { FaTimes, FaPhone, FaInstagram, FaLinkedin, FaGithub, FaDownload } from "react-icons/fa";

export default function Page() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isBooted, setIsBooted] = useState(false); 
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    setMounted(true);
    setSessionId(Math.random().toString(36).substring(7).toUpperCase());
  }, []);

  useEffect(() => {
    if (isBooted && heroRef.current) {
      const tl = gsap.timeline();
      tl.from(".hero-line", { y: 30, opacity: 0, stagger: 0.15, duration: 1.2, ease: "power4.out" });
      gsap.from(".side-socials", { x: -100, opacity: 0, duration: 1, delay: 0.5, ease: "expo.out" });
    }
  }, [isBooted]);

  if (!mounted) return <div className="bg-[#0d0d0d] min-h-screen" />;

  return (
    <main className="relative z-10 bg-[#0d0d0d] text-[#e0e0e0] font-mono overflow-x-hidden min-h-screen">
      
      {!isBooted ? (
        <div className="fixed inset-0 z-[99999] bg-black">
          <TerminalEntry onAccess={() => setIsBooted(true)} />
        </div>
      ) : (
        <div className="relative w-full animate-in fade-in duration-1000">
          
          <Navbar />

          {/* --- CENTRALLY ALIGNED IMAGE MODAL --- */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[1000000] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-3xl"
                onClick={() => setSelectedImage(null)}
              >
                <motion.div 
                  initial={{ scale: 0.7, opacity: 0, y: 100 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.7, opacity: 0, y: 100 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="relative max-w-5xl w-full bg-[#0a0a0a]/80 border border-[#00ff41]/20 rounded-[3.5rem] overflow-hidden shadow-[0_0_120px_rgba(0,255,65,0.1)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Top Control Bar */}
                  <div className="h-16 border-b border-white/5 bg-white/[0.03] flex items-center justify-between px-10">
                    <div className="flex items-center gap-4">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                      </div>
                      <span className="text-[9px] text-[#00ff41] tracking-[0.5em] font-bold ml-4">DECRYPTED_VIEW // {sessionId}</span>
                    </div>
                    <button onClick={() => setSelectedImage(null)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-[#00ff41]">
                      <FaTimes size={20} />
                    </button>
                  </div>

                  <div className="p-6 md:p-10">
                    <div className="relative group rounded-[2.5rem] overflow-hidden border border-white/10 bg-black">
                      <img src={selectedImage} alt="Preview" className="w-full h-auto max-h-[60vh] object-contain shadow-2xl" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                      {/* Scanning Line */}
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#00ff41]/10 to-transparent h-40 w-full animate-[scan_5s_linear_infinite]" />
                    </div>
                    
                    <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-widest opacity-40 gap-4">
                       <p>SHA-256: {Math.random().toString(16).slice(2,15).toUpperCase()}</p>
                       <p className="text-[#00ff41]">AUTHORIZED_ACCESS_ONLY</p>
                       <p>LOC: 10.74°N / 76.06°E</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Socials - Fixed Position Variety */}
          <div className="side-socials fixed left-8 top-1/2 -translate-y-1/2 z-[100] hidden xl:flex flex-col gap-8 items-center border border-[#00ff41]/10 py-10 px-4 bg-black/40 backdrop-blur-xl rounded-full shadow-[0_0_40px_rgba(0,255,65,0.05)]">
            {[
              { href: "tel:+919746156270", icon: <FaPhone /> },
              { href: "https://instagram.com/4.ziiiii", icon: <FaInstagram /> },
              { href: "https://linkedin.com/in/Asnif-p", icon: <FaLinkedin /> },
              { href: "https://github.com/asnifff112", icon: <FaGithub /> },
              { href: "/Asnifp_resume.pdf", icon: <FaDownload />, download: true },
            ].map((social, i) => (
              <a key={i} href={social.href} download={social.download} target={social.download ? undefined : "_blank"} className="text-xl text-[#00ff41] opacity-30 hover:opacity-100 hover:scale-150 transition-all duration-500 hover:drop-shadow-[0_0_8px_#00ff41]">
                {social.icon}
              </a>
            ))}
            <div className="w-[1px] h-12 bg-gradient-to-b from-[#00ff41]/40 to-transparent mt-2" />
          </div>

          {/* Hero Section */}
          <section id="home" ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-40 hover:opacity-100 transition-opacity duration-1000">
               <DomeGallery grayscale={false} onImageClick={(src: string) => setSelectedImage(src)} />
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0d0d]/40 to-[#0d0d0d] pointer-events-none" />
               <div className="matrix-rain absolute inset-0 opacity-20 pointer-events-none" />
            </div>

            <div className="relative z-20 w-full max-w-5xl pointer-events-none text-center">
              <p className="hero-line text-[10px] tracking-[0.8em] uppercase opacity-40 mb-10 text-[#00ff41]">
                $ initializing_core_identity
              </p>
              
              <div className="hero-line w-full mb-6 select-none pointer-events-auto">
                <TextPressure text="ASNIF" minFontSize={150} textColor="#ffffff" />
              </div>

              <div className="hero-line text-sm md:text-xl font-mono tracking-[0.3em] opacity-90 h-10 flex justify-center items-center gap-4 text-[#ffb300]">
                <span className="text-white/20">CMD:</span>
                <TextType text={["whoami --frontend-dev", "npm run build-future"]} typingSpeed={70} pauseDuration={2500} showCursor />
              </div>
            </div>

            {/* Scroll Indicator Variety */}
            
          </section>

          {/* Other Sections */}
          <div className="relative z-[40] border-t border-white/5 bg-[#0a0a0a]">
            <MovingBanner />
            <section id="about" className="py-24"><About /></section>
            <section id="skills" className="py-24"><Skills /></section>
            <section id="projects" className="py-24"><Projects /></section>
            <section id="contact" className="py-24"><Contact /></section>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(400%); } }
        .matrix-rain {
           background: linear-gradient(rgba(0, 255, 65, 0.05) 1.5px, transparent 1.5px),
                       linear-gradient(90deg, rgba(0, 255, 65, 0.05) 1.5px, transparent 1.5px);
           background-size: 50px 50px;
           animation: shift 40s linear infinite;
        }
        @keyframes shift { from { background-position: 0 0; } to { background-position: 1000px 1000px; } }
      `}</style>
    </main>
  );
}