import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHMmKDOEdt4uhEtgRqWv7CN0itnXY6j4M",
  authDomain: "final-project-auth-10cd6.firebaseapp.com",
  projectId: "final-project-auth-10cd6",
  storageBucket: "final-project-auth-10cd6.firebasestorage.app",
  messagingSenderId: "113698670531",
  appId: "1:113698670531:web:70762d917162a7d6705f76",
  measurementId: "G-3FM9F1M9ND"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);