const conexion = require('../config/db');

const Cita = {
  crearCita: (citaData, callback) => {
    const query = `
      INSERT INTO citas
        (paciente_id, medico_id, fecha, hora, motivo, estado)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      citaData.paciente_id,
      citaData.medico_id,
      citaData.fecha,
      citaData.hora,
      citaData.motivo,
      citaData.estado || 'Programada'
    ];

    conexion.query(query, values, (err, resultado) => {
      if (err) {
        console.error('SQL Error en crearCita:', err);
      }
      callback(err, resultado);
    });
  },

  obtenerPorPaciente: (paciente_id, callback) => {
    const query = `
      SELECT c.*,  
        u.nombre AS medico_nombre, u.apellido AS medico_apellido,
        c.paciente_id
      FROM citas c
      JOIN medicos m ON c.medico_id = m.id
      JOIN usuarios u ON m.usuario_id = u.id
      WHERE c.paciente_id = ?;
    `;
    conexion.query(query, [paciente_id], callback);
  },

  // Método actualizado para obtener citas del médico
  obtenerPorMedico: (usuario_id, callback) => {
    const query = `
      SELECT c.*, u.nombre AS paciente_nombre, u.apellido AS paciente_apellido
      FROM citas c
      JOIN medicos m ON c.medico_id = m.id
      LEFT JOIN usuarios u ON c.paciente_id = u.id
      WHERE m.usuario_id = ?
    `;
    conexion.query(query, [usuario_id], callback);
  },

  cancelarCita: (citaId, motivo, observacion, callback) => {
    const sql = `
      INSERT INTO citaCancelada 
        (cita_id, motivo_cancelacion, observacion)
      VALUES (?, ?, ?)
    `;
    conexion.query(sql, [citaId, motivo, observacion], callback);
  },

  actualizarEstado: (citaId, nuevoEstado, callback) => {
    const sql = `UPDATE citas SET estado = ? WHERE id = ?`;
    conexion.query(sql, [nuevoEstado, citaId], callback);
  }
};

module.exports = Cita;