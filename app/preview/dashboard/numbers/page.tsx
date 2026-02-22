"use client";

import Link from "next/link";
import { PreviewHeader } from "@/components/PreviewHeader";
import { PhoneNumberList } from "@/components/PhoneNumberList";
import { PREVIEW_NUMBERS } from "@/lib/constants/previewData";

export default function PreviewNumbersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background-light dark:bg-background-dark">
      <PreviewHeader />
      <main className="mx-auto w-full max-w-7xl flex-grow px-6 py-8">
        <Link
          href="/preview/dashboard"
          className="text-sm font-medium text-slate-600 dark:text-slate-400 transition-colors hover:text-primary"
        >
          ← Dashboard
        </Link>
        <h1 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
          Notification Numbers
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Add up to three numbers for SMS alerts.
        </p>
        <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-medium text-slate-900 dark:text-white">
              Add up to three numbers for SMS alerts
            </h2>
            <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-3 py-1 text-sm font-medium text-slate-700 dark:text-slate-300">
              {PREVIEW_NUMBERS.length} / 3 Used
            </span>
          </div>
          <div className="mt-6 space-y-4">
            <PhoneNumberList
              numbers={PREVIEW_NUMBERS}
              onUpdate={() => {}}
              readOnly
            />
            <button
              type="button"
              disabled
              title="Not available in preview"
              className="cursor-not-allowed w-full rounded-xl border border-dashed border-slate-300 dark:border-slate-700 px-4 py-3 text-sm font-medium text-slate-400"
            >
              + Add number (Preview)
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
