const ADMIN_USER = "admin";
const ADMIN_PASS = "Prog4Com2";

const loginForm = document.getElementById("login-form");
const userInput = document.getElementById("user");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error-message");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const userIngresado = userInput.value.trim();
  const passwordIngresado = passwordInput.value;

  if (userIngresado === ADMIN_USER && passwordIngresado === ADMIN_PASS) {
    localStorage.setItem("adminLogueado", "true");
    window.location.href = "../pages/dashboard.html";
  } else {
    errorMessage.textContent = "Usuario o contraseña incorrectos.";
    errorMessage.style.display = "block";
  }
});
