// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ikeep-cf984.firebaseapp.com",
  projectId: "ikeep-cf984",
  storageBucket: "ikeep-cf984.appspot.com",
  messagingSenderId: "389924053877",
  appId: "1:389924053877:web:9890efb051c50f9ec0a93c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);