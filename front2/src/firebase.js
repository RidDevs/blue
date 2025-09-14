// front/src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ⚠️ Replace with your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyDkc9f6Sr4Kq8s9MtwWK9k3i217Gjk9PBg",
  authDomain: "blue-3b61a.firebaseapp.com",
  projectId: "blue-3b61a",
  storageBucket: "blue-3b61a.firebasestorage.app",
  messagingSenderId: "55986917972",
  appId: "1:55986917972:web:70e7efc4452a1aab7393c1",
  measurementId: "G-22BEHR5BE0"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Services you’ll use in frontend
export const auth = getAuth(app);
export const db = getFirestore(app);
