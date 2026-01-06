import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const msg = document.getElementById("msg");

document.getElementById("signupBtn").onclick = async () => {
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    // create Firestore user document
    await setDoc(doc(db, "users", res.user.uid), {
      email: res.user.email,
      role: "reader",
      createdAt: serverTimestamp()
    });

    msg.innerText = "Signup successful!";
    window.location.href = "index.html";
  } catch (err) {
    msg.innerText = err.message;
  }
};

document.getElementById("loginBtn").onclick = async () => {
  try {
    await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    msg.innerText = "Login successful!";
    window.location.href = "index.html";
  } catch (err) {
    msg.innerText = err.message;
  }
};

