const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citasSchema = new Schema({
    cliente: {
        type: Schema.ObjectId,
        ref: 'Clientes',
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
        type: Schema.ObjectId,
        ref: 'Tecnicos',
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
    }
});


module.exports = mongoose.model('Citas', citasSchema);
