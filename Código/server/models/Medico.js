const conexion = require('../config/db');

const Medico = {
  obtenerPorEspecialidad: (especialidad_id, callback) => {
    const query = `
      SELECT m.*, u.nombre, u.apellido, u.email 
      FROM medicos m 
      JOIN usuarios u ON m.usuario_id = u.id 
      WHERE m.especialidad_id = ?
    `;
    conexion.query(query, [especialidad_id], callback);
  }
};

module.exports = Medico;