const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriasSchema = new Schema({
    tipo: {
        type: String,
        trim: true,
        required: true, // Agregar esta línea para asegurar que el campo sea obligatorio
        unique: true // Asegurarse de que este campo sea único
    },
});

module.exports = mongoose.model('Categorias', categoriasSchema);
