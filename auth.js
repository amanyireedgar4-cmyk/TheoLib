let mode = "login";

function switchMode() {
  mode = mode === "login" ? "signup" : "login";
  document.getElementById("title").textContent =
    mode === "login" ? "Login" : "Sign Up";

  document.querySelector(".toggle").textContent =
    mode === "login"
      ? "Don’t have an account? Sign up"
      : "Already have an account? Login";
}

function togglePassword() {
  const p = document.getElementById("password");
  p.type = p.type === "password" ? "text" : "password";
}

function submitAuth() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  if (!email || !password) {
    alert("Fill all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (mode === "signup") {
    if (users[email]) {
      alert("Account already exists");
      return;
    }

    users[email] = {
      email,
      password,
      role,
      created: new Date().toISOString()
    };

    localStorage.setItem("users", JSON.stringify(users));
  } else {
    if (!users[email] || users[email].password !== password) {
      alert("Invalid login");
      return;
    }
  }

  localStorage.setItem("currentUser", email);

  // Redirect
  if (role === "author") {
    window.location.href = "dashboard.html";
  } else {
    window.location.href = "library.html";
  }
}
