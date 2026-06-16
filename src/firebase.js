import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD6Vp8ifPPfuim_x64_C2NGRZu1gZ3A0C0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "portfolio-lussixuss.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "portfolio-lussixuss",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "portfolio-lussixuss.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "741026510175",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:741026510175:web:94387d2f9074710ae2f2ea",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-TTRJWR7Z4C"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;
