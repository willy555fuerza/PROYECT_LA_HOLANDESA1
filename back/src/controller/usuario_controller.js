/*****************conection 2*********************/

const Usersmodel = require('../model/usuario_model') // Importa el modelo ProductosModel

class Users{
    // Método para obtener todos los usuarios
    static async getAll(req, res) {
        try {
          /* const { data, error, message } = await Usersmodel.getAll(); */
          const data = await Usersmodel.getAll();

          if (!data) {
            return res.status(404).json({ error: message });
          }
          /* console.log(data) */
          res.status(200).json(data);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
    }
    // Método para agregar un nuevo usuario
    static async createUser(req, res) {
        try {
            const { nombres, apellidos, perfil, usuario, contraseña} = req.body;
    
            // Llamar al método para crear el usuario en el modelo
            const result = await Usersmodel.createUser(nombres, apellidos, perfil, usuario, contraseña);
    
            // Verificar si el usuario se creó correctamente en el modelo
            if (result) {
                // Usuario creado correctamente
                res.status(200).json({ message: 'Usuario creado correctamente' });
            } else {
                // Error al crear el usuario en el modelo
                res.status(500).json({ error: 'Error al crear el usuario' });
            }
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            res.status(500).json({ error: 'Error al crear el usuario' });
        }
    }

    // Metodo para actualizar el usuario
    static async updateUser(req, res) {
        try {
            const { id_usuario } = req.params;
            const { nombres, apellidos, perfil, usuario } = req.body;
    
            // Llamar al método para actualizar el usuario en el modelo
            const result = await Usersmodel.updateUser(id_usuario, nombres, apellidos, perfil, usuario);
    
            // Verificar si el usuario se actualizó correctamente en el modelo
            if (result) {
                // Usuario actualizado correctamente
                res.status(200).json({ message: 'Usuario actualizado correctamente' });
            } else {
                // Error al actualizar el usuario en el modelo
                res.status(500).json({ error: 'Error al actualizar el usuario' });
            }
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            res.status(500).json({ error: 'Error al actualizar el usuario' });
        }
    }
    // Método para cambiar el estado de un usuario
    static async changeState(req, res) {
        try {
            const userId = req.params.userId;
            const { state } = req.body;
            // Llamar al método para cambiar el estado del usuario en el modelo
            const result = await Usersmodel.changeState(userId, state);
            res.status(200).json({ message: 'Estado del usuario cambiado correctamente' });
        } catch (error) {
            console.error('Error al cambiar el estado del usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}

module.exports = Users