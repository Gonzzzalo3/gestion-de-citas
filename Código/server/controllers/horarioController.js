const Horario = require('../models/Horario');

const horarioController = {
  obtenerPorMedico: (req, res) => {
    const { medico_id } = req.query;
    if (!medico_id) {
      return res.status(400).json({ error: 'El parámetro medico_id es requerido' });
    }
    Horario.obtenerPorMedico(medico_id, (error, resultados) => {
      if (error) {
        return res.status(500).json({ error: 'Error al obtener los horarios' });
      }
      res.status(200).json({ horarios: resultados });
    });
  }
};

module.exports = horarioController;