"use client";

import Link from "next/link";
import { PreviewHeader } from "@/components/PreviewHeader";
import { AreaSelect } from "@/components/AreaSelect";
import { PREVIEW_AREA_ID } from "@/lib/constants/previewData";
import { BARANGAYS } from "@/lib/constants/barangays";

const areaName = BARANGAYS.find((b) => b.id === PREVIEW_AREA_ID)?.name ?? PREVIEW_AREA_ID;

export default function PreviewAreaPage() {
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
        <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6">
          <h2 className="flex items-center gap-2 text-lg font-medium text-slate-900 dark:text-white">
            <span className="material-symbols-outlined text-2xl text-primary">
              location_on
            </span>
            Your Subscribed Area
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Choose your barangay so we only send alerts when your area is
            affected.
          </p>
          <div className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="area"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Barangay / Local Area
              </label>
              <div className="mt-1">
                <AreaSelect
                  id="area"
                  value={PREVIEW_AREA_ID}
                  onChange={() => {}}
                  disabled
                />
              </div>
            </div>
            <button
              type="button"
              disabled
              title="Preview mode"
              className="cursor-not-allowed inline-flex items-center gap-1.5 rounded-full bg-slate-200 px-4 py-2 text-sm font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-400"
            >
              <span className="material-symbols-outlined text-lg">save</span>
              Save (Preview)
            </button>
          </div>
        </div>
        <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">
          You're subscribed for <strong>{areaName}</strong>. When we detect
          water interruptions there, we'll send SMS to your registered numbers.
        </p>
      </main>
    </div>
  );
}
