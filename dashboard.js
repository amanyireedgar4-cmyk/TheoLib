import { auth, db } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  getDoc,
  getDocs,
  collection
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ==============================
   AUTH CHECK
================================ */
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "auth.html";
    return;
  }

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return;

  const userData = userSnap.data();

  loadUserDashboard(user.uid);

  if (userData.role === "admin") {
    document.getElementById("adminDashboard").classList.remove("hidden");
    loadAdminDashboard();
  }
});

/* ==============================
   USER DASHBOARD
================================ */
async function loadUserDashboard(uid) {
  const activityRef = collection(db, "activityLogs");
  const snapshot = await getDocs(activityRef);

  let reads = 0;
  let saved = 0;

  const logList = document.getElementById("userActivityLog");
  logList.innerHTML = "";

  snapshot.forEach(docSnap => {
    const log = docSnap.data();
    if (log.uid === uid) {

      if (log.type === "read") reads++;
      if (log.type === "save") saved++;

      const li = document.createElement("li");
      li.textContent = `${log.action} • ${new Date(log.time).toLocaleString()}`;
      logList.appendChild(li);
    }
  });

  document.getElementById("userReads").textContent = reads;
  document.getElementById("userSaved").textContent = saved;
}

/* ==============================
   ADMIN DASHBOARD
================================ */
async function loadAdminDashboard() {
  const usersSnap = await getDocs(collection(db, "users"));
  const activitySnap = await getDocs(collection(db, "activityLogs"));
  const booksSnap = await getDocs(collection(db, "books"));

  document.getElementById("totalUsers").textContent = usersSnap.size;
  document.getElementById("totalBooks").textContent = booksSnap.size;

  let totalReads = 0;
  const traffic = {};

  activitySnap.forEach(docSnap => {
    const log = docSnap.data();
    if (log.type === "read") totalReads++;

    const key = `${log.country} | ${log.device} | ${log.browser}`;
    traffic[key] = (traffic[key] || 0) + 1;
  });

  document.getElementById("totalReads").textContent = totalReads;

  const trafficList = document.getElementById("trafficStats");
  trafficList.innerHTML = "";

  Object.entries(traffic).forEach(([key, count]) => {
    const li = document.createElement("li");
    li.textContent = `${key} → ${count} visits`;
    trafficList.appendChild(li);
  });
}

/* ==============================
   LOGOUT
================================ */
window.logout = async function () {
  await signOut(auth);
  window.location.href = "index.html";
};
