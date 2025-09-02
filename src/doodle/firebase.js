import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; // <-- Add this line

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: "doodlenotepad-4d983",
  storageBucket: "doodlenotepad-4d983.appspot.com",
  messagingSenderId: "444977172237",
  appId: "1:444977172237:web:f6f107cbe7801308f2aa44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the Firestore instance
export const db = getFirestore(app);