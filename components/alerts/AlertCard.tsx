"use client";

import { useState } from "react";
import { markAlertRead } from "@/lib/firestore";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Alert } from "@/types/alert";

interface AlertCardProps {
  alert: Alert;
  uid: string;
}

export function AlertCard({ alert, uid }: AlertCardProps) {
  const isRead = alert.readBy.includes(uid);
  const [read, setRead] = useState(isRead);

  async function handleClick() {
    if (read) return;
    setRead(true);
    await markAlertRead(alert.id, uid);
  }

  const detectedAt = alert.detectedAt?.toDate?.() ?? new Date();

  return (
    <Card
      className={`p-4 cursor-pointer transition-colors hover:border-gray-700 ${read ? "opacity-70" : ""}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <time className="text-xs text-gray-500" dateTime={detectedAt.toISOString()}>
          {detectedAt.toLocaleString("en-PH", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </time>
        <Badge variant={read ? "read" : "unread"} />
      </div>

      <p className="text-sm text-gray-200 leading-relaxed mb-3">{alert.message}</p>

      {alert.sourceUrl && (
        <a
          href={alert.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-xs text-blue-400 hover:text-blue-300 hover:underline"
        >
          View original post &rarr;
        </a>
      )}
    </Card>
  );
}
