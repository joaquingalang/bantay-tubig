import Link from "next/link";

const navLinks = [
  { href: "/preview", label: "Landing" },
  { href: "/preview/dashboard", label: "Dashboard" },
  { href: "/preview/dashboard/numbers", label: "Numbers" },
  { href: "/preview/dashboard/area", label: "Area" },
  { href: "/preview/info", label: "Info" },
];

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <nav className="sticky top-0 z-10 flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 bg-background-light/80 px-6 py-2 backdrop-blur-md dark:bg-background-dark/80">
        <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
          Preview mode
        </span>
        <span className="text-slate-400">|</span>
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="rounded px-2 py-1 text-sm font-medium text-slate-600 transition-colors hover:text-primary dark:text-slate-400"
          >
            {label}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
}
