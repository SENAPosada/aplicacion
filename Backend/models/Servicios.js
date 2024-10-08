const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviciosSchema = new Schema({
    tipo: {
        type: String,
        trim: true,
        required: true, // Asegurar que el campo sea obligatorio
        unique: true // Asegurar que este campo sea único
    },
});

module.exports = mongoose.model('Servicios', serviciosSchema);
