import type { Metadata } from "next";
import { Playfair_Display, Parisienne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ConditionalNavbar, ConditionalFooter } from "@/components/ConditionalLayout";

const playfair = Playfair_Display({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "optional",
});

const parisienne = Parisienne({
  variable: "--font-great-vibes",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "optional",
});

export const metadata: Metadata = {
  title: "e-pozivnice.me | Elegantne Digitalne Pozivnice",
  description:
    "Naručite elegantne digitalne pozivnice za vjenčanja, rođendane, mature i korporativne evente. Personalizovano, brzo i s ljubavlju.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bs"
      className={`${playfair.variable} ${parisienne.variable} antialiased`}
    >
      <body style={{ margin: 0, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <ConditionalNavbar />
        <div style={{ flex: 1 }}>{children}</div>
        <ConditionalFooter />
      </body>
    </html>
  );
}
