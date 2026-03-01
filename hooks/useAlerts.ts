"use client";

import { useEffect, useState } from "react";
import { subscribeToAlerts } from "@/lib/firestore";
import type { Alert } from "@/types/alert";

export function useAlerts(since: Date) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAlerts(since, (data) => {
      setAlerts(data);
      setLoading(false);
    });
    return unsubscribe;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { alerts, loading };
}
