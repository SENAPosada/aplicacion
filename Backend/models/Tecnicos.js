const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tecnicosSchema = new Schema({
    nombre: {
        type: String,
        trim: true
    },
    apellido: {
        type: String,
        trim: true,
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
        unique: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    telefono: {
        type: String,
        trim: true
    },
    activo: {
        type: Boolean,
        default: true 
    }
});

module.exports = mongoose.model('Tecnicos', tecnicosSchema)

