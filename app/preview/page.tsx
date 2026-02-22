import Link from "next/link";
import { PreviewHeader } from "@/components/PreviewHeader";
import { Footer } from "@/components/Footer";

export default function PreviewLandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background-light dark:bg-background-dark">
      <PreviewHeader />
      <main className="relative mx-auto flex max-w-7xl flex-grow flex-col px-6 py-16">
        <div
          className="pointer-events-none absolute left-1/2 top-20 h-64 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
          aria-hidden
        />
        <section className="relative flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
            <span className="material-symbols-outlined text-lg">campaign</span>
            Public Water Alert System
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Never miss{" "}
            <span className="text-primary">water interruptions</span> in your
            area
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-400">
            Bantay Tubig watches official water service announcements and sends
            you an SMS when your barangay is affected—so you can prepare without
            checking social media.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              disabled
              title="Preview mode — not connected to backend"
              className="cursor-not-allowed rounded-full bg-slate-300 px-6 py-3 text-base font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-400"
            >
              Sign in with Google (Preview)
            </button>
            <Link
              href="/preview/info"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-600 px-6 py-3 text-base font-medium text-slate-700 dark:text-slate-300 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Learn More
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
            <Link
              href="/preview/info"
              className="font-medium transition-colors hover:text-primary"
            >
              How it works
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
