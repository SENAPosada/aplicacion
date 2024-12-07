const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientesSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: true 
    },
    apellido: {
        type: String,
        trim: true,
        required: true 
    },
    tipoDocumento: {
        type: String,
        enum: ['Cédula de Ciudadanía', 'Pasaporte', 'Tarjeta de Identidad', 'Cédula de Extranjería'],
        required: true 
    },
    cedula: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    empresa: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true 
    },
    telefono: {
        type: String,
        trim: true
    },
    direccion: { // Campo de dirección añadido
        type: String,
        trim: true,
        required: true // Puedes decidir si es obligatorio o no
    },
    activo: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Clientes', clientesSchema);
