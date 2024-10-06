const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pedidosSchema = new Schema({
    cliente: {
        type: Schema.ObjectId,
        ref: 'Clientes',
        required: true
    },
    categoria: {
        type: Schema.ObjectId,
        ref: 'Categorias',
        required: true
    },
    tecnico: {
        type: Schema.ObjectId,
        ref: 'Tecnicos',
        required: true
    },
    cita: {
        type: Schema.ObjectId,
        ref: 'Citas',
        required: true
    },
    pedido: [{
        producto: {
            type: Schema.ObjectId,
            ref: 'Productos',
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        }
    }],
    total: {
        type: Number
       // required: false,  // El total puede ser calculado en el frontend y luego enviado.
        //default: 0
    }
});

module.exports = mongoose.model('Pedidos', pedidosSchema);
