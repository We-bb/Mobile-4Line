import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getInstallations, getId } from "firebase/installations";
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra as any;

console.log("🔥 Firebase config loaded:", extra); //test

const firebaseConfig = {
  apiKey: extra.FIREBASE_API_KEY,
  authDomain: extra.FIREBASE_AUTH_DOMAIN,
  projectId: extra.FIREBASE_PROJECT_ID,
  storageBucket: extra.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: extra.FIREBASE_MESSAGING_SENDER_ID,
  appId: extra.FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function getDeviceId() {
  const ins = getInstallations(app);
  return await getId(ins);
}
