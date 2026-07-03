// Firebase client initialization.
// The values come from NEXT_PUBLIC_* env vars (safe to expose — this is the
// public web config). Fill them in .env.local (see .env.local.example).
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getAuth, type Auth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Avoid re-initializing during hot reloads / multiple imports.
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const db: Firestore = getFirestore(app)

// Auth is used by the /admin panel to sign the owner in before they can
// add or remove news clippings. It is initialized lazily (on first call in
// the browser) rather than at import time: getAuth() throws
// `auth/invalid-api-key` when the NEXT_PUBLIC_FIREBASE_* env vars are absent,
// which would otherwise crash the production build while prerendering /admin.
let authInstance: Auth | undefined
export function getFirebaseAuth(): Auth {
  if (!authInstance) authInstance = getAuth(app)
  return authInstance
}

export default app
