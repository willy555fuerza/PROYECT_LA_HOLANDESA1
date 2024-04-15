/*****************conection 1*********************/

//consultas para obtener datos de base de la db
const {connectToPostgres,disconnectFromPostgres} = require('../config/index');
const bcrypt = require('bcryptjs');
const pg = require('pg');

class Usersmodel {
    // Método para obtener todos los usuarios
    static async getAll() {
      try {
          const pool = await connectToPostgres();
          if (!pool) {
              throw new Error('Error al conectar con PostgreSQL');
          }
          const result = await pool.query('SELECT * FROM usuario');
          await disconnectFromPostgres(pool);
          /* console.log(result.rows) */
          if (result.rows.length === 0) {
              return { data: null, error: true, message: 'No hay usuarios registrados' };
          }
          return { data: result.rows, error: false};
      } catch (error) {
          return { data: null, error: true, message: error.message };
      }
    }
    
    // Método para agregar un nuevo usuario
    static async createUser(nombres, apellidos, perfil, usuario, contrasena) {
        let pool;
        try {
          // Conectar a la base de datos PostgreSQL
          pool = await connectToPostgres();
          if (!pool) {
            throw new Error('Error al conectar con PostgreSQL');
          }
      
          // Obtener la fecha actual para la fecha de registro
          const currentDate = new Date();
          const fecha_registro = currentDate.toISOString();
      
          // Encriptar la contraseña
          const hashedPassword = await bcrypt.hash(contrasena, 10);
      
          // Consulta para insertar un nuevo usuario en la base de datos
          const query = `
            INSERT INTO usuario (nombres, apellidos, perfil, usuario, contraseña, fecha_registro)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
          `;
      
          // Ejecutar la consulta con parámetros
          const result = await pool.query(query, [
            nombres,
            apellidos,
            perfil,
            usuario,
            hashedPassword,
            fecha_registro
          ]);
      
          console.log('Usuario creado correctamente');
          return true;
        } catch (error) {
          console.error('Error al crear el usuario:', error);
          return false;
        } finally {
          // Desconectar de la base de datos
          if (pool) {
            await disconnectFromPostgres(pool);
          }
        }
      }

    // Metodo para actualizar el usuario
    static async updateUser(id_usuario, nombres, apellidos, perfil, usuario) {
        let pool;
        try {
          // Conectar a la base de datos PostgreSQL
          pool = await connectToPostgres();
          if (!pool) {
            throw new Error('Error al conectar con PostgreSQL');
          }
      
          // Consulta para actualizar un usuario en la base de datos
          const query = `
            UPDATE usuario
            SET nombres = $1, apellidos = $2, perfil = $3, usuario = $4
            WHERE id_usuario = $5
          `;
      
          // Ejecutar la consulta con parámetros
          await pool.query(query, [nombres, apellidos, perfil, usuario, id_usuario]);
      
          console.log('Usuario actualizado correctamente');
          return true;
        } catch (error) {
          console.error('Error al actualizar el usuario:', error);
          return false;
        } finally {
          // Desconectar de la base de datos
          if (pool) {
            await disconnectFromPostgres(pool);
          }
        }
    }
    // Método para cambiar el estado de un usuario
    static async changeState(userId, state) {
      try {
          const pool = await connectToPostgres();
          if (!pool) {
              throw new Error('Error al conectar con PostgreSQL');
          }
          /* const request = pool.request(); */
          // Actualizar el estado del usuario en la base de datos
          await pool.query(`UPDATE usuario SET estado = ${state} WHERE id_usuario = ${userId}`);
          await disconnectFromPostgres(pool);
          return true;
      } catch (error) {
          return false;
      }
  } 
}   


module.exports = Usersmodel