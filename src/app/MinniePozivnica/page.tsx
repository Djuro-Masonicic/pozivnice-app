import type { Metadata } from "next";
import MinnieInvite from "@/components/MinnieInvite";

export const metadata: Metadata = {
  title: "Anjin rođendan | e-pozivnice.me",
  description: "Digitalna rođendanska pozivnica za Anju.",
};

export default function MinniePozivnicaPage() {
  return <MinnieInvite />;
}
