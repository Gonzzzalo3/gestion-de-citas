// verCitasMedico.js
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM listo para historial médico');

  // 1) Leer usuario
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  if (!usuario.id || usuario.rol !== 'Medico') {
    console.warn('Usuario no autorizado o no logueado, redirigiendo a login');
    return window.location.href = '../login.html';
  }
  console.log('Médico logueado:', usuario);

  const medicoId       = usuario.id;
  const citasTableBody = document.querySelector('#citasTable tbody');

  // 2) Fetch
  fetch(`http://localhost:3000/citas/medico?medico_id=${medicoId}`)
    .then(res => {
      console.log('Fetch citas médico:', res.status, res.ok);
      return res.json();
    })
    .then(data => {
      console.log('Data citas médico:', data);
      if (data.citas && data.citas.length > 0) {
        data.citas.forEach(cita => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${cita.id}</td>
            <td>${cita.paciente_nombre} ${cita.paciente_apellido}</td>
            <td>${cita.fecha}</td>
            <td>${cita.hora}</td>
            <td>${cita.motivo}</td>
            <td>${cita.estado}</td>
          `;
          citasTableBody.appendChild(tr);
        });
      } else {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 6;
        td.textContent = 'No tienes citas asignadas.';
        tr.appendChild(td);
        citasTableBody.appendChild(tr);
      }
    })
    .catch(err => {
      console.error('Error al cargar citas médico:', err);
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = 6;
      td.textContent = 'Error al cargar las citas.';
      tr.appendChild(td);
      citasTableBody.appendChild(tr);
    });
});