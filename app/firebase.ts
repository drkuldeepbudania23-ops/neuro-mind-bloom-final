import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2bX4cWgV7sKhKmNflLGJSvAU6CqrTizw",
  authDomain: "neuro-mind-bloom.firebaseapp.com",
  projectId: "neuro-mind-bloom",
  storageBucket: "neuro-mind-bloom.firebasestorage.app",
  messagingSenderId: "490755788596",
  appId: "1:490755788596:web:47903c4e6bbc029e00df61",
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;