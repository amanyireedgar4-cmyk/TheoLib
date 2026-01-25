import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ==============================
   AUTO REDIRECT IF LOGGED IN
================================ */
onAuthStateChanged(auth, (user) => {
  if (user && location.pathname.includes("auth.html")) {
    window.location.href = "library.html";
  }
});

/* ==============================
   SIGN UP
================================ */
window.signup = async function () {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const role = document.querySelector("input[name='role']:checked")?.value;

  if (!email || !password || !role) {
    alert("Please fill all fields.");
    return;
  }

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    const isAdmin = email === "theolib41@gmail.com"; // ADMIN EMAIL

    await setDoc(doc(db, "users", cred.user.uid), {
      email,
      role: isAdmin ? "admin" : role,
      joinedAt: serverTimestamp(),
      savedBooks: [],
      readBooks: [],
      paymentBalance: 0
    });

    window.location.href = "library.html";
  } catch (err) {
    alert(err.message);
  }
};

/* ==============================
   LOGIN
================================ */
window.login = async function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Fill all fields.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "library.html";
  } catch (err) {
    alert(err.message);
  }
};

/* ==============================
   PASSWORD TOGGLE
================================ */
window.togglePassword = function (id) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
};
