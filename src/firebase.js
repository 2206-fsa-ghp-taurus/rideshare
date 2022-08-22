// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
const db = getFirestore(app)
export default db
