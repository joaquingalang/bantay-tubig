"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/lib/auth";
import { Button } from "@/components/ui/Button";

export function Header() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleSignOut() {
    await signOut();
    setMenuOpen(false);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-[#0a0a0f]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg">
          <Image src="/logo.png" alt="Bantay Tubig logo" width={28} height={28} className="shrink-0" />
          <span><span className="text-blue-400">Bantay</span>Tubig</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-4 text-sm text-gray-400">
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

        {/* Hamburger button — mobile only */}
        <button
          className="sm:hidden p-1 text-gray-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {/* Three bars that animate into an X */}
          <div className="relative w-6 h-5">
            <span
              className={`absolute left-0 top-0 block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-in-out origin-center
                ${menuOpen ? "translate-y-2.25 rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-2.25 block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-in-out
                ${menuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"}`}
            />
            <span
              className={`absolute left-0 top-4.5 block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-in-out origin-center
                ${menuOpen ? "-translate-y-2.25 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu — always in DOM, height-animated open/close */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <nav className="border-t border-gray-800 px-4 py-4 flex flex-col gap-4 text-sm text-gray-400">
          <Link href="/about" onClick={closeMenu} className="hover:text-white transition-colors">
            About
          </Link>
          {user && (
            <>
              <Link href="/dashboard" onClick={closeMenu} className="hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/profile" onClick={closeMenu} className="hover:text-white transition-colors">
                Profile
              </Link>
              <button onClick={handleSignOut} className="text-left hover:text-white transition-colors">
                Sign Out
              </button>
            </>
          )}
          {!user && (
            <Link href="/login" onClick={closeMenu} className="text-blue-400 hover:text-blue-300 transition-colors">
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
