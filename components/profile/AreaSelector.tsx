"use client";

import { useState } from "react";
import { setArea } from "@/lib/firestore";
import { BARANGAYS } from "@/lib/constants/barangays";
import { Button } from "@/components/ui/Button";

interface AreaSelectorProps {
  uid: string;
  currentAreaId: string;
  onChange: (areaId: string) => void;
}

export function AreaSelector({ uid, currentAreaId, onChange }: AreaSelectorProps) {
  const [selected, setSelected] = useState(currentAreaId);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      await setArea(uid, selected);
      onChange(selected);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h2 className="text-base font-semibold text-white mb-3">Service Area</h2>
      <p className="text-xs text-gray-500 mb-3">
        Select your barangay to receive area-specific water interruption alerts.
      </p>

      <select
        className="area-select w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="">— Select barangay —</option>
        {BARANGAYS.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-3">
        <Button size="sm" onClick={handleSave} disabled={saving || selected === currentAreaId}>
          {saving ? "Saving…" : "Save"}
        </Button>
        {saved && <span className="text-xs text-green-400">Saved!</span>}
      </div>
    </div>
  );
}
