const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema({
    resource: {
        type: String,
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
    component: { // Componente al que pertenece el permiso
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    activo: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model("Permission", PermissionSchema);
