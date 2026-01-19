// mylibrary.js

document.addEventListener("DOMContentLoaded", () => {
  const savedContainer = document.getElementById("savedBooks");
  const readContainer = document.getElementById("readBooks");

  const user = JSON.parse(localStorage.getItem("theolib_user"));

  if (!user) {
    alert("Please log in to access your library.");
    window.location.href = "auth.html";
    return;
  }

  const userId = user.email;

  const savedBooks = JSON.parse(localStorage.getItem(`savedBooks_${userId}`)) || [];
  const readBooks = JSON.parse(localStorage.getItem(`readBooks_${userId}`)) || [];

  renderBooks(savedBooks, savedContainer, "No saved books yet.");
  renderBooks(readBooks, readContainer, "No books read yet.");
});

function renderBooks(books, container, emptyMessage) {
  container.innerHTML = "";

  if (books.length === 0) {
    container.innerHTML = `<p class="empty-msg">${emptyMessage}</p>`;
    return;
  }

  books.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card";

    card.innerHTML = `
      <img src="${book.thumbnail}" alt="${book.title}">
      <h3>${book.title}</h3>
      <p class="author">${book.author || "Unknown Author"}</p>
      <button onclick="openBook('${book.id}')">Open</button>
    `;

    container.appendChild(card);
  });
}

function openBook(bookId) {
  localStorage.setItem("currentBook", bookId);
  window.location.href = "library.html";
}
