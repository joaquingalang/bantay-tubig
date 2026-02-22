import Link from "next/link";

type InfoContentProps = {
  backHref?: string;
  backLabel?: string;
};

export function InfoContent({
  backHref = "/",
  backLabel = "Back to home",
}: InfoContentProps) {
  return (
    <>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        How Bantay Tubig works
      </h1>

      <section className="mt-6 space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-primary dark:text-primary">
          <span className="material-symbols-outlined text-xl">info</span>
          What we do
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Bantay Tubig ("Water Watch") is a community alert service. We monitor
          the official water provider's announcements and send you an SMS when a
          water interruption is reported in your area, so you can prepare without
          having to check social media yourself.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-primary dark:text-primary">
          <span className="material-symbols-outlined text-xl">notifications</span>
          How you get alerts
        </h2>
        <ol className="list-inside list-decimal space-y-2 text-slate-600 dark:text-slate-400">
          <li>Sign in with your Google account.</li>
          <li>Register up to 3 phone numbers that should receive alerts.</li>
          <li>Select your barangay (service area).</li>
          <li>
            When we detect an outage notice that includes your area, we send an
            SMS to all your registered numbers.
          </li>
        </ol>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-primary dark:text-primary">
          <span className="material-symbols-outlined text-xl">shield</span>
          Your data
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          We store only what's needed to send you alerts: your email (from
          sign-in), the phone numbers you add, and your chosen area. We use this
          to match announcements to your location and deliver SMS. We don't sell
          your data or use it for marketing.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-primary dark:text-primary">
          <span className="material-symbols-outlined text-xl">help</span>
          Questions or issues
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          This is a community service. If you have feedback or run into problems,
          contact your local water provider or the team that runs Bantay Tubig in
          your area.
        </p>
      </section>

      <p className="mt-10">
        <Link
          href={backHref}
          className="font-medium text-slate-600 dark:text-slate-400 transition-colors hover:text-primary dark:hover:text-primary"
        >
          ← {backLabel}
        </Link>
      </p>
    </>
  );
}
