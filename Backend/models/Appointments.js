const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentsSchema = new Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clientes",
    required: true,
  },
  tecnico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tecnicos",
    required: true,
  },
  direccion: {
    type: String,
    trim: true,
    required: true,
  },
  ciudad: {
    type: String,
    trim: true,
    required: true,
  },
  repuestos: [
    {
      repuesto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Repuestos",
      },
      nombre: { type: String, required: true } ,    
      cantidad: { type: Number, required: true },
      precio: { type: Number},
    },
  ],
  servicio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Servicios",
    required: true,
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categorias",
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  turno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Turno",
    required: true,
  },
  estado: {
    type: String,
    enum: [
      "Cargado",
      "Activado",
      "No activado",
      "Asignado",
      "Procesando",
      "Finalizado",
    ],
    default: "Cargado",
  },
});

module.exports = mongoose.model("Appointments", appointmentsSchema);
