import type { Metadata } from "next";
import OnboardingInvite from "@/components/OnboardingInvite";

export const metadata: Metadata = {
  title: "Onboarding | e-pozivnice.me",
  description: "Izolovana digitalna pozivnica za Sanju i Marka.",
};

export default function OnboardingPage() {
  return <OnboardingInvite />;
}
