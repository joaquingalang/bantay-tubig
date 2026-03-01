"use client";

import { useState } from "react";
import { addMobileNumber, updateMobileNumber, removeMobileNumber } from "@/lib/firestore";
import { isValidPHPhone, normalizePHPhone } from "@/lib/validation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface PhoneNumberManagerProps {
  uid: string;
  numbers: string[];
  onChange: (updated: string[]) => void;
}

export function PhoneNumberManager({ uid, numbers, onChange }: PhoneNumberManagerProps) {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editError, setEditError] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newError, setNewError] = useState("");
  const [adding, setAdding] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleAdd() {
    const normalized = normalizePHPhone(newPhone.trim());
    if (!isValidPHPhone(newPhone.trim())) {
      setNewError("Enter a valid PH mobile number (e.g. 09171234567).");
      return;
    }
    setAdding(true);
    setNewError("");
    try {
      await addMobileNumber(uid, normalized);
      onChange([...numbers, normalized]);
      setNewPhone("");
      setShowAddForm(false);
    } catch (err: unknown) {
      setNewError(err instanceof Error ? err.message : "Failed to add number.");
    } finally {
      setAdding(false);
    }
  }

  async function handleSaveEdit(index: number) {
    const normalized = normalizePHPhone(editValue.trim());
    if (!isValidPHPhone(editValue.trim())) {
      setEditError("Enter a valid PH mobile number (e.g. 09171234567).");
      return;
    }
    setSaving(true);
    setEditError("");
    try {
      await updateMobileNumber(uid, index, normalized);
      const updated = numbers.map((n, i) => (i === index ? normalized : n));
      onChange(updated);
      setEditIndex(null);
    } catch {
      setEditError("Failed to update number.");
    } finally {
      setSaving(false);
    }
  }

  async function handleRemove(index: number) {
    await removeMobileNumber(uid, index);
    onChange(numbers.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-white">Mobile Numbers</h2>
        <span className="text-xs text-gray-500">{numbers.length}/3</span>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        {numbers.map((num, i) => (
          <div key={i} className="flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-2">
            {editIndex === i ? (
              <>
                <input
                  className="flex-1 bg-transparent text-sm text-white outline-none"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  autoFocus
                />
                <Button size="sm" variant="primary" onClick={() => handleSaveEdit(i)} disabled={saving}>
                  {saving ? "Saving…" : "Save"}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => { setEditIndex(null); setEditError(""); }}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <span className="flex-1 text-sm text-white font-mono">{num}</span>
                <Button size="sm" variant="ghost" onClick={() => { setEditIndex(i); setEditValue(num); setEditError(""); }}>
                  Edit
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleRemove(i)} className="text-red-400 hover:text-red-300">
                  Remove
                </Button>
              </>
            )}
          </div>
        ))}
        {(editIndex !== null && editError) && (
          <p className="text-xs text-red-400">{editError}</p>
        )}
      </div>

      {numbers.length < 3 && !showAddForm && (
        <Button size="sm" variant="secondary" onClick={() => setShowAddForm(true)}>
          + Add number
        </Button>
      )}

      {showAddForm && (
        <div className="flex flex-col gap-2">
          <Input
            id="new-phone"
            placeholder="09171234567"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            error={newError}
            autoFocus
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleAdd} disabled={adding}>
              {adding ? "Adding…" : "Add"}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => { setShowAddForm(false); setNewPhone(""); setNewError(""); }}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
