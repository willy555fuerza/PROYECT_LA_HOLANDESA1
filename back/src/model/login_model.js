/*****************conection 1*********************/

const {connectToPostgres,disconnectFromPostgres} = require('../config/index')
const bcrypt = require('bcryptjs');

class buscarusers{
    static async getuser(username, password) {
        let pool;
        let response = { data: undefined, errors: false };
        let user;
      
        try {
          console.log(username);
          // Conectarse a la base de datos
          pool = await connectToPostgres();
          if (!pool) {
            throw new Error('Error al conectar con MSSQL');
          }
      
          // Consultar la base de datos para obtener el usuario
          const result = await pool.query(`SELECT * FROM usuario WHERE usuario = '${username}' COLLATE "C"`);
      
          // Verificar si la consulta devolvió al menos un registro
          if (result.rowCount > 0) {
            // Extraer el primer registro (el primer objeto) devuelto por la consulta SQL
            user = result.rows[0];
      
            // Verificar si el usuario existe y la contraseña es correcta
            if (!user || !bcrypt.compareSync(password, user.contraseña) || !user.estado) {
              response = { data: null};
            } else {
              // Enviar user y contraseña como respuesta
              response = { data: user, error: false };
            }
          } else {
            response = { data: user, error: false };
          }
        } catch (error) {
          // Manejar errores
          response = { data: null, error: error.message };
        } finally {
          // Desconectar de la base de datos
          if (pool) {
            await disconnectFromPostgres(pool);
          }
          return response;
        }
      }
}

module.exports = buscarusers