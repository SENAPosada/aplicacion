const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriasSchema = new Schema({
    tipo: {
        type: String,
        trim: true,
        required: true, 
        unique: true
    },
    servicio:{
        type: Schema.Types.ObjectId,
        ref: 'Servicios',
        required: true
    }
});

module.exports = mongoose.model('Categorias', categoriasSchema);
