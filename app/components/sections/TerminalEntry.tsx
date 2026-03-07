"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function TerminalEntry({ onAccess }: { onAccess: () => void }) {
  const [logs, setLogs] = useState<string[]>([
    "INITIALIZING_ASNIF_CORE...",
    "SCANNING_HARDWARE... [DONE]",
    "ESTABLISHING_ENCRYPTED_TUNNEL... [OK]",
  ]);
  const [booting, setBooting] = useState(false);
  const containerRef = useRef(null);

  const startSequence = () => {
    if (booting) return;
    setBooting(true);

    const steps = [
      "DECRYPTING_ASSETS...",
      "STARTING_DEVELOPMENT_SERVER...",
      "FETCHING_NEXT_JS_BUNDLES...",
      "SYSTEM_READY: 3000",
      "ACCESS_GRANTED."
    ];

    steps.forEach((step, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, `> ${step}`]);
      }, i * 400);
    });

    // Exit animation with a "Glitch"
    setTimeout(() => {
      const tl = gsap.timeline({ onComplete: onAccess });
      tl.to(containerRef.current, {
        skewX: 20,
        opacity: 0,
        scale: 1.5,
        duration: 0.4,
        ease: "power4.in",
      });
    }, 2500);
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100000] bg-black flex flex-col items-center justify-center p-6 font-mono overflow-hidden"
    >
      {/* Background Matrix-like glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.05)_0%,_transparent_70%)]" />

      <div className="relative z-10 w-full max-w-lg">
        {/* Header Section */}
        <div className="border border-[#00ff41]/30 bg-[#00ff41]/5 p-4 mb-6 rounded shadow-[0_0_20px_rgba(0,255,65,0.1)]">
          <div className="flex gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
            <div className="w-2 h-2 rounded-full bg-green-500/50" />
          </div>
          <div className="space-y-1">
            {logs.map((log, i) => (
              <p key={i} className="text-[#00ff41] text-[10px] md:text-xs uppercase tracking-widest">
                <span className="opacity-50">[{i}]</span> {log}
              </p>
            ))}
          </div>
        </div>

        {/* The Action Button */}
        {!booting ? (
          <button 
            onClick={startSequence}
            className="w-full group relative overflow-hidden border border-[#00ff41] p-4 bg-transparent transition-all hover:bg-[#00ff41] hover:shadow-[0_0_30px_#00ff41]"
          >
            <div className="relative z-20 flex items-center justify-center gap-4 text-[#00ff41] group-hover:text-black font-bold tracking-[0.3em]">
              <span>[ RUN_ASNIF_DEV ]</span>
            </div>
            {/* Hover Glitch Effect Line */}
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        ) : (
          <div className="w-full flex flex-col items-center gap-3">
             <div className="w-full h-1 bg-[#00ff41]/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#00ff41] animate-loading" style={{ width: '60%' }} />
             </div>
             <p className="text-[#00ff41] text-[10px] animate-pulse">BOOTING_CORE_MODULES...</p>
          </div>
        )}

        <p className="mt-8 text-center text-white/20 text-[9px] tracking-widest uppercase">
          Unauthorized access prohibited // ID: {Math.random().toString(16).slice(2, 8).toUpperCase()}
        </p>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-loading {
          animation: loading 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
}