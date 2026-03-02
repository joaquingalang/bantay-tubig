"use client";

import { useState } from "react";
import { setSmsEnabled } from "@/lib/firestore";

interface SmsToggleProps {
  uid: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export function SmsToggle({ uid, enabled, onChange }: SmsToggleProps) {
  const [pending, setPending] = useState(false);

  async function handleToggle() {
    const next = !enabled;
    onChange(next); // optimistic
    setPending(true);
    try {
      await setSmsEnabled(uid, next);
    } catch {
      onChange(enabled); // revert on error
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h2 className="text-base font-semibold text-white">SMS Reminders</h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Receive SMS alerts for water interruptions in your area.
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        disabled={pending}
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed ${
          enabled ? "bg-blue-600" : "bg-gray-600"
        }`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out ${
            enabled ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
