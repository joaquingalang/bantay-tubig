"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/lib/auth";
import { Button } from "@/components/ui/Button";

export function Header() {
  const { user } = useAuth();

  async function handleSignOut() {
    await signOut();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-[#0a0a0f]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg">
          <span className="text-blue-400">Bantay</span>
          <span>Tubig</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm text-gray-400">
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
          {user && (
            <>
              <Link href="/dashboard" className="hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/profile" className="hover:text-white transition-colors">
                Profile
              </Link>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          )}
          {!user && (
            <Link href="/login">
              <Button size="sm">Sign In</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
