const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriasSchema = new Schema({
    tipo: {
        type: String,
        trim: true,
        required: true, 
        unique: true 
    },
});

module.exports = mongoose.model('Categorias', categoriasSchema);
