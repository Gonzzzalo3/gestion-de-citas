// public/js/login.js
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM listo para login');

  // 1) Referencia al formulario
  const loginForm = document.getElementById('loginForm');
  if (!loginForm) {
    console.error('Formulario #loginForm no encontrado');
    return;
  }

  // 2) Captura del submit
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    console.log('Submit login disparado');

    // 3) Lectura de campos
    const email    = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    console.log('Intentando login con:', email);

    // 4) Petición al servidor
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(response => {
        console.log('Respuesta login:', response.status, response.ok);
        console.log('Content-Type:', response.headers.get('Content-Type'));
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Payload login:', data);

        if (data.usuario) {
          // 5a) Guardar usuario en localStorage
          localStorage.setItem('usuario', JSON.stringify(data.usuario));
          console.log('Usuario almacenado en localStorage:', data.usuario);

          // 5b) Redirigir al home según rol
          switch (data.usuario.rol) {
            case 'Paciente':
              console.log('Redirigiendo a paciente/home.html');
              window.location.href = 'paciente/home.html';
              break;
            case 'Medico':
              console.log('Redirigiendo a medico/home.html');
              window.location.href = 'medico/home.html';
              break;
            default:
              console.log('Redirigiendo a home.html (rol desconocido)');
              window.location.href = 'home.html';
          }
        } else {
          // 6) Credenciales inválidas
          const msg = data.message || data.error || 'Credenciales inválidas';
          console.warn('Login fallido:', msg);
          alert('Error al iniciar sesión: ' + msg);
        }
      })
      .catch(err => {
        console.error('Error en fetch login:', err);
        alert('Error al iniciar sesión. Revisa la consola para más detalles.');
      });
  });
});