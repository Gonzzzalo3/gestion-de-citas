// verCitas.js
document.addEventListener('DOMContentLoaded', () => {
  // Recuperar usuario del localStorage
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  
  // Verificamos que exista usuario y sea de rol Paciente
  if (!usuario.id || usuario.rol !== 'Paciente') {
    console.warn('Usuario no autorizado o no logueado, redirigiendo a login');
    return window.location.href = '../login.html';
  }
  
  // Usar el id real del usuario
  const pacienteId = usuario.id;
  const citasTableBody = document.querySelector('#citasTable tbody');
  
  // Hacemos el fetch con el pacienteId obtenido del usuario de la sesión
  fetch(`http://localhost:3000/citas?paciente_id=${pacienteId}`)
    .then(res => res.json())
    .then(data => {
      if (data.citas && data.citas.length > 0) {
        data.citas.forEach(cita => {
          const tr = document.createElement('tr');

          // 1. ID
          const tdId = document.createElement('td');
          tdId.textContent = cita.id;
          tr.appendChild(tdId);

          // 2. Médico
          const tdMedico = document.createElement('td');
          tdMedico.textContent = `${cita.medico_nombre} ${cita.medico_apellido}`;
          tr.appendChild(tdMedico);

          // 3. Fecha
          const tdFecha = document.createElement('td');
          tdFecha.textContent = cita.fecha;
          tr.appendChild(tdFecha);

          // 4. Hora
          const tdHora = document.createElement('td');
          tdHora.textContent = cita.hora;
          tr.appendChild(tdHora);

          // 5. Motivo
          const tdMotivo = document.createElement('td');
          tdMotivo.textContent = cita.motivo;
          tr.appendChild(tdMotivo);

          // 6. Estado
          const tdEstado = document.createElement('td');
          tdEstado.textContent = cita.estado;
          tr.appendChild(tdEstado);

          // 7. Acciones
          const tdAcciones = document.createElement('td');
          if (cita.estado === 'Programada') {
            const btnCancelar = document.createElement('button');
            btnCancelar.textContent = 'Cancelar';
              btnCancelar.classList.add('cancelar-btn');
            btnCancelar.addEventListener('click', () => {
              window.location.href = `cancelarCita.html?cita_id=${cita.id}`;
            });
            tdAcciones.appendChild(btnCancelar);
          } else {
            // Muestra un guión cuando no está programada
            tdAcciones.textContent = '-';
          }
          tr.appendChild(tdAcciones);

          citasTableBody.appendChild(tr);
        });
      } else {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 7;
        td.textContent = 'No tienes citas registradas.';
        tr.appendChild(td);
        citasTableBody.appendChild(tr);
      }
    })
    .catch(error => {
      console.error('Error al cargar las citas:', error);
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = 7;
      td.textContent = 'Hubo un error al cargar las citas.';
      tr.appendChild(td);
      citasTableBody.appendChild(tr);
    });
});