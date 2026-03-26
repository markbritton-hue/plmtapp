// Firebase configuration
// Fill in your Firebase project config below before using the app.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB5FKrs0rys3ODV2U36YFjJWUu_BgFuDZk",
  authDomain: "powerlift-live.firebaseapp.com",
  projectId: "powerlift-live",
  storageBucket: "powerlift-live.firebasestorage.app",
  messagingSenderId: "627435482576",
  appId: "1:627435482576:web:77e721dedd55cb04a35dd5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
