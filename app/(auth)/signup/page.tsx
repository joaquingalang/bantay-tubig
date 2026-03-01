import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Create Account | Bantay Tubig",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <SignupForm />
    </div>
  );
}
