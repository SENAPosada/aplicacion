const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientesSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: true // Asegúrate de agregar validación si es necesario
    },
    apellido: {
        type: String,
        trim: true,
        required: true // Asegúrate de agregar validación si es necesario
    },
    tipoDocumento: {
        type: String,
        enum: ['Cédula de Ciudadanía', 'Pasaporte', 'Tarjeta de Identidad', 'Cédula de Extranjería'],
        required: true // Obligatorio
    },
    cedula: {
        type: String,
        trim: true,
        required: true // Obligatorio
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
        required: true // Asegúrate de agregar validación si es necesario
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

module.exports = mongoose.model('Clientes', clientesSchema);
