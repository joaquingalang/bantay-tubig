"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { PhoneNumberForm } from "@/components/PhoneNumberForm";
import { PhoneNumberList } from "@/components/PhoneNumberList";
import { useAuthContext } from "@/components/AuthProvider";
import { getSubscriberNumbers, addSubscriberNumber } from "@/lib/firestore";

const MAX_NUMBERS = 3;

export default function NumbersPage() {
  const { user } = useAuthContext();
  const [numbers, setNumbers] = useState<Awaited<ReturnType<typeof getSubscriberNumbers>>>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  async function load() {
    if (!user) return;
    const list = await getSubscriberNumbers(user.uid);
    setNumbers(list);
  }

  useEffect(() => {
    if (!user) return;
    load().finally(() => setLoading(false));
  }, [user]);

  async function handleAdd(data: { phone_number: string; label?: string }) {
    if (!user) return;
    await addSubscriberNumber(user.uid, data);
    await load();
    setShowForm(false);
  }

  const canAdd = numbers.length < MAX_NUMBERS;

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
        <h1 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
          Notification Numbers
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Add up to three numbers for SMS alerts.
        </p>
        {loading ? (
          <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6">
            <p className="text-slate-500 dark:text-slate-400">Loading…</p>
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-medium text-slate-900 dark:text-white">
                Add up to three numbers for SMS alerts
              </h2>
              <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-3 py-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                {numbers.length} / 3 Used
              </span>
            </div>
            <div className="mt-6 space-y-4">
              <PhoneNumberList numbers={numbers} onUpdate={load} uid={user?.uid ?? ""} />
              {canAdd && (
                <>
                  {showForm ? (
                    <PhoneNumberForm
                      onSubmit={handleAdd}
                      onCancel={() => setShowForm(false)}
                    />
                  ) : (
                  <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="w-full rounded-xl border border-dashed border-slate-300 dark:border-slate-700 px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 transition-colors hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/30"
                  >
                    {numbers.length === 0
                    ? "+ Add number"
                    : numbers.length === 1
                      ? "Add a second number"
                      : "Add a third number"}
                  </button>
                  )}
                </>
              )}
              {numbers.length >= MAX_NUMBERS && (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Maximum of 3 numbers. Remove one to add another.
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
