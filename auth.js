import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔑 YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyC7LjxapWLQCW_zLRCOZS25hWVEaOG1mFY",
  authDomain: "theolib-426cf.firebaseapp.com",
  projectId: "theolib-426cf",
  storageBucket: "theolib-426cf.firebasestorage.app",
  messagingSenderId: "879359514394",
  appId: "1:879359514394:web:259ad5ed2e8949e2e97ea3"
};

// INIT
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let isLogin = true;

// SWITCH MODE
window.toggleMode = function(){
  isLogin = !isLogin;
  document.getElementById("title").innerText =
    isLogin ? "Login" : "Create Account";
};

// AUTH HANDLER
window.handleAuth = async function(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if(!email || !password){
    alert("Fill all fields");
    return;
  }

  try{
    if(isLogin){
      await signInWithEmailAndPassword(auth,email,password);
    }else{
      const cred = await createUserWithEmailAndPassword(auth,email,password);
      await setDoc(doc(db,"users",cred.user.uid),{
        email,
        joinedAt: serverTimestamp(),
        role:"free",
        booksRead:[],
        subscription:{ status:"inactive" }
      });
    }

    window.location.href="library.html";

  }catch(err){
    alert(err.message);
  }
};
