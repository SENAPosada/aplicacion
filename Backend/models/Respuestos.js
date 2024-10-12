const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const repuestosSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: true,
        uniqued: true
    },
    precio: {
        type: Number,
        required: true,
    },
    imagen: {
        type: String,
        required: false,
    },
    descripcion: {
        type: String,
        required: false, // Este campo no es obligatorio
    },
});

module.exports = mongoose.model("Repuestos", repuestosSchema);
