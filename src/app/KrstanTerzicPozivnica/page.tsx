import type { Metadata } from "next";
import KrstanTerzicInvite from "@/components/KrstanTerzicInvite";

export const metadata: Metadata = {
  title: "Krstanov rođendan | e-pozivnice.me",
  description: "Digitalna rođendanska pozivnica za Krstana.",
};

export default function KrstanTerzicPozivnicaPage() {
  return <KrstanTerzicInvite />;
}
