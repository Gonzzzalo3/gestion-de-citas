const Especialidad = require('../models/Especialidad');

const especialidadController = {
  obtenerTodas: (req, res) => {
    Especialidad.obtenerTodas((error, resultados) => {
      if (error) {
        return res.status(500).json({ error: 'Error al obtener especialidades' });
      }
      res.status(200).json({ especialidades: resultados });
    });
  }
};

module.exports = especialidadController;