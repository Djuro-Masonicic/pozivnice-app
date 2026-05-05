import type { Metadata } from "next";
import OnboardingInvite from "@/components/OnboardingInvite";

export const metadata: Metadata = {
  title: "Sanja i Marko | e-pozivnice.me",
  description: "Digitalna pozivnica za Sanju i Marka.",
};

export default function OnboardingPage() {
  return <OnboardingInvite />;
}
