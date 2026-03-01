import { AlertCard } from "@/components/alerts/AlertCard";
import { Spinner } from "@/components/ui/Spinner";
import type { Alert } from "@/types/alert";

interface AlertListProps {
  alerts: Alert[];
  loading: boolean;
  uid: string;
}

export function AlertList({ alerts, loading, uid }: AlertListProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner className="w-6 h-6" />
      </div>
    );
  }

  if (alerts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-4xl mb-4">💧</div>
        <p className="text-gray-400 text-sm">No alerts in the past 24 hours.</p>
        <p className="text-gray-600 text-xs mt-1">Water service is running normally.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {alerts.map((alert) => (
        <AlertCard key={alert.id} alert={alert} uid={uid} />
      ))}
    </div>
  );
}
