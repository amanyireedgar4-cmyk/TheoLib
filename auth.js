import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.signup = async function () {
  const email = prompt("Email:");
  const password = prompt("Password:");

  const cred = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "users", cred.user.uid), {
    email: email,
    joinedAt: new Date(),
    booksRead: []
  });

  alert("Account created ✅");
};

window.login = async function () {
  const email = prompt("Email:");
  const password = prompt("Password:");

  await signInWithEmailAndPassword(auth, email, password);
  alert("Logged in ✅");
};

onAuthStateChanged(auth, user => {
  if (user) {
    console.log("Logged in as:", user.email);
  }
});


   
