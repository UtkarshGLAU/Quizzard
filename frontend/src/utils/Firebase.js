import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: "quizzardprojectgla.firebaseapp.com",
    projectId: "quizzardprojectgla",
    storageBucket: "quizzardprojectgla.firebasestorage.app",
    messagingSenderId: "227559779068",
    appId: "1:227559779068:web:783248a46e2fd9eef9c579"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }