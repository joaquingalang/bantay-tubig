import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { getFirebaseApp } from "@/lib/firebase";

function getFirebaseAuth() {
  const app = getFirebaseApp();
  if (!app) return null;
  return getAuth(app);
}

export async function signInWithGoogle(): Promise<User> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase is not configured.");
  const result = await signInWithPopup(auth, new GoogleAuthProvider());
  return result.user;
}

export async function signInWithEmail(email: string, password: string): Promise<User> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase is not configured.");
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function signUp(name: string, email: string, password: string): Promise<User> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase is not configured.");
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(result.user, { displayName: name });
  return result.user;
}

export async function signOut(): Promise<void> {
  const auth = getFirebaseAuth();
  if (auth) await firebaseSignOut(auth);
}
