// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA-ytfChvhv8nKAkh0CrPZPV5AqbKEKCF8',
  authDomain: 'capstone-a9136.firebaseapp.com',
  projectId: 'capstone-a9136',
  storageBucket: 'capstone-a9136.appspot.com',
  messagingSenderId: '149550968258',
  appId: '1:149550968258:web:eba3e31369697558613a5b',
  measurementId: 'G-DF1B3E3315',
};

// const firebaseConfig = {
//   apiKey: "AIzaSyAnl1VSUz3GOQKD_DF78kr_Dqynu_U0ff8",
//   authDomain: "test-bfcd5.firebaseapp.com",
//   projectId: "test-bfcd5",
//   storageBucket: "test-bfcd5.appspot.com",
//   messagingSenderId: "1054366210960",
//   appId: "1:1054366210960:web:b7e12a0c03fda90a33b115",
//   measurementId: "G-K8TNE2HPQ8"
//  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
