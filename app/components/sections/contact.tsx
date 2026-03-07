"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";
import { Toaster, toast } from "sonner"; 

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [status, setStatus] = useState("AWAITING_INPUT");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hash, setHash] = useState("0x00000000");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          onEnter: () => setStatus("SECURE_CHANNEL_ESTABLISHED"),
        }
      });

      tl.from(".contact-terminal", { opacity: 0, y: 30, duration: 0.6, ease: "power3.out" });
      tl.from(".log-line", { opacity: 0, x: -10, stagger: 0.1, duration: 0.4 }, "-=0.2");
      tl.from(".input-group", { opacity: 0, y: 10, stagger: 0.15, duration: 0.4 }, "-=0.2");
      tl.from(".network-nodes", { opacity: 0, scale: 0.95, duration: 0.5 }, "-=0.3");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleTransmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("ERROR: INCOMPLETE_PAYLOAD");
      toast.error("Payload Incomplete. Fill all required fields.");
      return;
    }

    setIsTransmitting(true);
    setStatus("ENCRYPTING_PAYLOAD...");
    
    const toastId = toast.loading("Encrypting and routing data packet...");

    const form = e.currentTarget;
    const submitData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xwvregqd", {
        method: "POST",
        body: submitData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setIsTransmitting(false);
        setIsSuccess(true);
        setStatus("TRANSMISSION_SUCCESSFUL [OK]");
        toast.success("Transmission Verified: Message Sent!", { id: toastId });
        
        // Generate a random hex string for the visual receipt
        setHash("0x" + Math.random().toString(16).substr(2, 12).toUpperCase());
        
        setFormData({ name: "", email: "", message: "" });
        form.reset();
        
        setTimeout(() => {
          setIsSuccess(false);
          setStatus("AWAITING_NEW_INPUT");
        }, 5000);
      } else {
        throw new Error("Relay Failed");
      }
    } catch (error) {
      setIsTransmitting(false);
      setStatus("ERROR: TRANSMISSION_FAILED");
      toast.error("Critical Error: Transmission Interrupted.", { id: toastId });
      
      setTimeout(() => setStatus("AWAITING_NEW_INPUT"), 4000);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="w-full font-mono py-24 bg-[#0a0a0a] relative">
      
      <Toaster position="bottom-right" theme="dark" richColors closeButton />

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        <div className="contact-terminal border border-[#00ff41]/30 bg-[#050505] rounded shadow-[0_0_40px_rgba(0,255,65,0.05)] overflow-hidden relative">
          
          <div className="bg-[#111] px-4 py-3 border-b border-[#00ff41]/30 flex justify-between items-center text-[10px] md:text-xs relative z-10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 hover:shadow-[0_0_8px_red] transition-shadow" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:shadow-[0_0_8px_yellow] transition-shadow" />
              <div className="w-3 h-3 rounded-full bg-green-500/80 hover:shadow-[0_0_8px_green] transition-shadow" />
            </div>
            <span className="text-[#00ff41]/70 uppercase tracking-widest font-bold">asnif_secure_relay</span>
            <span className="text-[#00ff41] animate-pulse">● REC</span>
          </div>

          <div className="p-6 md:p-10 relative z-10 flex flex-col lg:flex-row gap-12">
            
            {/* ================= LEFT: TRANSMISSION FORM ================= */}
            <div className="lg:w-3/5 relative">
              
              <div className="mb-8 space-y-2 text-xs md:text-sm">
                 <p className="log-line text-white/50">Initializing secure socket...</p>
                 <p className="log-line text-white/50">Handshake complete. RSA-4096 Key verified.</p>
                 <p className="log-line flex items-center gap-2 mt-4">
                    <span className="text-[#00ff41]">{`>`} SYS_STATE:</span> 
                    <span className={`font-bold ${status.includes("ERROR") ? "text-red-500" : status.includes("SUCCESS") ? "text-[#00ff41]" : "text-[#00ff41]"}`}>
                      {status}
                    </span>
                 </p>
              </div>

              {/* LOADING OVERLAY */}
              {isTransmitting && (
                <div className="absolute inset-0 bg-[#050505]/95 backdrop-blur-md z-30 flex flex-col items-center justify-center border border-[#00ff41]/30 shadow-[0_0_30px_rgba(0,255,65,0.1)] p-6">
                   <div className="flex items-center gap-4 mb-8">
                     <span className="text-[#00ff41] text-2xl animate-[spin_1s_steps(4)_infinite]">|</span>
                     <span className="text-[#00ff41] text-lg font-bold tracking-[0.3em] uppercase">UPLOADING_PAYLOAD</span>
                     <span className="text-[#00ff41] text-2xl animate-[spin_1s_steps(4)_infinite]">|</span>
                   </div>
                   
                   <div className="w-full max-w-[250px] h-1 bg-white/5 relative overflow-hidden mb-6">
                     <div className="absolute top-0 left-0 h-full w-1/3 bg-[#00ff41] shadow-[0_0_10px_#00ff41] animate-[slideStream_1s_linear_infinite]" />
                   </div>

                   <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[9px] text-[#00ff41]/50 font-mono text-left w-full max-w-[300px]">
                     <span>{`>`} ENCRYPTING [ RSA-4096 ]</span>
                     <span className="animate-pulse">{`>`} BYPASSING FIREWALL...</span>
                     <span>{`>`} ROUTING TO MAIN_NODE</span>
                     <span className="animate-pulse">{`>`} HANDSHAKE...</span>
                   </div>
                </div>
              )}

              {/* ================= MASS SUCCESS OVERLAY ================= */}
              {isSuccess && (
                <div className="absolute inset-0 bg-[#050505]/95 backdrop-blur-md z-30 flex flex-col items-center justify-center border-2 border-[#00ff41] shadow-[inset_0_0_50px_rgba(0,255,65,0.15)] overflow-hidden">
                   
                   {/* Background Scanline specifically for success screen */}
                   <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#00ff41_2px,#00ff41_4px)] mix-blend-overlay pointer-events-none" />

                   <div className="relative z-10 flex flex-col items-center w-full px-8">
                     {/* Hardware OK Indicator */}
                     <div className="w-16 h-16 mb-6 bg-[#00ff41]/10 flex items-center justify-center border border-[#00ff41] shadow-[0_0_20px_#00ff41]">
                       <svg className="w-8 h-8 text-[#00ff41] animate-[pulse_1.5s_ease-in-out_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M5 13l4 4L19 7" />
                       </svg>
                     </div>

                     {/* Glitchy Success Text */}
                     <h3 className="text-[#00ff41] text-2xl md:text-3xl font-black tracking-[0.3em] uppercase mb-1 drop-shadow-[0_0_10px_#00ff41] animate-[pulse_2s_infinite]">
                       PAYLOAD_DELIVERED
                     </h3>
                     
                     {/* Data Receipt Log */}
                     <div className="bg-[#00ff41]/5 border border-[#00ff41]/30 p-4 mt-6 text-left w-full max-w-sm backdrop-blur-sm relative">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ff41] to-transparent" />
                        
                        <p className="text-[10px] md:text-xs text-[#00ff41] font-mono mb-2">
                          <span className="opacity-50">{`>`} STATUS:</span> <span className="text-white font-bold ml-2">200_OK</span>
                        </p>
                        <p className="text-[10px] md:text-xs text-[#00ff41] font-mono mb-2">
                          <span className="opacity-50">{`>`} HASH:</span> <span className="text-white/80 ml-2">{hash}</span>
                        </p>
                        <p className="text-[10px] md:text-xs text-[#00ff41] font-mono">
                          <span className="opacity-50">{`>`} NODE:</span> <span className="text-white/80 ml-2">ASNIF_CORE_SERVER</span>
                        </p>
                     </div>

                     {/* Disconnect Warning */}
                     <p className="text-[#00ff41]/50 text-[9px] font-mono mt-8 uppercase tracking-widest animate-pulse">
                       Terminating secure socket in 5s...
                     </p>
                   </div>
                </div>
              )}

              <form ref={formRef} onSubmit={handleTransmit} className="space-y-6 relative z-10">
                <div className="input-group">
                  <label className="block text-[#00ff41]/60 text-[10px] uppercase tracking-widest mb-1">Target Alias [Name]</label>
                  <div className="flex items-center bg-[#0a0a0a] border border-white/10 focus-within:border-[#00ff41]/60 transition-colors px-3 py-2">
                    <span className="text-[#00ff41]/50 mr-2">{`$>`}</span>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-transparent border-none outline-none text-white font-mono text-sm placeholder-white/20"
                      placeholder="Enter your name..."
                      disabled={isTransmitting || isSuccess}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="block text-[#00ff41]/60 text-[10px] uppercase tracking-widest mb-1">Return Node [Email]</label>
                  <div className="flex items-center bg-[#0a0a0a] border border-white/10 focus-within:border-[#00ff41]/60 transition-colors px-3 py-2">
                    <span className="text-[#00ff41]/50 mr-2">{`$>`}</span>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-transparent border-none outline-none text-white font-mono text-sm placeholder-white/20"
                      placeholder="Enter your email..."
                      disabled={isTransmitting || isSuccess}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="block text-[#00ff41]/60 text-[10px] uppercase tracking-widest mb-1">Payload [Message]</label>
                  <div className="flex items-start bg-[#0a0a0a] border border-white/10 focus-within:border-[#00ff41]/60 transition-colors px-3 py-2">
                    <span className="text-[#00ff41]/50 mr-2 mt-1">{`$>`}</span>
                    <textarea 
                      rows={4}
                      name="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-transparent border-none outline-none text-white font-mono text-sm placeholder-white/20 resize-none custom-scrollbar"
                      placeholder="Enter transmission data..."
                      disabled={isTransmitting || isSuccess}
                    />
                  </div>
                </div>

                <div className="input-group pt-4">
                  <button 
                    type="submit"
                    disabled={isTransmitting || isSuccess}
                    className="w-full py-3 bg-[#00ff41]/5 border border-[#00ff41]/50 text-[#00ff41] font-bold text-xs md:text-sm tracking-[0.2em] hover:bg-[#00ff41]/10 hover:border-[#00ff41] transition-all hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 group-hover:text-white transition-colors">[ INITIATE_TRANSMISSION ]</span>
                    <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-[#00ff41]/20 to-transparent skew-x-[-45deg] group-hover:animate-[slideRight_0.6s_ease-out_forwards]" />
                  </button>
                </div>
              </form>
            </div>

            {/* ================= RIGHT: CLEAN NETWORK NODES ================= */}
            <div className="network-nodes lg:w-2/5 flex flex-col border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-10">
               
               <div className="flex justify-between items-end mb-6">
                 <h3 className="text-[#00ff41] text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2">
                   <span className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse shadow-[0_0_8px_#00ff41]" />
                   NETWORK_NODES
                 </h3>
                 <span className="text-[9px] text-white/30 font-mono">SCAN: [OK]</span>
               </div>

               <div className="space-y-8">
                 
                 <div className="space-y-4">
                   <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                     <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Direct Ping</span>
                     <span className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent"></span>
                   </div>

                   <a href="mailto:asnifkl@gmail.com" className="group flex items-center gap-6 py-2 transition-all duration-300">
                     <div className="relative flex items-center justify-center">
                       <FaEnvelope className="text-[32px] text-white/20 group-hover:text-[#00ff41] group-hover:drop-shadow-[0_0_12px_rgba(0,255,65,0.8)] transition-all duration-300" />
                     </div>
                     <div className="flex flex-col">
                       <p className="text-white/70 text-sm font-bold tracking-widest uppercase group-hover:text-[#00ff41] transition-colors">
                         asnifkl@gmail.com
                       </p>
                       <div className="flex items-center gap-3 mt-1">
                         <span className="text-[10px] text-white/30 font-mono uppercase">PRTCL: SMTP</span>
                         <span className="text-[10px] text-[#00ff41] opacity-0 group-hover:opacity-100 transition-opacity uppercase font-bold">| [ACTIVE]</span>
                       </div>
                     </div>
                   </a>

                   <a href="tel:+919746156270" className="group flex items-center gap-6 py-2 transition-all duration-300 mt-2">
                     <div className="relative flex items-center justify-center">
                       <FaPhone className="text-[28px] text-white/20 group-hover:text-[#00ff41] group-hover:drop-shadow-[0_0_12px_rgba(0,255,65,0.8)] transition-all duration-300" />
                     </div>
                     <div className="flex flex-col">
                       <p className="text-white/70 text-sm font-bold tracking-widest uppercase group-hover:text-[#00ff41] transition-colors">
                         +91 9746156270
                       </p>
                       <div className="flex items-center gap-3 mt-1">
                         <span className="text-[10px] text-white/30 font-mono uppercase">PRTCL: VOIP</span>
                         <span className="text-[10px] text-[#00ff41] opacity-0 group-hover:opacity-100 transition-opacity uppercase font-bold">| [SECURE]</span>
                       </div>
                     </div>
                   </a>
                 </div>

                 <div className="space-y-3 pt-6 border-t border-white/5">
                   <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-4">
                     <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">External Relays</span>
                     <span className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent"></span>
                   </div>

                   <div className="flex flex-col gap-3">
                     {[
                       { name: "GitHub", url: "https://github.com/asnifff112", icon: <FaGithub />, status: "ONLINE", hex: "0x1A" },
                       { name: "LinkedIn", url: "https://linkedin.com/in/Asnif-p", icon: <FaLinkedin />, status: "ONLINE", hex: "0x2B" },
                       { name: "Instagram", url: "https://instagram.com/4.ziiiii", icon: <FaInstagram />, status: "ENCRYPTED", hex: "0x3C" }
                     ].map((link, i) => (
                       <a key={i} href={link.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 bg-white/[0.01] border border-white/5 hover:border-[#00ff41]/40 group transition-all relative overflow-hidden">
                         <div className="absolute inset-0 bg-gradient-to-r from-[#00ff41]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                         <div className="flex items-center gap-4 text-white/40 group-hover:text-[#00ff41] relative z-10">
                           <span className="text-xl group-hover:drop-shadow-[0_0_5px_rgba(0,255,65,0.5)] transition-all">{link.icon}</span>
                           <div className="flex flex-col">
                              <span className="text-xs tracking-widest uppercase font-bold text-white/80 group-hover:text-[#00ff41] transition-colors">{link.name}</span>
                              <span className="text-[8px] text-white/30 font-mono group-hover:text-[#00ff41]/50 transition-colors">PORT: {link.hex}</span>
                           </div>
                         </div>
                         <span className={`relative z-10 text-[8px] font-bold tracking-widest px-1.5 py-0.5 border ${link.status === "ONLINE" ? "text-[#00ff41] border-[#00ff41]/30 bg-[#00ff41]/10" : "text-yellow-500 border-yellow-500/30 bg-yellow-500/10"}`}>
                           {link.status}
                         </span>
                       </a>
                     ))}
                   </div>
                 </div>

               </div>
            </div>

          </div>
          
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0" />
        </div>
      </div>

      <style jsx>{`
        @keyframes slideRight {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        @keyframes slideStream {
          0% { left: -50%; }
          100% { left: 150%; }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 255, 65, 0.2); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 255, 65, 0.6); }
      `}</style>
    </section>
  );
}