// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKdqldqchO7tOXMfpO6vEj15GF17dtRbs",
  authDomain: "netflix-gpt-1a80c.firebaseapp.com",
  projectId: "netflix-gpt-1a80c",
  storageBucket: "netflix-gpt-1a80c.appspot.com",
  messagingSenderId: "933709731814",
  appId: "1:933709731814:web:f6d20bd20f602b35ee2827",
  measurementId: "G-X2Y4H8KQEQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();