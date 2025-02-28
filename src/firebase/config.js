// Import necessary functions from Firebase SDK  
import { initializeApp } from 'firebase/app';  
import { getAuth } from 'firebase/auth';  
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Add Storage
// Firebase configuration object containing project-specific details  
const firebaseConfig = {  
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: "G-S873XDN5BY" // Analytics measurement ID (used for Firebase Analytics)  
};  

// Initialize the Firebase app with the given configuration  
const app = initializeApp(firebaseConfig);  

// Get the authentication instance to manage user sign-in and authentication  
export const auth = getAuth(app);  

// Exporting `auth` allows you to use Firebase authentication throughout your application  

export const db = getFirestore(app); // Export Firestore instance

export const storage = getStorage(app); // Export Storage instance










