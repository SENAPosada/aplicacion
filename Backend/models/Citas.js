const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citasSchema = new Schema({
    // cuando pongo objectId es porque me debe traer el cliente
    cliente: {
        type: mongoose.Schema.Types.ObjectId, // Referencia al modelo 'Clientes'
        ref: 'Clientes',
        required: true
    },
    tecnico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tecnicos',
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
    repuestos: [{
        repuesto: { type: mongoose.Schema.Types.ObjectId, ref: 'Repuestos' }, // ID del repuesto
        nombre: { type: String, required: true } ,        precio: Number,
        cantidad: Number,
       
    }],
    servicio: {
        type: Schema.Types.ObjectId, // Cambiar a ObjectId
        ref: 'Servicios', // Referenciar la colección 'Servicios'
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId, // Cambiar a ObjectId
        ref: 'Categorias', // Referenciar la colección 'Categorias'
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    horario: {
        type: mongoose.Schema.Types.ObjectId, // Referencia al modelo Horarios
        ref: 'Horarios',
        required: true
    },
    
    horaInicio: { type: String },  // Asegúrate de que estos campos existan
    horaFin: { type: String },
    estado: {
        type: String,
        enum: [
            "Cargado",
            "Activado",
            "No activado",
            "Asignado",
            "Procesando",
            "Finalizado"
        ],
        default: "Cargado"
    },
});

module.exports = mongoose.model('Citas', citasSchema);

// si pones los ObjectId se daña la parte de horario cuando creas
// una nueva cita, la proxima no descarta el horario de la cita existente
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const citasSchema = new Schema({
//     cliente: {
//         type: Schema.Types.ObjectId,
//         ref: 'Clientes', 
//         required: true
//     },
//     direccion: {
//         type: String,
//         trim: true,
//         required: true
//     },
//     ciudad: {
//         type: String,
//         trim: true,
//         required: true
//     },
//     tecnico: {
//         type: Schema.Types.ObjectId, 
//         ref: 'Tecnicos',
//         required: true
//     },
//     repuestos: [{
//         repuesto: { 
//         type: Schema.Types.ObjectId, 
//         ref: 'Repuestos' },
//         nombre: { type: String, required: true } ,
//         precio: Number,
//         cantidad: Number,
       
//     }],
//     servicio: {
//         type: Schema.Types.ObjectId, 
//         ref: 'Servicios', // Referenciar la colección 'Servicios'
//         required: true
//     },
//     categoria: {
//         type: Schema.Types.ObjectId, 
//         ref: 'Categorias', // Referenciar la colección 'Categorias'
//         required: true
//     },
//     fecha: {
//         type: Date,
//         required: true
//     },
//     horario: {
//         type: String,
//         required: true
//     },
//     horaInicio: { type: String }, 
//     horaFin: { type: String },
//     estado: {
//         type: String,
//         enum: [
//             "Cargado",
//             "Activado",
//             "No activado",
//             "Asignado",
//             "Procesando",
//             "Finalizado"
//         ],
//         default: "Cargado"
//     },
// });

// module.exports = mongoose.model('Citas', citasSchema);