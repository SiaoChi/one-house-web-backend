// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCubddP2HqMaGgTEGUbxdkEZX0Hu_h4vU",
  authDomain: "website-fd95d.firebaseapp.com",
  projectId: "website-fd95d",
  storageBucket: "website-fd95d.appspot.com",
  messagingSenderId: "706356253298",
  appId: "1:706356253298:web:7070dd088bf16112b4a8eb",
  measurementId: "G-5KVFR0YVQF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
