/*****************conection 3*********************/

const express = require('express')
const router = express.Router()
const Token = require('../token/token')
const jwt = require('jsonwebtoken');

// Rutas relacionadas con la autenticación de usuarios
router.post('/login', Token.token);

// Ruta para cerrar sesión
router.post('/logout', (req, res) => {
    try {
       
        // Verificar si se ha enviado un token en la solicitud
        /* const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ error: 'No se proporcionó un token de autenticación' });
        }
        console.log("ola") */ 
 

        // Verificar y decodificar el token
        /* const decodedToken = jwt.verify(token, 'secretkey');
        if (!decodedToken) {
            return res.status(401).json({ error: 'Token de autenticación inválido' });
        } */   


        // Aquí puedes realizar cualquier acción necesaria para cerrar la sesión del usuario,
        // como invalidar el token almacenado en el cliente o limpiar los datos de sesión en el servidor.

        // Enviar una respuesta indicando que la sesión se ha cerrado exitosamente
        res.status(200).json({ message: 'Sesión cerrada exitosamente' });
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        res.status(500).json({ error: 'Error al cerrar sesión' });
    }
});

module.exports = router


