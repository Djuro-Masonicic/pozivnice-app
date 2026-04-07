import type { Metadata } from "next";
import GoluboviInvite from "@/components/GoluboviInvite";

export const metadata: Metadata = {
  title: "GoluboviPozivnica | e-pozivnice.me",
  description: "Izolovana digitalna pozivnica za Katarinu i Vukašina.",
};

export default function GoluboviPozivnicaPage() {
  return <GoluboviInvite />;
}
