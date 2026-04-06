import type { Metadata } from "next";
import AleksandraMilanInvite from "@/components/AleksandraMilanInvite";

export const metadata: Metadata = {
  title: "AleksandraMilanPozivnica | e-pozivnice.me",
  description: "Izolovana digitalna pozivnica za Aleksandru i Milana.",
};

export default function AleksandraMilanPozivnicaPage() {
  return <AleksandraMilanInvite />;
}
