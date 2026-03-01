"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Create an account",
    description: "Sign up with your email and password in seconds.",
  },
  {
    step: "2",
    title: "Register your mobile numbers",
    description: "Add up to 3 mobile numbers and choose your barangay.",
  },
  {
    step: "3",
    title: "Get SMS alerts",
    description:
      "We monitor local Facebook announcements and send you an SMS the moment a water interruption is posted.",
  },
];

export default function HomePage() {
  const { user, loading } = useAuth();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-20 md:py-28">
        <span className="inline-block mb-4 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase">
          Water Interruption Alerts
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-2xl leading-tight">
          Never miss a{" "}
          <span className="text-blue-400">water interruption</span> announcement
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mb-8">
          Bantay Tubig automatically monitors your local water service Facebook page
          and sends SMS alerts directly to your phone.
        </p>

        {!loading && (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {user ? (
              <Link href="/dashboard">
                <Button size="md">Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/signup">
                  <Button size="md">Get started — it&apos;s free</Button>
                </Link>
                <Link href="/login">
                  <Button size="md" variant="ghost">
                    Sign in
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </section>

      {/* How it works */}
      <section className="px-4 py-16 border-t border-gray-800">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-white mb-10">
            How it works
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map(({ step, title, description }) => (
              <div key={step} className="flex flex-col items-center text-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600/15 border border-blue-500/25 flex items-center justify-center text-blue-400 font-bold text-sm">
                  {step}
                </div>
                <h3 className="font-semibold text-white text-sm">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {!loading && !user && (
        <section className="px-4 py-16 border-t border-gray-800 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Stay informed, stay prepared.
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Join residents who never miss a water service announcement.
          </p>
          <Link href="/signup">
            <Button size="md">Create a free account</Button>
          </Link>
        </section>
      )}
    </div>
  );
}
