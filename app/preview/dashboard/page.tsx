import Link from "next/link";
import { PreviewHeader } from "@/components/PreviewHeader";
import { PREVIEW_NUMBERS, PREVIEW_AREA_ID } from "@/lib/constants/previewData";
import { BARANGAYS } from "@/lib/constants/barangays";

const areaName = BARANGAYS.find((b) => b.id === PREVIEW_AREA_ID)?.name ?? PREVIEW_AREA_ID;

export default function PreviewDashboardPage() {
  const numbersCount = PREVIEW_NUMBERS.length;
  const isSubscribed = numbersCount > 0 && PREVIEW_AREA_ID;

  return (
    <div className="flex min-h-screen flex-col bg-background-light dark:bg-background-dark">
      <PreviewHeader />
      <main className="mx-auto w-full max-w-7xl flex-grow px-6 py-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
              Subscription Settings
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Manage your water service alert zones and the mobile numbers where
              you receive SMS notifications.
            </p>
          </div>
          {isSubscribed && (
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <span className="material-symbols-outlined text-lg">check_circle</span>
              Alerts Active
            </span>
          )}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/preview/dashboard/numbers"
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 transition-colors hover:border-primary/50"
          >
            <span className="material-symbols-outlined text-2xl text-primary">
              contact_phone
            </span>
            <h2 className="mt-2 font-medium text-slate-900 dark:text-white">
              Your numbers
            </h2>
            <p className="mt-1 text-2xl font-semibold text-slate-700 dark:text-slate-300">
              {numbersCount} / 3
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Add or edit phone numbers that receive alerts.
            </p>
          </Link>
          <Link
            href="/preview/dashboard/area"
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 transition-colors hover:border-primary/50"
          >
            <span className="material-symbols-outlined text-2xl text-primary">
              location_on
            </span>
            <h2 className="mt-2 font-medium text-slate-900 dark:text-white">
              Service area
            </h2>
            <p className="mt-1 text-lg font-medium text-slate-700 dark:text-slate-300">
              {areaName}
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Choose your barangay for targeted alerts.
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
