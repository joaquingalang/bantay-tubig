import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import { DotGrid } from "@/components/ui/DotGrid";

export const metadata: Metadata = {
  title: "Sign In | Bantay Tubig",
};

export default function LoginPage() {
  return (
    <div className="relative flex flex-1 items-center justify-center px-4 py-12 overflow-hidden">
      <DotGrid />
      <LoginForm />
    </div>
  );
}
