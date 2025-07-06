const conexion = require('../config/db');

const Usuario = {
  crearUsuario: (usuario, callback) => {
    const query = `
      INSERT INTO usuarios 
      (nombre, apellido, email, password, dni, fecha_nacimiento, rol, estado) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      usuario.nombre,
      usuario.apellido,  // Nuevo campo
      usuario.email,
      usuario.password,  // Se espera que ya esté encriptada
      usuario.dni,
      usuario.fecha_nacimiento,
      usuario.rol || 'Paciente',
      usuario.estado || 'Activo'
    ];

    conexion.query(query, values, callback);
  },

  obtenerPorEmail: (email, callback) => {
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    conexion.query(query, [email], callback);
  },

  actualizarUsuario: (usuarioData, callback) => {
  const query = `
    UPDATE usuarios
    SET nombre = ?, apellido = ?, email = ?
    WHERE id = ?
  `;
  const values = [
    usuarioData.nombre,
    usuarioData.apellido || '', // Si no envías apellido, puedes poner valor vacío
    usuarioData.email,
    usuarioData.id
  ];
  conexion.query(query, values, callback);
},

obtenerPorId: (id, callback) => {
    const query = 'SELECT * FROM usuarios WHERE id = ?';
    conexion.query(query, [id], callback);
  },

  actualizarPassword: (id, hash, callback) => {
    const query = 'UPDATE usuarios SET password = ? WHERE id = ?';
    conexion.query(query, [hash, id], callback);
  }

};

module.exports = Usuario;