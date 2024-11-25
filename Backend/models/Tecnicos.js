const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tecnicosSchema = new Schema({
    nombres: {
        type: String,
        trim: true
    },
    apellidos: {
        type: String,
        trim: true,
    },
    tipoDocumento: {
        type: String,
        enum: ['Cédula de Ciudadanía', 'Pasaporte', 'Tarjeta de Identidad', 'Cédula de Extranjería'],
        required: true // Obligatorio
    },
    documento: {
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
        default: true // Establece el valor por defecto como activo
    }
});

module.exports = mongoose.model('Tecnicos', tecnicosSchema)

