import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/app/components/navbar";

export const metadata: Metadata = {
  title: "Asnif Portfolio",
  description: "Next.js · GSAP · Three.js Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        
        <Navbar />
        {children}
      </body>
    </html>
  );
}
