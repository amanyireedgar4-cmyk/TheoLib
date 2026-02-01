const currentUser = localStorage.getItem("currentUser");
const users = JSON.parse(localStorage.getItem("users")) || {};
let books = JSON.parse(localStorage.getItem("books")) || [];

if (!currentUser) {
  window.location.href = "auth.html";
}

// STATS
document.getElementById("totalUsers").textContent =
  Object.keys(users).length;

document.getElementById("totalBooks").textContent =
  books.length;

document.getElementById("totalAuthors").textContent =
  Object.values(users).filter(u => u.role === "author").length;

// USERS TABLE
const userTable = document.getElementById("userTable");
Object.values(users).forEach(u => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${u.email}</td>
    <td>${u.role}</td>
    <td>${new Date(u.created).toLocaleDateString()}</td>
  `;
  userTable.appendChild(row);
});

// UPLOAD BOOK
function uploadBook() {
  const title = document.getElementById("bookTitle").value;
  const category = document.getElementById("bookCategory").value;
  const price = document.getElementById("bookPrice").value;

  if (!title || !category) {
    alert("Fill all fields");
    return;
  }

  books.push({
    id: Date.now(),
    title,
    category,
    price: Number(price) || 0,
    author: currentUser,
    created: new Date().toISOString()
  });

  localStorage.setItem("books", JSON.stringify(books));
  alert("Book uploaded successfully");
  location.reload();
}

// LOGOUT
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "auth.html";
}
