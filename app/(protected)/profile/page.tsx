"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getUserData, deleteUserData, type UserData } from "@/lib/firestore";
import { signOut, deleteAccount } from "@/lib/auth";
import { PhoneNumberManager } from "@/components/profile/PhoneNumberManager";
import { AreaSelector } from "@/components/profile/AreaSelector";
import { SmsToggle } from "@/components/profile/SmsToggle";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";

export default function ProfilePage() {
  const { user } = useAuth();
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!user) return;
    getUserData(user.uid).then((d) => {
      setData(d);
      setLoading(false);
    });
  }, [user]);

  async function handleDelete() {
    if (!user) return;
    setDeleting(true);
    try {
      await deleteUserData(user.uid);
      await deleteAccount();
    } catch {
      setDeleting(false);
      setShowDeleteDialog(false);
    }
  }

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
          <SmsToggle
            uid={user.uid}
            enabled={data.smsEnabled ?? true}
            onChange={(smsEnabled) => setData({ ...data, smsEnabled })}
          />
        </Card>

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

        <div className="flex items-center gap-3 pt-2">
          <Button variant="ghost" size="sm" onClick={() => signOut()}>
            Sign Out
          </Button>
          <Button
            size="sm"
            className="bg-red-600/15 hover:bg-red-600/25 text-red-400 hover:text-red-300 border border-red-500/20"
            onClick={() => setShowDeleteDialog(true)}
          >
            Delete Account
          </Button>
        </div>
      </div>

      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-sm rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-white mb-2">Delete account?</h2>
            <p className="text-gray-400 text-sm mb-6">
              This will permanently delete your account and all associated data,
              including your registered phone numbers and service area. This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteDialog(false)}
                disabled={deleting}
              >
                Cancel
              </Button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer bg-red-600 hover:bg-red-500 text-white"
              >
                {deleting ? "Deleting…" : "Yes, delete my account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
