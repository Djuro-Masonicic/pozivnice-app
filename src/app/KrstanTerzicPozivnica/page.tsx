import type { Metadata } from "next";
import KrstanTerzicInvite from "@/components/KrstanTerzicInvite";

export const metadata: Metadata = {
  title: "KrstanTerzicPozivnica | e-pozivnice.me",
  description: "Izolovana digitalna rođendanska pozivnica za Krstana.",
};

export default function KrstanTerzicPozivnicaPage() {
  return <KrstanTerzicInvite />;
}
