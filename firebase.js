// ===============================
// THEOLIB FIREBASE CORE
// ===============================

// Firebase imports (CDN style)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ===============================
// CONFIG (YOUR PROJECT)
// ===============================
const firebaseConfig = {
  apiKey: "AIzaSyC7LjxapWLQCW_zLRCOZS25hWVEaOG1mFY",
  authDomain: "theolib-426cf.firebaseapp.com",
  projectId: "theolib-426cf",
  storageBucket: "theolib-426cf.appspot.com",
  messagingSenderId: "879359514394",
  appId: "1:879359514394:web:259ad5ed2e8949e2e97ea3"
};

// ===============================
// INIT
// ===============================
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// ===============================
// AUTH STATE (GLOBAL)
// ===============================
export let currentUser = null;
export let isAdmin = false;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;

    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, {
        email: user.email,
        role: "user", // admin | author | user
        joinedAt: serverTimestamp(),
        booksRead: [],
        booksSaved: [],
        country: null,
        device: navigator.userAgent
      });
    }

    const data = (await getDoc(ref)).data();
    isAdmin = data.role === "admin";

    console.log("Logged in:", user.email, "Admin:", isAdmin);
  } else {
    currentUser = null;
    isAdmin = false;
    console.log("Logged out");
  }
});

// ===============================
// AUTH FUNCTIONS
// ===============================
export async function signup(email, password, role = "user") {
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "users", cred.user.uid), {
    email,
    role,
    joinedAt: serverTimestamp(),
    booksRead: [],
    booksSaved: [],
    device: navigator.userAgent
  });
}

export async function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function logout() {
  return signOut(auth);
}

// ===============================
// BOOK TRACKING
// ===============================
export async function markBookRead(book) {
  if (!currentUser) return;

  const ref = doc(db, "users", currentUser.uid);
  await updateDoc(ref, {
    booksRead: arrayUnion({
      ...book,
      time: Date.now()
    })
  });
}

export async function saveBook(book) {
  if (!currentUser) return;

  const ref = doc(db, "users", currentUser.uid);
  await updateDoc(ref, {
    booksSaved: arrayUnion(book)
  });
}

// ===============================
// ACCESS CONTROL
// ===============================
export function requireLogin(action) {
  if (!currentUser) {
    alert("Please login or sign up to continue 📚");
    window.location.href = "auth.html";
    return false;
  }
  return true;
}
