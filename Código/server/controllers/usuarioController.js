const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

const usuarioController = {
  registrarUsuario: (usuarioData, callback) => {
    const saltRounds = 10;
    bcrypt.hash(usuarioData.password, saltRounds, (err, hash) => {
      if (err) {
        console.error('Error al generar el hash:', err);
        return callback(err);
      }

      usuarioData.password = hash;

      Usuario.crearUsuario(usuarioData, (error, resultados) => {
        if (error) {
          console.error('Error al registrar el usuario en la BD:', error);
          return callback(error);
        }
        console.log('Usuario registrado correctamente:', resultados);
        callback(null, resultados);
      });
    });
  },

  login: (email, password, callback) => {
    Usuario.obtenerPorEmail(email, (err, resultados) => {
      if (err) {
        console.error('Error al iniciar el login:', err);
        return callback(err);
      }
      if (resultados.length === 0) {
        console.log('Usuario no encontrado.');
        return callback(null, null);
      }
      const usuario = resultados[0];
      bcrypt.compare(password, usuario.password, (err, coincide) => {
        if (err) {
          console.error('Error al comparar contraseñas:', err);
          return callback(err);
        }
        if (coincide) {
          console.log('Login exitoso. Bienvenido:', usuario.nombre, usuario.apellido);
          return callback(null, usuario);
        } else {
          console.log('Contraseña incorrecta.');
          return callback(null, null);
        }
      });
    });
  },

  // Nuevo método para actualizar usuario
  actualizarUsuario: (usuarioData, callback) => {
    Usuario.actualizarUsuario(usuarioData, callback);
  },

  cambiarPassword: (id, currentPassword, newPassword, callback) => {
    // Primero, obtenemos al usuario por id
    Usuario.obtenerPorId(id, (err, results) => {
      if (err) {
        return callback(err);
      }
      if (results.length === 0) {
        return callback(new Error('Usuario no encontrado'));
      }
      const usuario = results[0];
      // Comparamos la contraseña actual
      bcrypt.compare(currentPassword, usuario.password, (err, coincide) => {
        if (err) {
          return callback(err);
        }
        if (!coincide) {
          return callback(new Error('La contraseña actual es incorrecta'));
        }
        // Si coincide, encriptamos la nueva contraseña
        const saltRounds = 10;
        bcrypt.hash(newPassword, saltRounds, (err, hash) => {
          if (err) {
            return callback(err);
          }
          // Actualizamos la contraseña del usuario en la base de datos
          Usuario.actualizarPassword(id, hash, callback);
        });
      });
    });
  }

};

module.exports = usuarioController;