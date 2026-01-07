import "./globals.css";
import Navbar from "@/app/components/navbar";
import BackgroundScene from "@/app/components/three/BackgroundScene"
import Footer from "./components/footer";

export const metadata = {
  title: "Asnif Portfolio",
  description: "Next.js + Tailwind + GSAP Portfolio",
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
        <main className="pt-20 relative z-10">
        {children}
        <Footer/>
        </main>
      </body>
    </html>
  );
}
