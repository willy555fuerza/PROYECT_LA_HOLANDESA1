/*****************conection 4 servidor*********************/

const express = require ('express')
const server = express()
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv')
dotenv.config()
const bodyParser = require('body-parser');
/*login-logout*/
const router_login_logout = require('./src/routes/login_routes')
/*login-logout...*/
const routerusuario = require('./src/routes/usuario_routes')
const routercategoria = require('./src/routes/categoria_routes')
const routermedida = require('./src/routes/medida_routes')
const routerproveedor = require('./src/routes/proveedor_router')    



const PORT = process.env.PORT || 3000 

server.use((req,res , next)=>{
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, PATCH, DELETE")
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials",true)
    next()
})

server.get ('/', (req, res) => {
    res.send('Api Proyect')
})

server.use(cookieParser());
server.use(bodyParser.json());
server.use('/La_holandesa', router_login_logout )
server.use('/La_holandesa', routerusuario )
server.use('/La_holandesa', routercategoria )
server.use('/La_holandesa', routermedida )
server.use('/La_holandesa', routerproveedor )


server.listen(PORT,() =>{
    console.log(`servidor corriendo en http://localhost:${PORT}`);
})
