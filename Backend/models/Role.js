const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    permissions: [
        {
            resource: { type: String, required: true },
            action: { type: String, required: true },
        },
    ],
    activo: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model('Role', RoleSchema);
