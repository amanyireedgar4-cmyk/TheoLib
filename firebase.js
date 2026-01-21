// ================================
// THEOLIB — FIREBASE CORE
// ONE FILE • FINAL VERSION
// ================================

// Import Firebase (v9 modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  arrayUnion, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// ================================
// FIREBASE CONFIG (YOURS)
// ================================
const firebaseConfig = {
  apiKey: "AIzaSyC7LjxapWLQCW_zLRCOZS25hWVEaOG1mFY",
  authDomain: "theolib-426cf.firebaseapp.com",
  projectId: "theolib-426cf",
  storageBucket: "theolib-426cf.appspot.com",
  messagingSenderId: "879359514394",
  appId: "1:879359514394:web:259ad5ed2e8949e2e97ea3"
};

// ================================
// INITIALIZE
// ================================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Make global
window.auth = auth;
window.db = db;

// ================================
// AUTH FUNCTIONS
// ================================

window.signup = async function(email, password, role = "reader") {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, "users", cred.user.uid), {
    email,
    role,
    joinedAt: serverTimestamp(),
    booksRead: [],
    booksSaved: []
  });
};

window.login = async function(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
};

window.logout = async function() {
  await signOut(auth);
  location.href = "index.html";
};

// ================================
// USER STATE
// ================================

window.currentUser = null;

onAuthStateChanged(auth, user => {
  if (user) {
    window.currentUser = user;
    document.body.classList.add("logged-in");
  } else {
    window.currentUser = null;
    document.body.classList.remove("logged-in");
  }
});

// ================================
// BOOK TRACKING
// ================================

window.readBook = async function(title, author, link) {
  if (!currentUser) {
    alert("Please login to read this book.");
    location.href = "auth.html";
    return;
  }

  const userRef = doc(db, "users", currentUser.uid);

  await updateDoc(userRef, {
    booksRead: arrayUnion({
      title,
      author,
      link,
      readAt: new Date()
    })
  });

  window.open(link, "_blank");
};

window.saveBook = async function(title, author, cover, link) {
  if (!currentUser) {
    alert("Login to save books to your library.");
    location.href = "auth.html";
    return;
  }

  const userRef = doc(db, "users", currentUser.uid);

  await updateDoc(userRef, {
    booksSaved: arrayUnion({
      title,
      author,
      cover,
      link,
      savedAt: new Date()
    })
  });

  alert("Saved to My Library ✅");
};

// ================================
// LOAD MY LIBRARY
// ================================

window.loadMyLibrary = async function() {
  if (!currentUser) return;

  const snap = await getDoc(doc(db, "users", currentUser.uid));
  if (!snap.exists()) return;

  const data = snap.data();

  const savedEl = document.getElementById("savedBooks");
  const readEl = document.getElementById("readBooks");

  savedEl.innerHTML = "";
  readEl.innerHTML = "";

  data.booksSaved.forEach(b => {
    savedEl.innerHTML += `
      <div class="book-card">
        <img src="${b.cover}">
        <h4>${b.title}</h4>
        <p>${b.author}</p>
        <a href="${b.link}" target="_blank">Read</a>
      </div>
    `;
  });

  data.booksRead.forEach(b => {
    readEl.innerHTML += `
      <div class="book-card">
        <h4>${b.title}</h4>
        <p>${b.author}</p>
        <small>Read ✔</small>
      </div>
    `;
  });
};
