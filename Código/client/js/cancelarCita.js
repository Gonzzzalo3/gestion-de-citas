// cancelarCita.js
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM listo para cancelar cita');

  // 1) Verificar sesión
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  if (!usuario.id || usuario.rol !== 'Paciente') {
    console.warn('Usuario no autorizado o no logueado, redirigiendo a login');
    return window.location.href = '../login.html';
  }
  console.log('Paciente cancela cita:', usuario);

  // 2) Rellenar cita_id en el form
  const urlParams = new URLSearchParams(window.location.search);
  const citaId    = urlParams.get('cita_id');
  if (!citaId) {
    alert('No se especificó ID de cita');
    return window.location.href = 'verCitas.html';
  }
  document.getElementById('cita_id').value = citaId;
  console.log('Cancelar cita ID:', citaId);

  // 3) Envío form
  const form = document.getElementById('cancelarCitaForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    console.log('Submit cancelar cita');

    const data = {
      cita_id: citaId,
      motivo_cancelacion: document.getElementById('motivo_cancelacion').value.trim(),
      observacion: document.getElementById('observacion').value.trim()
    };
    console.log('Datos cancelación:', data);

    fetch('http://localhost:3000/citas/cancelar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => {
        console.log('Respuesta cancelar cita:', res.status, res.ok);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(result => {
        console.log('Cancelación result:', result);
        alert(result.message || 'Cita cancelada');
        window.location.href = 'verCitas.html';
      })
      .catch(err => {
        console.error('Error en cancelación:', err);
        alert('Error al cancelar la cita.');
      });
  });
});