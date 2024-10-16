const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviciosSchema = new Schema({
    tipo: {
        type: String,
        trim: true,
        required: true, 
        unique: true
    },
});

module.exports = mongoose.model('Servicios', serviciosSchema);
