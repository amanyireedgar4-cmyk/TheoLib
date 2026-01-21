// mylibrary.js

import {
  getSavedBooks,
  getReadBooks
} from "./library.logic.js";

// Ensure user is logged in
const user = JSON.parse(localStorage.getItem("theolibUser"));
if (!user) {
  alert("Please sign in to access your library.");
  window.location.href = "auth.html";
}

// Elements
const savedGrid = document.getElementById("savedBooksGrid");
const readGrid = document.getElementById("readBooksGrid");

// Load Saved Books
function loadSavedBooks() {
  const savedBooks = getSavedBooks(user.email);

  if (savedBooks.length === 0) {
    savedGrid.innerHTML = "<p>No saved books yet.</p>";
    return;
  }

  savedGrid.innerHTML = "";

  savedBooks.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card";

    card.innerHTML = `
      <img src="${book.thumbnail}" alt="${book.title}">
      <h3>${book.title}</h3>
      <p>${book.category}</p>
      <a href="${book.link}" target="_blank" class="read-btn">Read</a>
    `;

    savedGrid.appendChild(card);
  });
}

// Load Read Books
function loadReadBooks() {
  const readBooks = getReadBooks(user.email);

  if (readBooks.length === 0) {
    readGrid.innerHTML = "<p>No books read yet.</p>";
    return;
  }

  readGrid.innerHTML = "";

  readBooks.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card";

    card.innerHTML = `
      <img src="${book.thumbnail}" alt="${book.title}">
      <h3>${book.title}</h3>
      <p>${book.category}</p>
    `;

    readGrid.appendChild(card);
  });
}

// Init
loadSavedBooks();
loadReadBooks();
