import {
  getFirestore,
  getDoc,
  setDoc,
  updateDoc,
  doc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  arrayUnion,
  Timestamp,
  type Unsubscribe,
} from "firebase/firestore";
import { getFirebaseApp } from "@/lib/firebase";
import type { Alert } from "@/types/alert";

function getDb() {
  const app = getFirebaseApp();
  if (!app) return null;
  return getFirestore(app);
}

// ── Users ──────────────────────────────────────────────────────────────────

export interface UserData {
  name: string;
  email: string;
  mobileNumbers: string[];
  areaId: string;
  createdAt: Timestamp;
}

export async function ensureUserInFirestore(
  uid: string,
  name: string,
  email: string
): Promise<void> {
  const db = getDb();
  if (!db) return;
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      name,
      email,
      mobileNumbers: [],
      areaId: "",
      createdAt: Timestamp.now(),
    });
  }
}

export async function getUserData(uid: string): Promise<UserData | null> {
  const db = getDb();
  if (!db) return null;
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return snap.data() as UserData;
}

// ── Mobile Numbers ─────────────────────────────────────────────────────────

export async function addMobileNumber(uid: string, phone: string): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firebase is not configured.");
  const data = await getUserData(uid);
  if (data && data.mobileNumbers.length >= 3) {
    throw new Error("You can only register up to 3 mobile numbers.");
  }
  await updateDoc(doc(db, "users", uid), {
    mobileNumbers: arrayUnion(phone),
  });
}

export async function updateMobileNumber(
  uid: string,
  index: number,
  phone: string
): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firebase is not configured.");
  const data = await getUserData(uid);
  if (!data) throw new Error("User not found.");
  const updated = [...data.mobileNumbers];
  updated[index] = phone;
  await updateDoc(doc(db, "users", uid), { mobileNumbers: updated });
}

export async function removeMobileNumber(uid: string, index: number): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firebase is not configured.");
  const data = await getUserData(uid);
  if (!data) throw new Error("User not found.");
  const updated = data.mobileNumbers.filter((_, i) => i !== index);
  await updateDoc(doc(db, "users", uid), { mobileNumbers: updated });
}

// ── Area ───────────────────────────────────────────────────────────────────

export async function setArea(uid: string, areaId: string): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firebase is not configured.");
  await updateDoc(doc(db, "users", uid), { areaId });
}

// ── Alerts ─────────────────────────────────────────────────────────────────

export function subscribeToAlerts(
  since: Date,
  onChange: (alerts: Alert[]) => void
): Unsubscribe {
  const db = getDb();
  if (!db) return () => {};
  const q = query(
    collection(db, "alerts"),
    where("detectedAt", ">=", Timestamp.fromDate(since)),
    orderBy("detectedAt", "desc")
  );
  return onSnapshot(q, (snap) => {
    const alerts = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Alert));
    onChange(alerts);
  });
}

export async function markAlertRead(alertId: string, uid: string): Promise<void> {
  const db = getDb();
  if (!db) return;
  await updateDoc(doc(db, "alerts", alertId), {
    readBy: arrayUnion(uid),
  });
}
