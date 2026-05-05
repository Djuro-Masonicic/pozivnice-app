import type { Metadata } from "next";
import AleksandraMilanInvite from "@/components/AleksandraMilanInvite";

export const metadata: Metadata = {
  title: "Aleksandra i Milan | e-pozivnice.me",
  description: "Digitalna pozivnica za Aleksandru i Milana.",
};

export default function AleksandraMilanPozivnicaPage() {
  return <AleksandraMilanInvite />;
}
