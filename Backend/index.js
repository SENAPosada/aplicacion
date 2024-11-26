const express = require("express");
const indexRoutes = require("./routes/indexRoutes");
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// 1 Cors permite que un cliente se conecte a otro servidor 
// para intercambio de recursos
const cors = require('cors')
const morgan = require('morgan')

// Conectar a MongoDB:
// mongodb://mongo:fefKApObjLjZokShZdcjCMUdUzlGaTiN@junction.proxy.rlwy.net:24048
mongoose.connect('mongodb+srv://luisposada:12345@cluster0.1b07q.mongodb.net/omniappdb?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Conectado a MongoDB puerto 5000'))
    .catch(err => console.error('No se pudo conectar a MongoDB', err));
// Mongo Atlas: 
// mongodb+srv://luisposada:12345@cluster0.1b07q.mongodb.net/omniappdb?retryWrites=true&w=majority&appName=Cluster0
// Mongo local: 
// mongodb://localhost/omniapp
// Crear servidor
const app = express();

// para leer los valores que pasemos por POST en postman
// Para leer los valores que pasemos por POST en postman
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2 habilitar cors
app.use(cors())
app.use(morgan('dev'))


// Rutas de la app
app.use('/', indexRoutes())

// Carpeta publica, habilita las imagenes estaticas
app.use(express.static('uploads'))

// Puerto
app.listen(5000, () => {
    console.log('Server escuchando en el puerto 5000');
});


