const Horario = require ("../models/Horarios.js")

// Crear un nuevo horario
// Crear un nuevo horario
// Crear un nuevo horario
// Crear un nuevo horario
exports.crearHorario = async (req, res) => {
    try {
        const { horaInicio, horaFin } = req.body;

        // Añadir registro de depuración
        console.log('Buscando horario:', { horaInicio: horaInicio.trim(), horaFin: horaFin.trim() });

        // Validar si el horario ya existe
        const existeHorario = await Horario.findOne({
            horaInicio: horaInicio.trim(),
            horaFin: horaFin.trim()
        });

        if (existeHorario) {
            return res.status(400).json({ error: 'El horario ya existe' });
        }

        const nuevoHorario = new Horario({ horaInicio: horaInicio.trim(), horaFin: horaFin.trim() });
        await nuevoHorario.save();
        res.status(201).json(nuevoHorario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los horarios
exports.obtenerHorarios = async (req, res) => {
    try {
        const horarios = await Horario.find();
        res.status(200).json(horarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

