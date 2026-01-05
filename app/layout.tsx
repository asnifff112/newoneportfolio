import "./globals.css";
import Navbar from "@/app/components/navbar";

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
        {children}
      </body>
    </html>
  );
}
