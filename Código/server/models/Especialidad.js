const conexion = require('../config/db');

const Especialidad = {
  obtenerTodas: (callback) => {
    const query = 'SELECT * FROM especialidades';
    conexion.query(query, callback);
  }
};

module.exports = Especialidad;