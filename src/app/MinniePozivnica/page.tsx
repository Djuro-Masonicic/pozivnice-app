import type { Metadata } from "next";
import MinnieInvite from "@/components/MinnieInvite";

export const metadata: Metadata = {
  title: "MinniePozivnica | e-pozivnice.me",
  description: "Izolovana digitalna rodjendanska pozivnica za Anju.",
};

export default function MinniePozivnicaPage() {
  return <MinnieInvite />;
}
