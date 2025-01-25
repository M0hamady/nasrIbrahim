// firebase-config.js
import { initializeApp } from 'firebase/app'; // Initialize Firebase
import { getAuth, GoogleAuthProvider } from 'firebase/auth'; // Import auth and Google provider

// Your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyAzdpIvkPF6CcblnAFoq-E8UmCZ85Id8RE",
  authDomain: "djangodynamictables.firebaseapp.com",
  projectId: "djangodynamictables",
  storageBucket: "djangodynamictables.firebasestorage.app",
  messagingSenderId: "577972585757",
  appId: "1:577972585757:web:852a7b9d0dbb83951d0df4",
  measurementId: "G-XMFWXWBL83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Export auth and provider
export { auth, GoogleAuthProvider };
