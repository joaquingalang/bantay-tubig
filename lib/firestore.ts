import { getFirestore } from "firebase/firestore";
import {
  getDoc,
  setDoc,
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import type { SubscriberNumberWithId } from "@/types/subscriber";
import { getFirebaseApp } from "@/lib/firebase";

function getDb() {
  const app = getFirebaseApp();
  if (!app) return null;
  return getFirestore(app);
}

export async function ensureUserInFirestore(uid: string, email: string): Promise<void> {
  const db = getDb();
  if (!db) return;
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) await setDoc(ref, { email, createdAt: new Date().toISOString() });
}

export async function getSubscriberNumbers(uid: string): Promise<SubscriberNumberWithId[]> {
  const db = getDb();
  if (!db) return [];
  const snap = await getDocs(collection(db, "users", uid, "numbers"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as SubscriberNumberWithId));
}

export async function addSubscriberNumber(
  uid: string,
  data: { phone_number: string; label?: string }
): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firebase is not configured.");
  await addDoc(collection(db, "users", uid, "numbers"), data);
}

export async function updateSubscriberNumber(
  uid: string,
  id: string,
  data: { phone_number: string; label?: string }
): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firebase is not configured.");
  const ref = doc(db, "users", uid, "numbers", id);
  await updateDoc(ref, data);
}

export async function removeSubscriberNumber(uid: string, id: string): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firebase is not configured.");
  const ref = doc(db, "users", uid, "numbers", id);
  await deleteDoc(ref);
}

export type Subscription = { area: string; is_active: boolean } | null;

export async function getSubscription(uid: string): Promise<Subscription> {
  const db = getDb();
  if (!db) return null;
  const snap = await getDoc(doc(db, "users", uid, "subscription", "current"));
  if (!snap.exists()) return null;
  return snap.data() as Subscription;
}

export async function setSubscription(uid: string, area: string, is_active: boolean): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firebase is not configured.");
  await setDoc(doc(db, "users", uid, "subscription", "current"), { area, is_active });
}
