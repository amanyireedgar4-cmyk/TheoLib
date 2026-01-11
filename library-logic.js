import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc, serverTimestamp } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let currentUser = null;

onAuthStateChanged(auth, user => {
  currentUser = user;
});

window.handleBookClick = async (title, author, link, access) => {
  if (access === "locked" && !currentUser) {
    localStorage.setItem("pendingBook", JSON.stringify({ title, author, link }));
    window.location.href = "auth.html";
    return;
  }

  // Save as READ
  if (currentUser) {
    await addDoc(
      collection(db, "users", currentUser.uid, "library", "read", "items"),
      {
        title,
        author,
        link,
        readAt: serverTimestamp()
      }
    );
  }

  window.open(link, "_blank");
};
