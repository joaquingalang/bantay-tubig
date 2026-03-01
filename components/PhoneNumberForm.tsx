"use client";

import { useState } from "react";
import { validatePhoneNumber } from "@/lib/validation";

type PhoneNumberFormProps = {
  onSubmit: (data: { phone_number: string; label?: string }) => Promise<void>;
  onCancel?: () => void;
};

export function PhoneNumberForm({ onSubmit, onCancel }: PhoneNumberFormProps) {
  const [phone, setPhone] = useState("");
  const [label, setLabel] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validatePhoneNumber(phone);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await onSubmit({
        phone_number: phone.trim(),
        label: label.trim() || undefined,
      });
      setPhone("");
      setLabel("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add number.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30 p-4"
    >
      <div className="grid gap-2 sm:grid-cols-2 sm:items-end">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Phone number
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="09XX XXX XXXX"
            disabled={loading}
            className="mt-1 h-11 w-full rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 text-slate-900 dark:text-white transition-shadow focus:ring-2 focus:ring-primary focus:ring-offset-0"
            aria-required
          />
        </div>
        <div>
          <label htmlFor="label" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Label <span className="text-slate-400">(optional)</span>
          </label>
          <input
            id="label"
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g. Home, Mobile"
            disabled={loading}
            className="mt-1 h-11 w-full rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 text-slate-900 dark:text-white transition-shadow focus:ring-2 focus:ring-primary focus:ring-offset-0"
          />
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          <span className="material-symbols-outlined text-lg">save</span>
          {loading ? "Adding…" : "Save"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-slate-300 dark:border-slate-700 px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Discard
          </button>
        )}
      </div>
    </form>
  );
}
