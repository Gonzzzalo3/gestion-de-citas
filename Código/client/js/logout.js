// logout.js
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('profileToggle');
  const menu = document.getElementById('profileDropdown');

  if (toggle && menu) {
    // Alternar visibilidad al hacer clic en el icono
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    });

    // Cerrar menú si se hace clic fuera
    document.addEventListener('click', () => {
      menu.style.display = 'none';
    });
  }

  // Logout: busca el botón de logout y si existe, añade el evento click
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      // Limpia los datos de usuario en el localStorage
      localStorage.removeItem('usuario');
      // Redirige a la página de login
      window.location.href = '../../views/login.html';
    });
  } else {
    console.warn('No se encontró el botón de logout (logoutBtn).');
  }
});