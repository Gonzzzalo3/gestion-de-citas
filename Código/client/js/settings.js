document.addEventListener('DOMContentLoaded', () => {
  // Verificar que estamos en la página de configuración: comprobamos si existe el input "nombre"
  const nombreInput = document.getElementById('nombre');
  if (!nombreInput) {
    return;
  }

  // Recuperar usuario de localStorage
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  if (!usuario.id) {
    // Si no hay usuario en sesión, redirige al login
    window.location.href = 'login.html';
    return;
  }

  // Elementos del formulario de settings
  const emailInput = document.getElementById('email');
  const idiomaSelect = document.getElementById('idioma');
  const settingsForm = document.getElementById('settingsForm');

  const editNombreBtn = document.getElementById('editNombre');
  const editEmailBtn = document.getElementById('editEmail');

  // Elementos para el cambio de contraseña
  const passwordInput = document.getElementById('password');
  const changePasswordBtn = document.getElementById('changePasswordBtn');
  const passwordChangeSection = document.getElementById('passwordChangeSection');
  const currentPasswordInput = document.getElementById('currentPassword');
  const newPasswordInput = document.getElementById('newPassword');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const saveNewPasswordBtn = document.getElementById('saveNewPassword');
  const cancelPasswordChangeBtn = document.getElementById('cancelPasswordChange');

  // Precargar los datos del usuario
  nombreInput.value = usuario.nombre || '';
  emailInput.value = usuario.email || '';
  idiomaSelect.value = usuario.idioma || 'es';

  // Bloquear edición por defecto
  nombreInput.readOnly = true;
  emailInput.readOnly = true;

  // Función para habilitar/deshabilitar edición de Nombre
  editNombreBtn.addEventListener('click', () => {
    if (nombreInput.readOnly) {
      nombreInput.readOnly = false;
      nombreInput.focus();
      editNombreBtn.textContent = 'Cancelar';
    } else {
      nombreInput.value = usuario.nombre || '';
      nombreInput.readOnly = true;
      editNombreBtn.textContent = 'Editar';
    }
  });

  // Función para habilitar/deshabilitar edición de Email
  editEmailBtn.addEventListener('click', () => {
    if (emailInput.readOnly) {
      emailInput.readOnly = false;
      emailInput.focus();
      editEmailBtn.textContent = 'Cancelar';
    } else {
      emailInput.value = usuario.email || '';
      emailInput.readOnly = true;
      editEmailBtn.textContent = 'Editar';
    }
  });

  // La contraseña se muestra solo como marcador (deshabilitada)
  passwordInput.disabled = true;

  // Botón para cambiar contraseña: mostrar sección de cambio
  changePasswordBtn.addEventListener('click', () => {
    passwordChangeSection.classList.remove('hidden');
  });

  // Cancelar cambio de contraseña: limpiar entradas y ocultar sección
  cancelPasswordChangeBtn.addEventListener('click', () => {
    currentPasswordInput.value = '';
    newPasswordInput.value = '';
    confirmPasswordInput.value = '';
    passwordChangeSection.classList.add('hidden');
  });

  // Guardar nueva contraseña
  saveNewPasswordBtn.addEventListener('click', () => {
    const current = currentPasswordInput.value.trim();
    const newPass = newPasswordInput.value.trim();
    const confirmPass = confirmPasswordInput.value.trim();

    if (!current || !newPass || !confirmPass) {
      return alert('Complete todos los campos para cambiar la contraseña.');
    }
    if (newPass !== confirmPass) {
      return alert('La nueva contraseña y su confirmación no coinciden.');
    }

    // Enviar solicitud al backend para cambiar la contraseña
    fetch('http://localhost:3000/usuario/cambiarPassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: usuario.id,
        currentPassword: current,
        newPassword: newPass
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Contraseña actualizada correctamente.');
          currentPasswordInput.value = '';
          newPasswordInput.value = '';
          confirmPasswordInput.value = '';
          passwordChangeSection.classList.add('hidden');
        } else {
          alert(data.message || 'No se pudo actualizar la contraseña.');
        }
      })
      .catch(err => {
        console.error('Error al cambiar contraseña:', err);
        alert('Error al cambiar la contraseña.');
      });
  });

  // Al enviar el formulario principal de settings, se actualiza la información
  settingsForm.addEventListener('submit', e => {
    e.preventDefault();
    const updatedUser = {
      id: usuario.id,
      nombre: nombreInput.value.trim(),
      apellido: usuario.apellido || '',   
      email: emailInput.value.trim()
    };

      fetch('http://localhost:3000/usuario/actualizar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
      })

      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Datos actualizados exitosamente.');
          // Actualizar usuario en localStorage
          const newUser = { ...usuario, ...updatedUser };
          localStorage.setItem('usuario', JSON.stringify(newUser));
          // Volver a bloquear los campos editables
          nombreInput.readOnly = true;
          emailInput.readOnly = true;
          editNombreBtn.textContent = 'Editar';
          editEmailBtn.textContent = 'Editar';
        } else {
          alert(data.message || 'No se pudo actualizar la información.');
        }
      })
      .catch(err => {
        console.error('Error al actualizar información:', err);
        alert('Error al actualizar la información.');
      });
  });
});