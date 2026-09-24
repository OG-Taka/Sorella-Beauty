document.addEventListener('DOMContentLoaded', () => {
  const isLogged = localStorage.getItem('adminLogueado');

  if (isLogged !== 'true') {
    alert(
      'Acceso denegado. Debes iniciar sesión para ingresar al panel de Administración.',
    );
    window.location.href = '../pages/login.html';
  }

  const logoutLink = document.getElementById('logoutLink');

  if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('adminLogueado');
      window.location.href = '../pages/login.html';
    });
  }
});
