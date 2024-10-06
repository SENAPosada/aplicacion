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

