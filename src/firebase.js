// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-ytfChvhv8nKAkh0CrPZPV5AqbKEKCF8",
  authDomain: "capstone-a9136.firebaseapp.com",
  projectId: "capstone-a9136",
  storageBucket: "capstone-a9136.appspot.com",
  messagingSenderId: "149550968258",
  appId: "1:149550968258:web:eba3e31369697558613a5b",
  measurementId: "G-DF1B3E3315"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
<<<<<<< HEAD
export const auth = getAuth(app);
=======
export const auth = getAuth(app); 
export const storage = getStorage(app);
>>>>>>> f7a39cfd37f63dd98039499b5e702a7c360f3478
