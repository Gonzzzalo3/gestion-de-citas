// Escucha el evento submit del formulario con id "registroForm"
document.getElementById('registroForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Recoge los valores de cada campo del formulario de registro
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const dni = document.getElementById('dni').value;
  const fecha_nacimiento = document.getElementById('fecha_nacimiento').value;

  // Realiza una petición POST al endpoint de registro del servidor
  fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre,
      apellido,
      email,
      password,
      dni,
      fecha_nacimiento,
      rol: 'Paciente', // Valor por defecto para este ejemplo
      estado: 'Activo'
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.message === 'Usuario registrado') {
      // Si el registro es exitoso, informa al usuario y redirige a la página de login
      alert('Registro exitoso, ahora puedes iniciar sesión.');
      window.location.href = 'login.html';
    } else {
      // Si ocurre un error, muestra un mensaje de error
      alert('Error en el registro: ' + (data.error || ''));
    }
  })
  .catch(error => console.error('Error en registro:', error));
});