import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let currentUser = null;
let currentUserData = null;

/* ==============================
   AUTH WATCHER
================================ */
onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    const snap = await getDoc(doc(db, "users", user.uid));
    currentUserData = snap.exists() ? snap.data() : null;
  }
});

/* ==============================
   READ BOOK
================================ */
window.readBook = async function (title, author, url, isFree) {

  if (!isFree && !currentUser) {
    alert("Please sign in to access this book.");
    window.location.href = "auth.html";
    return;
  }

  // Track reading if logged in
  if (currentUser) {
    await updateDoc(doc(db, "users", currentUser.uid), {
      readBooks: arrayUnion({
        title,
        author,
        url,
        readAt: serverTimestamp()
      })
    });
  }

  window.open(url, "_blank");
};

/* ==============================
   SAVE BOOK
================================ */
window.saveBook = async function (title, author, thumbnail) {

  if (!currentUser) {
    alert("Sign in to save books to your library.");
    window.location.href = "auth.html";
    return;
  }

  await updateDoc(doc(db, "users", currentUser.uid), {
    savedBooks: arrayUnion({
      title,
      author,
      thumbnail,
      savedAt: serverTimestamp()
    })
  });

  alert("Book saved to My Library 📚");
};

/* ==============================
   LOAD MY LIBRARY
================================ */
window.loadMyLibrary = async function () {

  if (!currentUser) {
    window.location.href = "auth.html";
    return;
  }

  const readList = document.getElementById("readBooks");
  const savedList = document.getElementById("savedBooks");

  readList.innerHTML = "";
  savedList.innerHTML = "";

  currentUserData.readBooks?.forEach(book => {
    readList.innerHTML += `
      <div class="book-row">
        <strong>${book.title}</strong>
        <span>${book.author}</span>
      </div>
    `;
  });

  currentUserData.savedBooks?.forEach(book => {
    savedList.innerHTML += `
      <div class="book-row">
        <strong>${book.title}</strong>
        <span>${book.author}</span>
      </div>
    `;
  });
};
