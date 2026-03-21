// Firebase configuration
// Fill in your Firebase project config below before using the app.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAAajhyQlWJ1JaSQrXXoemBEWJ6UFR7W4E",
  authDomain: "plmtapp.firebaseapp.com",
  projectId: "plmtapp",
  storageBucket: "plmtapp.firebasestorage.app",
  messagingSenderId: "832823759757",
  appId: "1:832823759757:web:ad58b6257357670a8063c4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
