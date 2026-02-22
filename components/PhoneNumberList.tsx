"use client";

import { useState } from "react";
import type { SubscriberNumberWithId } from "@/types/subscriber";
import { updateSubscriberNumber, removeSubscriberNumber } from "@/lib/firestore";
import { validatePhoneNumber } from "@/lib/validation";

type PhoneNumberListProps = {
  numbers: SubscriberNumberWithId[];
  onUpdate: () => void;
  readOnly?: boolean;
  uid?: string;
};

export function PhoneNumberList({
  numbers,
  onUpdate,
  readOnly = false,
  uid = "",
}: PhoneNumberListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPhone, setEditPhone] = useState("");
  const [editLabel, setEditLabel] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function startEdit(n: SubscriberNumberWithId) {
    setEditingId(n.id);
    setEditPhone(n.phone_number);
    setEditLabel(n.label ?? "");
    setError(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditPhone("");
    setEditLabel("");
    setError(null);
  }

  async function saveEdit() {
    if (!editingId || !uid) return;
    const err = validatePhoneNumber(editPhone);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await updateSubscriberNumber(uid, editingId, {
        phone_number: editPhone.trim(),
        label: editLabel.trim() || undefined,
      });
      onUpdate();
      cancelEdit();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(id: string) {
    if (!uid || !confirm("Remove this number from alerts?")) return;
    setLoading(true);
    try {
      await removeSubscriberNumber(uid, id);
      onUpdate();
      if (editingId === id) cancelEdit();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove.");
    } finally {
      setLoading(false);
    }
  }

  if (numbers.length === 0) {
    return (
      <p className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 p-4 text-slate-600 dark:text-slate-400">
        No numbers yet. Add up to 3 phone numbers to receive SMS alerts.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {numbers.map((n) => (
        <li
          key={n.id}
          className="flex flex-col gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          {!readOnly && editingId === n.id ? (
            <>
              <div className="flex-1 space-y-2">
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="h-11 w-full rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 text-slate-900 dark:text-white transition-shadow focus:ring-2 focus:ring-primary focus:ring-offset-0"
                  aria-label="Phone number"
                />
                <input
                  type="text"
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                  placeholder="Label (optional)"
                  className="h-11 w-full rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 text-slate-900 dark:text-white transition-shadow focus:ring-2 focus:ring-primary focus:ring-offset-0"
                  aria-label="Label"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={saveEdit}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-60"
                >
                  <span className="material-symbols-outlined text-lg">save</span>
                  Save
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="rounded-full border border-slate-300 dark:border-slate-700 px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Discard
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">{n.phone_number}</p>
                {n.label && (
                  <p className="text-sm text-slate-500 dark:text-slate-400">{n.label}</p>
                )}
              </div>
              {!readOnly && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(n)}
                    disabled={loading}
                    className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-200 hover:text-primary dark:text-slate-400 dark:hover:bg-slate-700"
                    aria-label="Edit"
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(n.id)}
                    disabled={loading}
                    className="rounded-full p-2 text-slate-600 transition-colors hover:bg-red-50 hover:text-red-500 dark:text-slate-400 dark:hover:bg-red-900/20"
                    aria-label="Remove"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              )}
            </>
          )}
        </li>
      ))}
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </ul>
  );
}
