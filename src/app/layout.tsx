import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "optional",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "optional",
});

export const metadata: Metadata = {
  title: "e-pozivnice.me | Uskoro",
  description: "Elegantne digitalne pozivnice za najljepše trenutke — uskoro dostupno.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${greatVibes.variable} antialiased`}
      style={{ height: "100%" }}
    >
      <body style={{ height: "100%", margin: 0 }}>{children}</body>
    </html>
  );
}
