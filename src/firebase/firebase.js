// Firebase Configuration for EnjoyBaja
// src/firebase/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { getStorage } from 'firebase/storage'; // Uncomment when you upgrade to Blaze
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCDrpk_NXKl7uHY-LBBH6InDmXYY54hzd0",
  authDomain: "auditdna-realestate.firebaseapp.com",
  projectId: "auditdna-realestate",
  storageBucket: "auditdna-realestate.firebasestorage.app",
  messagingSenderId: "56673649642",
  appId: "1:56673649642:web:79cc39bd559a2ab9612893",
  measurementId: "G-4E2X0L9H12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const storage = getStorage(app); // Uncomment when you upgrade to Blaze

export default app;