// agendar.js
document.addEventListener('DOMContentLoaded', () => {
  // 1) Recuperar usuario de localStorage
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  if (!usuario.id || usuario.rol !== 'Paciente') {
    console.warn('Sesión inválida o no es paciente, redirigiendo a login');
    return window.location.href = '../login.html';
  }
  console.log('Paciente logueado:', usuario);

  // 2) Referencias a campos
  const especialidadSelect = document.getElementById('especialidad');
  const medicoSelect       = document.getElementById('medico');
  const horarioSelect      = document.getElementById('horario');
  const fechaInput         = document.getElementById('fecha');
  const motivoInput        = document.getElementById('motivo');
  const form               = document.getElementById('agendarCitaForm');

  // 3) Cargar especialidades
  fetch('http://localhost:3000/especialidades')
    .then(r => r.json())
    .then(data => {
      console.log('Especialidades recibidas:', data);
      data.especialidades.forEach(e => {
        const opt = document.createElement('option');
        opt.value   = e.id;
        opt.textContent = e.nombre;
        especialidadSelect.appendChild(opt);
      });
    })
    .catch(err => console.error('Error al cargar especialidades:', err));

  // 4) Al cambiar especialidad, cargar médicos
  especialidadSelect.addEventListener('change', () => {
    medicoSelect.innerHTML  = '<option value="">Seleccione un médico</option>';
    horarioSelect.innerHTML = '<option value="">Seleccione un horario</option>';
    const espId = especialidadSelect.value;
    if (!espId) return;

    fetch(`http://localhost:3000/medicos?especialidad_id=${espId}`)
      .then(r => r.json())
      .then(data => {
        console.log('Médicos recibidos:', data);
        data.medicos.forEach(m => {
          const opt = document.createElement('option');
          opt.value   = m.id;
          opt.textContent = `${m.nombre} ${m.apellido}`;
          medicoSelect.appendChild(opt);
        });
      })
      .catch(err => console.error('Error al cargar médicos:', err));
  });

  // 5) Función para cargar horarios según médico y fecha
  function cargarHorarios() {
    horarioSelect.innerHTML = '<option value="">Seleccione un horario</option>';
    const medId = medicoSelect.value;
    const fecha = fechaInput.value;
    if (!medId || !fecha) return;

    const diaSemana = new Date(fecha + 'T00:00:00')
      .toLocaleDateString('es-ES', { weekday: 'long' });

    fetch(`http://localhost:3000/horarios?medico_id=${medId}`)
      .then(r => r.json())
      .then(data => {
        console.log('Horarios recibidos:', data);
        data.horarios.forEach(h => {
          if (h.dia_semana.toLowerCase() === diaSemana.toLowerCase()) {
            const opt = document.createElement('option');
            opt.value   = JSON.stringify(h);
            opt.textContent = `${h.dia_semana}: ${h.hora_inicio} - ${h.hora_fin}`;
            horarioSelect.appendChild(opt);
          }
        });
      })
      .catch(err => console.error('Error al cargar horarios:', err));
  }

  medicoSelect.addEventListener('change', cargarHorarios);
  fechaInput.addEventListener('change', cargarHorarios);

  // 6) Validación de día/hora
  fechaInput.addEventListener('change', () => {
    if (!horarioSelect.value) {
      fechaInput.setCustomValidity('');
      return;
    }
    const h = JSON.parse(horarioSelect.value);
    const diaFecha    = new Date(fechaInput.value + 'T00:00:00')
      .toLocaleDateString('es-ES', { weekday: 'long' });
    if (diaFecha.toLowerCase() !== h.dia_semana.toLowerCase()) {
      fechaInput.setCustomValidity(`La fecha debe ser un ${h.dia_semana}.`);
    } else {
      fechaInput.setCustomValidity('');
    }
    fechaInput.reportValidity();
  });

  // 7) Envío del formulario
  form.addEventListener('submit', e => {
    e.preventDefault();
    // Validar días antes de enviar
    if (!fechaInput.checkValidity()) return;

    if (!horarioSelect.value) {
      return alert('Selecciona un horario válido.');
    }

    const h = JSON.parse(horarioSelect.value);

    const citaData = {
      paciente_id: usuario.id,       // <-- ID dinámico
      medico_id:   Number(medicoSelect.value),
      fecha:       fechaInput.value,
      hora:        h.hora_inicio,
      motivo:      motivoInput.value.trim()
    };
    console.log('Datos a enviar:', citaData);

    fetch('http://localhost:3000/citas', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(citaData)
    })
      .then(r => r.json())
      .then(res => {
        if (res.message) {
          alert(res.message);
          form.reset();
        } else {
          alert('Error al agendar cita.');
        }
      })
      .catch(err => {
        console.error('Error al agendar cita:', err);
        alert('Error al agendar cita. Ver consola.');
      });
  });
});