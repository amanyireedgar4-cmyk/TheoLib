import { books } from "./library.logic.js";

// DOM
const libraryGrid = document.getElementById("libraryGrid");

// Check login
function isLoggedIn() {
  return localStorage.getItem("theolib_user") !== null;
}

// Save book
function saveBook(bookId) {
  let saved = JSON.parse(localStorage.getItem("savedBooks")) || [];

  if (!saved.includes(bookId)) {
    saved.push(bookId);
    localStorage.setItem("savedBooks", JSON.stringify(saved));
    alert("Book saved to My Library");
  } else {
    alert("Already in your library");
  }
}

// Render books
function renderBooks() {
  libraryGrid.innerHTML = "";

  books.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card";

    card.innerHTML = `
      <img src="${book.cover}" alt="${book.title}">
      <h3>${book.title}</h3>
      <p class="author">${book.author}</p>
      <p class="category">${book.category}</p>

      ${
        book.price === 0
          ? `<button class="read-btn">Read</button>`
          : `<button class="paid-btn">Paid • $${book.price}</button>`
      }

      <button class="save-btn">Save</button>
    `;

    // Read / Paid logic
    card.querySelector(book.price === 0 ? ".read-btn" : ".paid-btn")
      .addEventListener("click", () => {
        if (book.price === 0) {
          alert(`Opening "${book.title}"`);
        } else {
          if (!isLoggedIn()) {
            window.location.href = "auth.html";
          } else {
            alert("Payment flow coming next");
          }
        }
      });

    // Save logic
    card.querySelector(".save-btn").addEventListener("click", () => {
      if (!isLoggedIn()) {
        window.location.href = "auth.html";
      } else {
        saveBook(book.id);
      }
    });

    libraryGrid.appendChild(card);
  });
}

renderBooks();
