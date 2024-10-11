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
        required: true // Aquí también puede ser String si guardas la cédula del técnico
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
        default: "Cargado" // Valor predeterminado
    },
});

module.exports = mongoose.model('Citas', citasSchema);
