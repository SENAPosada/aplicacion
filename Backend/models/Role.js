const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: { // Propiedad para la descripción del rol
        type: String,
        trim: true,
        default: '' // Puedes dejarlo como un string vacío por defecto si no es obligatorio
    },
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission'
    }]
});

module.exports = mongoose.model('Role', RoleSchema);
