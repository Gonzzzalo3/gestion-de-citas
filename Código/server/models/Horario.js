const conexion = require('../config/db');

const Horario = {
  obtenerPorMedico: (medico_id, callback) => {
    const query = 'SELECT * FROM horarios WHERE medico_id = ?';
    conexion.query(query, [medico_id], callback);
  }
};

module.exports = Horario;