const books = [
  {
    id: "b1",
    title: "The Three Musketeers",
    free: true,
    link: "https://www.gutenberg.org/ebooks/1257"
  },
  {
    id: "b2",
    title: "Intro to AI",
    free: false
  }
];

const freeContainer = document.getElementById("freeBooks");
const premiumContainer = document.getElementById("premiumBooks");

const user = localStorage.getItem("user");

books.forEach(book => {
  const div = document.createElement("div");
  div.className = "book";
  div.innerHTML = `<h3>${book.title}</h3>`;

  if (book.free) {
    div.innerHTML += `<a href="${book.link}" target="_blank">Read Free</a>`;
    freeContainer.appendChild(div);
  } else {
    const btn = document.createElement("button");
    btn.textContent = "Read";

    btn.onclick = () => {
      if (!user) {
        alert("Please sign in to access this book.");
        window.location.href = "auth.html";
      } else {
        alert("Premium access granted (payment coming next phase)");
      }
    };

    div.appendChild(btn);
    premiumContainer.appendChild(div);
  }
});
