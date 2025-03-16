// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwfQ401X9rz_kz4uMzV7_8EHsC-1d9dVs",
  authDomain: "e-commerceapp-c9131.firebaseapp.com",
  projectId: "e-commerceapp-c9131",
  storageBucket: "e-commerceapp-c9131.firebasestorage.app",
  messagingSenderId: "691719450450",
  appId: "1:691719450450:web:f4777262f3fe11db29d48b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db= getFirestore(app)
export default app;
