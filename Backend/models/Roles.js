const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rolSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true, // Elimina espacios en blanco al inicio y final
        unique: true, // Asegura que los nombres sean únicos
    },
    permisos: {
        type: [String], // Arreglo de permisos
        required: true,
    },
    activo: {
        type: Boolean,
        default: true, // El valor predeterminado es verdadero (activo)
    },
});

module.exports = mongoose.model('Rol', rolSchema);
