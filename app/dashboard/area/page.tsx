"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { AreaSelect } from "@/components/AreaSelect";
import { useAuthContext } from "@/components/AuthProvider";
import { getSubscription, setSubscription } from "@/lib/firestore";
import { BARANGAYS } from "@/lib/constants/barangays";

export default function AreaPage() {
  const { user } = useAuthContext();
  const [areaId, setAreaId] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getSubscription(user.uid)
      .then((sub) => {
        if (sub?.area) setAreaId(sub.area);
      })
      .finally(() => setLoading(false));
  }, [user]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !areaId) return;
    setSaving(true);
    setMessage(null);
    try {
      await setSubscription(user.uid, areaId, true);
      setMessage({
        type: "success",
        text: "Service area updated. You'll get alerts for this area.",
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to save.",
      });
    } finally {
      setSaving(false);
    }
  }

  const areaName = BARANGAYS.find((b) => b.id === areaId)?.name ?? areaId;

  return (
    <div className="flex min-h-screen flex-col bg-background-light dark:bg-background-dark">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-grow px-6 py-8">
        <Link
          href="/dashboard"
          className="text-sm font-medium text-slate-600 dark:text-slate-400 transition-colors hover:text-primary"
        >
          ← Dashboard
        </Link>
        {loading ? (
          <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6">
            <p className="text-slate-500 dark:text-slate-400">Loading…</p>
          </div>
        ) : (
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
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
                    value={areaId}
                    onChange={setAreaId}
                    disabled={saving}
                  />
                </div>
              </div>
              {message && (
                <p
                  role="alert"
                  className={
                    message.type === "success"
                      ? "text-sm text-green-600 dark:text-green-400"
                      : "text-sm text-red-500 dark:text-red-400"
                  }
                >
                  {message.text}
                </p>
              )}
              <button
                type="submit"
                disabled={saving || !areaId}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-60"
              >
                <span className="material-symbols-outlined text-lg">save</span>
                {saving ? "Saving…" : "Save"}
              </button>
            </form>
          </div>
        )}
        {areaName && areaId && (
          <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">
            You're subscribed for <strong>{areaName}</strong>. When we detect
            water interruptions there, we'll send SMS to your registered numbers.
          </p>
        )}
      </main>
    </div>
  );
}
