const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const repuestoSchema = new Schema({
    repuesto: {
        type: Schema.Types.ObjectId, // Suponiendo que este es un ObjectId
        required: true,
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    cantidad: {
        type: Number,
        required: true,
        min: 1 // Asegura que la cantidad sea al menos 1
    },
    precio: {
        type: Number
    }
}, { _id: false }); // Usar _id: false si no deseas un _id para cada subdocumento

const servicioSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    tipo: {
        type: String,
        required: true,
        trim: true
    }
}, { _id: false }); // Usar _id: false si no deseas un _id para cada subdocumento

const categoriaSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    tipo: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number
    }
}, { _id: false }); // Usar _id: false si no deseas un _id para cada subdocumento

const ventasSchema = new Schema({
    cliente: {
        type: String,
        required: true,
        trim: true
    },
    direccion: {
        type: String,
        required: true,
        trim: true
    },
    ciudad: {
        type: String,
        required: true,
        trim: true
    },
    tecnico: {
        type: String,
        required: true,
        trim: true
    },
    repuestos: [repuestoSchema], // Array de repuestos
    servicio: servicioSchema, // Referencia al servicio
    categoria: categoriaSchema, // Referencia a la categoría
    fecha: {
        type: Date,
        required: true
    },
    horario: {
        type: String,
        required: true
    },
    horaInicio: {
        type: String,
        required: true
    },
    horaFin: {
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
        ], // Agregar todos los estados posibles
        default: 'Cargado'
    }
}, { timestamps: true }); // Habilitar timestamps si lo necesitas

module.exports = mongoose.model("Ventas", ventasSchema);