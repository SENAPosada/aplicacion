const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const repuestosSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: true,
        unique: true 
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
        required: false, 
    },
    cantidad: {
        type: Number, 
        required: true, 
        default: 0, 
    },
});

module.exports = mongoose.model("Repuestos", repuestosSchema);
