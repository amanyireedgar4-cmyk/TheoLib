import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

window.login = async () => {
  const email = email.value;
  const password = password.value;

  await signInWithEmailAndPassword(auth, email, password);
  redirectBack();
};

window.signup = async () => {
  const email = email.value;
  const password = password.value;

  await createUserWithEmailAndPassword(auth, email, password);
  redirectBack();
};

function redirectBack() {
  const pending = localStorage.getItem("pendingBook");
  if (pending) {
    localStorage.removeItem("pendingBook");
    window.location.href = "library.html";
  } else {
    window.location.href = "library.html";
  }
}
