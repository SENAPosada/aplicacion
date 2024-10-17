const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citasSchema = new Schema({
    cliente: {
        type: String,
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
    repuestos: [{
        repuesto: { type: mongoose.Schema.Types.ObjectId, ref: 'Repuestos' }, // ID del repuesto
        nombre: { type: String, required: true } ,
        cantidad: Number,
       
    }],
    servicio: {
        type: Schema.Types.ObjectId, // Cambiar a ObjectId
        ref: 'Servicios', // Referenciar la colección 'Servicios'
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId, // Cambiar a ObjectId
        ref: 'Categorias', // Referenciar la colección 'Categorias'
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
    horaInicio: { type: String },  // Asegúrate de que estos campos existan
    horaFin: { type: String },
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
