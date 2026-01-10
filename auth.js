function login(email) {
  localStorage.setItem("user", email);
  window.location.href = "library.html";
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

window.onload = () => {
  const authLink = document.getElementById("authLink");
  const user = localStorage.getItem("user");

  if (authLink) {
    authLink.textContent = user ? "Logout" : "Login";
    authLink.onclick = () => {
      user ? logout() : (window.location.href = "auth.html");
    };
  }
};
