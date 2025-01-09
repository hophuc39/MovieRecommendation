import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDTPpVjMY23QRAX-Jg0irwgCxCvgu8JZMc",
  authDomain: "movie-recommendation-ee697.firebaseapp.com",
  projectId: "movie-recommendation-ee697",
  storageBucket: "movie-recommendation-ee697.firebasestorage.app",
  messagingSenderId: "802687764133",
  appId: "1:802687764133:web:0863417e63272230556f4c",
  measurementId: "G-788PT6JP4S"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);