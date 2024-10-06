const express = require("express");
const indexRoutes = require("./routes/indexRoutes");
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// 1 Cors permite que un cliente se conecte a otro servidor 
// para intercambio de recursos
const cors = require('cors')

// Conectar a MongoDB
mongoose.connect('mongodb://localhost/omniapp')
    .then(() => console.log('Conectado a MongoDB puerto 5000'))
    .catch(err => console.error('No se pudo conectar a MongoDB', err));

// Crear servidor
const app = express();

// para leer los valores que pasemos por POST en postman
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// 2 habilitar cors
app.use(cors())

// Rutas de la app
app.use('/', indexRoutes())

// Carpeta publica, habilita las imagenes estaticas
app.use(express.static('uploads'))

// Puerto
app.listen(5000);


