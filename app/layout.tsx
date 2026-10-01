import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "VBTEC — Zonnepanelen, thuisbatterijen & warmtepompen met ingenieursbegeleiding",
  description:
    "VBTEC ontwerpt en installeert zonnepanelen, thuisbatterijen, omvormers, laadpalen, PVT en warmtepompen. Elke installatie berekend en gestaafd door een ingenieur.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl-BE" className={`${inter.variable} ${interTight.variable}`}>
      <body className="min-h-screen overflow-x-clip">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
