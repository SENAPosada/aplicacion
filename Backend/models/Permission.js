const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PermissionSchema = new Schema({
    resource: {
        type: String,
        required: true,
        trim: true
    },
    action: {
        type: String,
        enum: ['Crear', 'Leer', 'Actualizar', 'Eliminar'], // CRUD
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Permission', PermissionSchema);
