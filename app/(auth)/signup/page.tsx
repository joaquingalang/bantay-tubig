import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/SignupForm";
import { DotGrid } from "@/components/ui/DotGrid";

export const metadata: Metadata = {
  title: "Create Account | Bantay Tubig",
};

export default function SignupPage() {
  return (
    <div className="relative flex flex-1 items-center justify-center px-4 py-12 overflow-hidden">
      <DotGrid />
      <SignupForm />
    </div>
  );
}
