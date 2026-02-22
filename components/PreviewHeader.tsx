import Link from "next/link";
import { PREVIEW_EMAIL } from "@/lib/constants/previewData";

export function PreviewHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link
          href="/preview"
          className="flex items-center gap-2 text-slate-900 dark:text-white"
        >
          <span className="flex items-center justify-center rounded-lg bg-primary p-2 text-white">
            <span className="material-symbols-outlined text-2xl">water_drop</span>
          </span>
          <span className="text-xl font-black tracking-tight uppercase">
            Bantay Tubig
          </span>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            (Preview)
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/preview/dashboard"
            className="text-sm font-medium text-slate-600 dark:text-slate-400 transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            href="/preview/dashboard/numbers"
            className="text-sm font-medium text-slate-600 dark:text-slate-400 transition-colors hover:text-primary"
          >
            Numbers
          </Link>
          <Link
            href="/preview/dashboard/area"
            className="text-sm font-medium text-slate-600 dark:text-slate-400 transition-colors hover:text-primary"
          >
            Area
          </Link>
          <Link
            href="/preview/info"
            className="text-sm font-medium text-slate-600 dark:text-slate-400 transition-colors hover:text-primary"
          >
            Info
          </Link>
          <span
            className="text-sm text-slate-500 dark:text-slate-400"
            title={PREVIEW_EMAIL}
          >
            {PREVIEW_EMAIL}
          </span>
        </nav>
      </div>
    </header>
  );
}
