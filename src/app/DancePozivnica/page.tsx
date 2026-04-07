import type { Metadata } from "next";
import DanceInvite from "@/components/DanceInvite";

export const metadata: Metadata = {
  title: "DancePozivnica | e-pozivnice.me",
  description: "Izolovana digitalna muzička pozivnica za Anju i Stefana.",
};

export default function DancePozivnicaPage() {
  return <DanceInvite />;
}
