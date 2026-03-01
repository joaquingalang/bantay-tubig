import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#0a0a0f] py-6 mt-auto">
      <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
        <div className="font-semibold text-gray-400">
          <span className="text-blue-400">Bantay</span>Tubig
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/about" className="hover:text-gray-300 transition-colors">
            About
          </Link>
          <span>&copy; {new Date().getFullYear()}</span>
        </nav>
      </div>
    </footer>
  );
}
