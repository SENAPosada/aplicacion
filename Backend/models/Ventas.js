const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ventasSchema = new Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId, // Referencia al modelo 'Clientes'
        ref: 'Clientes',
        required: true
    },
    tecnico: {
        type: mongoose.Schema.Types.ObjectId, // Referencia al modelo 'Tecnicos'
        ref: 'Tecnicos',
        required: true
    },
    repuestos: [{
        repuesto: { type: mongoose.Schema.Types.ObjectId, ref: 'Repuestos' }, // ID del repuesto
        nombre: { type: String, required: true },
        precio: { type: Number, required: true },
        cantidad: { type: Number, required: true },
    }],
    servicio: {
        type: mongoose.Schema.Types.ObjectId, // Referencia al modelo 'Servicios'
        ref: 'Servicios',
        required: true
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId, // Referencia al modelo 'Categorias'
        ref: 'Categorias',
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    horario: {
        type: mongoose.Schema.Types.ObjectId, // Referencia al modelo 'Horarios'
        ref: 'Horarios',
        required: true
    },
    horaInicio: { type: String, required: true },
    horaFin: { type: String, required: true },
    estado: {
        type: String,
        enum: [
            "Cargado",
            "Activado",
            "No activado",
            "Asignado",
            "Procesando",
            "Finalizado",
            "Entregado",
            "Anulado"
        ],

    },
    direccion: {
        type: String,
        required: true
    },
    anotaciones: { // Nuevo campo
        type: String,
        default: ""
    },
    total: { // Nuevo campo
        type: Number,
    }
}, {
    timestamps: true // Agrega las marcas de tiempo createdAt y updatedAt
});

module.exports = mongoose.model('Ventas', ventasSchema);
