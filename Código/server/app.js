const express = require('express');
const cors = require('cors');
const usuarioController = require('./controllers/usuarioController');
const especialidadController = require('./controllers/especialidadController');
const medicoController = require('./controllers/medicoController');
const horarioController = require('./controllers/horarioController');
const citaController = require('./controllers/citaController');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Endpoints para registro y login
app.post('/register', (req, res) => {
  const usuarioData = req.body;
  usuarioController.registrarUsuario(usuarioData, (error, resultados) => {
    if (error) {
      return res.status(500).json({ error: 'Error al registrar usuario' });
    }
    res.status(201).json({ message: 'Usuario registrado', id: resultados.insertId });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  usuarioController.login(email, password, (error, usuario) => {
    if (error) {
      return res.status(500).json({ error: 'Error al iniciar sesión' });
    }
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    res.status(200).json({ message: 'Login exitoso', usuario });
  });
});

app.post('/usuario/cambiarPassword', (req, res) => {
  const { id, currentPassword, newPassword } = req.body;
  // Llama a la función en el controlador para cambiar la contraseña
  usuarioController.cambiarPassword(id, currentPassword, newPassword, (error, result) => {
    if (error) {
      console.error('Error al cambiar la contraseña:', error);
      return res.status(500).json({ success: false, message: error.message || 'Error al cambiar la contraseña' });
    }
    res.json({ success: true, message: 'Contraseña actualizada correctamente' });
  });
});


app.put('/usuario/actualizar', (req, res) => {
  const usuarioData = req.body; 

  usuarioController.actualizarUsuario(usuarioData, (error, resultados) => {
    if (error) {
      console.error('Error al actualizar el usuario:', error);
      return res.status(500).json({ success: false, message: 'Error al actualizar el usuario' });
    }
    res.json({ success: true, message: 'Usuario actualizado correctamente' });
  });
});


//endpoint para obtener especialidades
app.get('/especialidades', especialidadController.obtenerTodas);

//endpoint para obtener médicos por especialidad
app.get('/medicos', medicoController.obtenerPorEspecialidad);

//endpoint para obtener horarios por médico
app.get('/horarios', horarioController.obtenerPorMedico);

// Endpoints para citas
app.post('/citas', citaController.agendarCita);
app.get('/citas', citaController.obtenerCitasPorPaciente);

//ruta para obtener citas por médico:
app.get('/citas/medico', citaController.obtenerCitasPorMedico);
app.post('/citas/cancelar', citaController.cancelarCita);

app.listen(PORT, () => {
  console.log(`Server escuchando en http://localhost:${PORT}`);
});