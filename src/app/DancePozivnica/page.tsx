import type { Metadata } from "next";
import DanceInvite from "@/components/DanceInvite";

export const metadata: Metadata = {
  title: "Anja i Stefan | e-pozivnice.me",
  description: "Digitalna muzička pozivnica za Anju i Stefana.",
};

export default function DancePozivnicaPage() {
  return <DanceInvite />;
}
