import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";


// Terminal Font
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Asnif | React & Next.js Specialist",
  description:
    "High-performance terminal style portfolio built with Next.js, Tailwind, GSAP and Three.js",
  keywords: [
    "Asnif",
    "Frontend Developer",
    "Next.js Portfolio",
    "GSAP",
    "Three.js",
    "Creative Developer",
  ],
  authors: [{ name: "Asnif" }],
  creator: "Asnif",
  openGraph: {
    title: "Asnif | Creative Frontend Developer",
    description:
      "Terminal-inspired portfolio built with Next.js, GSAP and Three.js",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="
        bg-[#050505]
        text-[#00ff41]
        font-space-mono
        antialiased
        overflow-x-hidden
      "
      >
        {/* Global Click Spark Effect */}
       
          {/* Main App */}
          <main className="relative z-10 min-h-screen">
            {children}
          </main>
        
      </body>
    </html>
  );
}