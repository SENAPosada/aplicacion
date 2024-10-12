const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citasSchema = new Schema({
    cliente: {
        type: String, // Asegúrate de que este tipo coincida con el tipo de tu campo 'cedula' en Clientes
        required: true
    },
    direccion: {
        type: String,
        trim: true,
        required: true
    },
    ciudad: {
        type: String,
        trim: true,
        required: true
    },
    tecnico: {
        type: String,
        required: true 
    },
    repuesto: { 
        type: String,
        trim: true,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    horario: { 
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: [
            "Cargado",
            "Activado",
            "No activado",
            "Asignado",
            "Procesando",
            "Finalizado"
        ],
        default: "Cargado" 
    },
});

module.exports = mongoose.model('Citas', citasSchema);
