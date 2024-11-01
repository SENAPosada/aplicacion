const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuarioSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    telefono: {
      type: String,
      required: false,
      trim: true
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['usuario', 'admin'], 
      default: 'usuario'
    },
    direccion: {
      type: String,
      required: false,
      trim: true
    },
    estado: {
      type: String,
      enum: ['activo', 'inactivo'],
      default: 'activo'
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    }
  }, {
    timestamps: true
  });
  

  module.exports = mongoose.model('Usuarios', usuarioSchema)
