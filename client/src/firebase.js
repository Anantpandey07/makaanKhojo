// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "makaankhojo-94640.firebaseapp.com",
  projectId: "makaankhojo-94640",
  storageBucket: "makaankhojo-94640.appspot.com",
  messagingSenderId: "532030651716",
  appId: "1:532030651716:web:d7e1e716e37aaf9b3ceb11"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);