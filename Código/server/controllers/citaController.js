// server/controllers/citaController.js
const Cita = require('../models/Cita');

const citaController = {
  agendarCita: (req, res) => {
    const citaData = req.body;
    Cita.crearCita(citaData, (error, resultado) => {
      if (error) {
        console.error('Error al agendar la cita:', error);
        return res.status(500).json({ error: 'Error al agendar la cita' });
      }
      res.status(201).json({ message: 'Cita agendada exitosamente', cita_id: resultado.insertId });
    });
  },

  obtenerCitasPorPaciente: (req, res) => {
    const paciente_id = req.query.paciente_id;
    if (!paciente_id) {
      return res.status(400).json({ error: 'Se requiere paciente_id' });
    }
    Cita.obtenerPorPaciente(paciente_id, (err, resultados) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error en BD' });
      }
      res.status(200).json({ citas: resultados });
    });
  },

  obtenerCitasPorMedico: (req, res) => {
    const { medico_id } = req.query;  // ahora se espera "medico_id"
    if (!medico_id) {
      return res.status(400).json({ error: 'El parámetro medico_id es requerido' });
    }
    Cita.obtenerPorMedico(medico_id, (error, resultados) => {
      if (error) {
        console.error('Error al obtener las citas del médico:', error);
        return res.status(500).json({ error: 'Error al obtener las citas del médico' });
      }
      res.status(200).json({ citas: resultados });
    });
  },

  cancelarCita: (req, res) => {
    const { cita_id, motivo_cancelacion, observacion } = req.body;
    if (!cita_id || !motivo_cancelacion) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // 1) Insertar en citaCancelada
    Cita.cancelarCita(cita_id, motivo_cancelacion, observacion, (err, result) => {
      if (err) {
        console.error('Error al insertar cancelación:', err);
        return res.status(500).json({ error: 'No se pudo registrar la cancelación' });
      }

      // 2) Marcar la cita como Cancelada
      Cita.actualizarEstado(cita_id, 'Cancelada', (err2) => {
        if (err2) {
          console.error('Error al actualizar estado de la cita:', err2);
        }
        res.json({ message: 'Cita cancelada correctamente' });
      });
    });
  }
};

module.exports = citaController;