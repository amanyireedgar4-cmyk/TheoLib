// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC7LjxapWLQCW_zLRCOZS25hWVEaOG1mFY",
  authDomain: "theolib-426cf.firebaseapp.com",
  projectId: "theolib-426cf",
  storageBucket: "theolib-426cf.firebasestorage.app",
  messagingSenderId: "879359514394",
  appId: "1:879359514394:web:259ad5ed2e8949e2e97ea3"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
