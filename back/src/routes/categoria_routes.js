/*****************conection 3*********************/

const express = require('express')
const router = express.Router()
const Users = require('../controller/categoria_controller')


// Ruta para obtener todas las categorias
router.get('/categoria',Users.getAll)
// Ruta para cambiar el estado de una categoria
router.put('/categoria/:userId/state', Users.changeState);
// Ruta para crear una nueva categoria
router.post('/create_categoria', Users.createUser);
// Ruta para actualizar una categoria existente
router.put('/categoria/:id_categoria', Users.updateUser); 

module.exports = router 