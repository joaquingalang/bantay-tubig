import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-900 dark:text-white"
          >
            <span className="flex items-center justify-center rounded-lg bg-primary p-1.5 text-white">
              <span className="material-symbols-outlined text-xl">water_drop</span>
            </span>
            <span className="font-semibold">Bantay Tubig</span>
          </Link>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link
              href="/info"
              className="font-medium text-slate-600 transition-colors hover:text-primary dark:text-slate-400"
            >
              Privacy
            </Link>
            <Link
              href="/info"
              className="font-medium text-slate-600 transition-colors hover:text-primary dark:text-slate-400"
            >
              Terms
            </Link>
            <Link
              href="/info"
              className="font-medium text-slate-600 transition-colors hover:text-primary dark:text-slate-400"
            >
              Contact
            </Link>
          </nav>
        </div>
        <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          Made for the community
        </p>
        <p className="mt-1 text-center text-xs text-slate-400 dark:text-slate-500">
          © {new Date().getFullYear()} Bantay Tubig
        </p>
      </div>
    </footer>
  );
}
