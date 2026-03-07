"use client";

import { useState, useEffect } from "react";
import TerminalEntry from "./sections/TerminalEntry";
import Navbar from "./navbar"; // Ninte navbar path check cheyyuka
import ClickSpark from "@/components/ClickSpark";


export default function BootLayout({ children }: { children: React.ReactNode }) {
  const [isBooted, setIsBooted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="bg-[#0d0d0d] min-h-screen" />;

  return (
    <ClickSpark sparkColor="#00ff41" sparkSize={12} sparkRadius={20} sparkCount={10} duration={400}>
      
      {!isBooted ? (
        // BOOTING TIME: Terminal mathram kaanikkum. Children (page.tsx) load aavilla.
        <div className="fixed inset-0 z-[99999] bg-black">
          <TerminalEntry onAccess={() => setIsBooted(true)} />
        </div>
      ) : (
        // AFTER BOOT: Navbar-um main page content-um varum.
        <div className="animate-in fade-in duration-1000 relative z-10">
          <Navbar />
          {children}
        </div>
      )}

      <style jsx global>{`
        .fade-in { animation: fadeInSite 1.2s forwards; }
        @keyframes fadeInSite {
          from { opacity: 0; filter: blur(10px); }
          to { opacity: 1; filter: blur(0px); }
        }
      `}</style>
    </ClickSpark>
  );
}