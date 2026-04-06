import type { Metadata } from "next";
import "./globals.css";
import { ConditionalNavbar, ConditionalFooter } from "@/components/ConditionalLayout";

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
    <html lang="bs" className="antialiased">
      <body style={{ margin: 0, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <ConditionalNavbar />
        <div style={{ flex: 1 }}>{children}</div>
        <ConditionalFooter />
      </body>
    </html>
  );
}
