/*****************conection 2*********************/

const jwt = require('jsonwebtoken') // Importa la biblioteca jsonwebtoken para generar tokens de autenticación
const buscarusers = require('../model/login_model') // Importa el modelo ProductosModel para obtener usuarios

class login_controller{
    // Método para autenticar usuarios
    static async login(username, password) {
        try {

            // Llamar a la función estática de ProductosModel y obtener la lista de usuarios
            const users = await buscarusers.getuser(username, password);

            //Verifica si el usuario es correcto
            const user = users.data;
            if (!user) {
                throw new Error(users.data || null);
            }

            // Si la verificacion es correcta, se crea un token de autorizacion, que expira en 1 hora
            const token = jwt.sign({ id: user.id, username: user.username }, 'secretkey', { expiresIn: '5m' });

            // Retorna el token
            return token;
        } catch (error) {
            // Devolver mensaje de error
            return { error: error.message }; 
        }  
    }
}
module.exports = login_controller