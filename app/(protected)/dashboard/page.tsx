"use client";

import { useMemo } from "react";
import { useAlerts } from "@/hooks/useAlerts";
import { useAuth } from "@/hooks/useAuth";
import { AlertList } from "@/components/alerts/AlertList";

export default function DashboardPage() {
  const { user } = useAuth();
  const since = useMemo(() => {
    const d = new Date();
    d.setHours(d.getHours() - 24);
    return d;
  }, []);
  const { alerts, loading } = useAlerts(since);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Alerts</h1>
        <p className="text-gray-400 text-sm mt-1">Water interruption alerts from the past 24 hours.</p>
      </div>

      <AlertList alerts={alerts} loading={loading} uid={user?.uid ?? ""} />
    </div>
  );
}
