"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuthContext } from "@/components/AuthProvider";
import { getSubscriberNumbers, getSubscription } from "@/lib/firestore";
import { BARANGAYS } from "@/lib/constants/barangays";

export function AlertsBadge() {
  const { user } = useAuthContext();
  const [numbersCount, setNumbersCount] = useState<number>(0);
  const [subscription, setSubscription] = useState<Awaited<ReturnType<typeof getSubscription>>>(null);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      getSubscriberNumbers(user.uid).then((n) => n.length),
      getSubscription(user.uid),
    ]).then(([count, sub]) => {
      setNumbersCount(count);
      setSubscription(sub);
    });
  }, [user]);

  const isSubscribed = subscription?.is_active && subscription?.area && numbersCount > 0;
  if (!isSubscribed) return null;

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
      <span className="material-symbols-outlined text-lg">check_circle</span>
      Alerts Active
    </span>
  );
}

export function DashboardSummary() {
  const { user } = useAuthContext();
  const [numbersCount, setNumbersCount] = useState<number>(0);
  const [subscription, setSubscription] = useState<Awaited<ReturnType<typeof getSubscription>>>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      getSubscriberNumbers(user.uid).then((n) => n.length),
      getSubscription(user.uid),
    ])
      .then(([count, sub]) => {
        setNumbersCount(count);
        setSubscription(sub);
      })
      .finally(() => setLoading(false));
  }, [user]);

  const areaName = subscription?.area
    ? BARANGAYS.find((b) => b.id === subscription.area)?.name ?? subscription.area
    : null;

  if (loading) {
    return (
      <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6">
        <p className="text-slate-500 dark:text-slate-400">Loading…</p>
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      <Link
        href="/dashboard/numbers"
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
        href="/dashboard/area"
        className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 transition-colors hover:border-primary/50"
      >
        <span className="material-symbols-outlined text-2xl text-primary">
          location_on
        </span>
        <h2 className="mt-2 font-medium text-slate-900 dark:text-white">
          Service area
        </h2>
        <p className="mt-1 text-lg font-medium text-slate-700 dark:text-slate-300">
          {areaName ?? "Not set"}
        </p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Choose your barangay for targeted alerts.
        </p>
      </Link>
    </div>
  );
}

