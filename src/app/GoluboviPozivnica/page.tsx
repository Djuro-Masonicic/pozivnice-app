import type { Metadata } from "next";
import GoluboviInvite from "@/components/GoluboviInvite";

export const metadata: Metadata = {
  title: "Katarina i Vukašin | e-pozivnice.me",
  description: "Digitalna pozivnica za Katarinu i Vukašina.",
};

export default function GoluboviPozivnicaPage() {
  return <GoluboviInvite />;
}
