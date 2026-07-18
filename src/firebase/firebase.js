// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Tambahkan import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCz8odcDmBIBCr9sWZZpG3PLJmyubkh9iU",
    authDomain: "bukas-web.firebaseapp.com",
    projectId: "bukas-web",
    storageBucket: "bukas-web.firebasestorage.app",
    messagingSenderId: "337039658252",
    appId: "1:337039658252:web:79a2562eb39d7aadf28d29",
    measurementId: "G-MPCFLFY0Q9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inisialisasi dan export layanan Firebase
export const auth = getAuth(app);
export const db = getFirestore(app); // Export db agar bisa digunakan di useKasStore.js

export default app;