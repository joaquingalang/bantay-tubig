"use client";

import Link from "next/link";
import { useAuthContext } from "@/components/AuthProvider";
import { signOut } from "@/lib/auth";

export function Header() {
  const { user, loading } = useAuthContext();

  async function handleSignOut() {
    await signOut();
    window.location.href = "/";
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link
          href={user ? "/dashboard" : "/"}
          className="flex items-center gap-2 text-slate-900 dark:text-white"
        >
          <span className="flex items-center justify-center rounded-lg bg-primary p-2 text-white">
            <span className="material-symbols-outlined text-2xl">water_drop</span>
          </span>
          <span className="text-xl font-black tracking-tight uppercase">
            Bantay Tubig
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          {!loading && (
            <>
              <Link
                href="/info"
                className="text-sm font-medium text-slate-600 dark:text-slate-400 transition-colors hover:text-primary"
              >
                How It Works
              </Link>
              <Link
                href={user ? "/dashboard" : "/info"}
                className="text-sm font-medium text-slate-600 dark:text-slate-400 transition-colors hover:text-primary"
              >
                Alerts
              </Link>
              <Link
                href="/info"
                className="text-sm font-medium text-slate-600 dark:text-slate-400 transition-colors hover:text-primary"
              >
                Community
              </Link>
              {user ? (
                <div className="flex items-center gap-3">
                  <span
                    className="text-sm text-slate-500 dark:text-slate-400"
                    title={user.email ?? undefined}
                  >
                    {user.email}
                  </span>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="rounded-full border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <Link
                  href="/"
                  className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
                >
                  Sign In
                </Link>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
