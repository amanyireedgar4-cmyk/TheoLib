// auth.js
import {
  auth,
  db
} from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// SIGN UP
window.signup = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  if (!email || !password) {
    alert("Email and password required");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: email,
      role: role,
      createdAt: serverTimestamp(),
      library: [],
      readBooks: [],
      savedBooks: []
    });

    alert("Account created successfully!");
    redirectUser(role);

  } catch (error) {
    alert(error.message);
  }
};

// LOGIN
window.login = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Email and password required");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (!userDoc.exists()) {
      alert("User profile missing.");
      return;
    }

    const role = userDoc.data().role;
    redirectUser(role);

  } catch (error) {
    alert(error.message);
  }
};

// REDIRECT BASED ON ROLE
function redirectUser(role) {
  if (role === "author") {
    window.location.href = "dashboard.html";
  } else if (role === "library") {
    window.location.href = "dashboard.html";
  } else {
    window.location.href = "library.html";
  }
}
