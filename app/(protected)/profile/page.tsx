"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getUserData, type UserData } from "@/lib/firestore";
import { PhoneNumberManager } from "@/components/profile/PhoneNumberManager";
import { AreaSelector } from "@/components/profile/AreaSelector";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";

export default function ProfilePage() {
  const { user } = useAuth();
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getUserData(user.uid).then((d) => {
      setData(d);
      setLoading(false);
    });
  }, [user]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner className="w-6 h-6" />
      </div>
    );
  }

  if (!data || !user) return null;

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-1">Profile</h1>
      <p className="text-gray-400 text-sm mb-6">{user.email}</p>

      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <PhoneNumberManager
            uid={user.uid}
            numbers={data.mobileNumbers}
            onChange={(updated) => setData({ ...data, mobileNumbers: updated })}
          />
        </Card>

        <Card className="p-5">
          <AreaSelector
            uid={user.uid}
            currentAreaId={data.areaId}
            onChange={(areaId) => setData({ ...data, areaId })}
          />
        </Card>
      </div>
    </div>
  );
}
