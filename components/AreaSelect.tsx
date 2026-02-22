"use client";

import { BARANGAYS } from "@/lib/constants/barangays";

type AreaSelectProps = {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  disabled?: boolean;
  "aria-label"?: string;
};

export function AreaSelect({
  value,
  onChange,
  id = "area",
  disabled,
  "aria-label": ariaLabel = "Service area (barangay)",
}: AreaSelectProps) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      aria-label={ariaLabel}
      className="area-select h-12 w-full max-w-md rounded-full border-none bg-slate-100 px-6 pr-12 text-slate-900 transition-shadow focus:ring-2 focus:ring-primary focus:ring-offset-0 dark:bg-slate-800 dark:text-white"
    >
      <option value="">Select your area</option>
      {BARANGAYS.map((b) => (
        <option key={b.id} value={b.id}>
          {b.name}
        </option>
      ))}
    </select>
  );
}
