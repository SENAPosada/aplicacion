const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const horariosSchema = new Schema({
    horaInicio: {
        type: String,
        required: true,
        trim: true,
    },
    horaFin: {
        type: String,
        required: true,
        trim: true,
    },
});

// Añadir índice único para evitar duplicados
horariosSchema.index({ horaInicio: 1, horaFin: 1 }, { unique: true });

module.exports = mongoose.model("Horarios", horariosSchema);
