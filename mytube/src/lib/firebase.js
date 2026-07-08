// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJeuJtiH3UkAIR89WYMMbUubOBp9wDVFY",
  authDomain: "mytube-6ba6e.firebaseapp.com",
  projectId: "mytube-6ba6e",
  storageBucket: "mytube-6ba6e.firebasestorage.app",
  messagingSenderId: "229643598182",
  appId: "1:229643598182:web:24d0dcc0fd1792d483f0a7",
  measurementId: "G-B1FY1H1T98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
