import Link from "next/link";
import { Header } from "@/components/Header";
import { SignInButton } from "@/components/SignInButton";
import { LandingSignedIn } from "@/components/LandingSignedIn";
import { Footer } from "@/components/Footer";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background-light dark:bg-background-dark">
      <Header />
      <main className="relative mx-auto flex max-w-7xl flex-grow flex-col px-6 py-16">
        {/* Hero decorative blur */}
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
            <LandingSignedIn
              fallback={
                <>
                  <SignInButton />
                  <Link
                    href="/info"
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-600 px-6 py-3 text-base font-medium text-slate-700 dark:text-slate-300 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Learn More
                  </Link>
                </>
              }
            />
          </div>
          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
            Joined by 12,000+ residents
          </p>
        </section>

        {/* How It Works */}
        <section className="relative mt-24 grid gap-8 sm:grid-cols-3">
          <h2 className="col-span-full text-center text-2xl font-bold text-slate-900 dark:text-white">
            How It Works
          </h2>
          <div className="flex flex-col items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-2xl">login</span>
            </span>
            <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">
              Sign In
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Use your Google account to get started.
            </p>
          </div>
          <div className="flex flex-col items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-2xl">
                contact_phone
              </span>
            </span>
            <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">
              Register Numbers
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Add up to 3 phone numbers for SMS alerts.
            </p>
          </div>
          <div className="flex flex-col items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-2xl">
                notifications
              </span>
            </span>
            <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">
              Get Alerts
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              We notify you when your area has a water interruption.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="relative mt-24">
          <div className="glass-card rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Get Started Now
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Sign in and set up your numbers and area in minutes.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <LandingSignedIn
                fallback={
                  <>
                    <SignInButton />
                    <Link
                      href="/info"
                      className="inline-flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-600 px-6 py-3 text-base font-medium text-slate-700 dark:text-slate-300 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      View Recent Alerts
                    </Link>
                  </>
                }
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
