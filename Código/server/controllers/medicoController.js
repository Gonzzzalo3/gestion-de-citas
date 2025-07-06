const Medico = require('../models/Medico');

const medicoController = {
  obtenerPorEspecialidad: (req, res) => {
    const { especialidad_id } = req.query;
    if (!especialidad_id) {
      return res.status(400).json({ error: 'El parámetro especialidad_id es requerido' });
    }
    Medico.obtenerPorEspecialidad(especialidad_id, (error, resultados) => {
      if (error) {
        return res.status(500).json({ error: 'Error al obtener médicos' });
      }
      res.status(200).json({ medicos: resultados });
    });
  }
};

module.exports = medicoController;