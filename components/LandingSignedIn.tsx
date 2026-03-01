"use client";

import Link from "next/link";
import { useAuthContext } from "@/components/AuthProvider";

export function LandingSignedIn({
  fallback,
}: {
  fallback: React.ReactNode;
}) {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="h-12 w-[200px] animate-pulse rounded-full bg-primary/10 dark:bg-slate-700" />
    );
  }

  if (user) {
    return (
      <Link
        href="/dashboard"
        className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-medium text-white transition-colors hover:bg-primary/90"
      >
        Go to dashboard
      </Link>
    );
  }

  return <>{fallback}</>;
}
