// ===== TheoLib Library UI Engine =====

// Sample book database (expandable to 100+)
const BOOKS = [
  { id: "b1", title: "Biology A-Level", category: "Study", thumb: "assets/books/bio.jpg" },
  { id: "b2", title: "Physics O-Level", category: "Study", thumb: "assets/books/physics.jpg" },
  { id: "b3", title: "Chemistry New Curriculum", category: "Study", thumb: "assets/books/chem.jpg" },

  { id: "b4", title: "African Folktales", category: "Literature", thumb: "assets/books/folk.jpg" },
  { id: "b5", title: "Shakespeare Simplified", category: "Literature", thumb: "assets/books/shake.jpg" },

  { id: "b6", title: "TheoLib Comics Vol.1", category: "Comics", thumb: "assets/books/comic1.jpg" },
  { id: "b7", title: "TheoLib Comics Vol.2", category: "Comics", thumb: "assets/books/comic2.jpg" },

  { id: "b8", title: "Young Authors Hub", category: "Creativity", thumb: "assets/books/creative.jpg" },
  { id: "b9", title: "Poems From Youth", category: "Creativity", thumb: "assets/books/poems.jpg" }
];

// Render library
function renderLibrary() {
  const grid = document.getElementById("libraryGrid");
  if (!grid) return;

  grid.innerHTML = "";

  BOOKS.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card";

    card.innerHTML = `
      <img src="${book.thumb}" alt="${book.title}">
      <div class="book-info">
        <h3>${book.title}</h3>
        <span class="tag">${book.category}</span>
        <div class="book-actions">
          <button class="read-btn">Read</button>
          <button class="save-btn">Save</button>
        </div>
      </div>
    `;

    // Read button
    card.querySelector(".read-btn").onclick = () => {
      if (attemptRead(book.id)) {
        alert("📖 Opening book: " + book.title);
      }
    };

    // Save button
    card.querySelector(".save-btn").onclick = () => {
      toggleSave(book.id);
      alert("📚 Saved to My Library");
    };

    grid.appendChild(card);
  });
}

// Init
document.addEventListener("DOMContentLoaded", renderLibrary);
