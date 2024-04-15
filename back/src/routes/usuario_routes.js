/*****************conection 3*********************/

const express = require('express')
const router = express.Router()
const Users = require('../controller/usuario_controller')


// Ruta para obtener todos los usuarios
router.get('/Users',Users.getAll)
// Ruta para cambiar el estado de un usuario
router.put('/Users/:userId/state', Users.changeState);
// Ruta para crear un nuevo usuario
router.post('/create_users', Users.createUser);
// Ruta para actualizar un usuario existente
router.put('/Users/:id_usuario', Users.updateUser); 

module.exports = router