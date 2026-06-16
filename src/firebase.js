import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6Vp8ifPPfuim_x64_C2NGRZu1gZ3A0C0",
  authDomain: "portfolio-lussixuss.firebaseapp.com",
  projectId: "portfolio-lussixuss",
  storageBucket: "portfolio-lussixuss.firebasestorage.app",
  messagingSenderId: "741026510175",
  appId: "1:741026510175:web:94387d2f9074710ae2f2ea",
  measurementId: "G-TTRJWR7Z4C"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;
