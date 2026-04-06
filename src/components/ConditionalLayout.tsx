"use client";

import { usePathname } from "next/navigation";
import NavbarResponsive from "./NavbarResponsive";
import Footer from "./Footer";

export function ConditionalNavbar() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <NavbarResponsive />;
}

export function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/kontakt") return null;
  return <Footer />;
}
