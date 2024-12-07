const Citas = require("../models/Citas");

exports.nuevaCita = async (req, res, next) => {
    const cita = new Citas(req.body);
    try {
        await cita.save();
        res.json({ mensaje: "Se agregó una nueva cita" });
    } catch (error) {
        console.log(error);
        next();
    }
};

// cuando no se utiliza populate se nenesita usar find para obetener los datos completos
exports.mostrarCitas = async (req, res, next) => {
    try {
        // Usamos populate para los campos que contienen ObjectId
        const citas = await Citas.find({})
            .populate('cliente', 'nombre apellido cedula email direccion') // Poblamos el cliente
            .populate('tecnico', 'nombre apellido cedula email direccion') // Poblamos el cliente
            .populate('servicio') // Poblamos el servicio
            .populate('categoria') // Poblamos la categoria
            .populate('repuestos') // Poblamos los repuestos (en caso de que también tengas un ObjectId en repuesto)
            .exec(); // Ejecutamos la consulta

        res.json(citas); // Regresamos las citas con los datos poblados
    } catch (error) {
        console.log(error);
        next();
    }
};



exports.mostrarCita = async (req, res, next) => {
    try {
        const cita = await Citas.findById(req.params.idCita)
        .populate('cliente') // Poblamos el cliente
        .populate('tecnico') // Poblamos el cliente
        .populate('servicio') // Poblamos el servicio
        .populate('categoria') // Poblamos la categoria
        .populate('repuestos.repuesto') // Poblamos los repuestos (en caso de que también tengas un ObjectId en repuesto)
        .exec(); // Ejecutamos la consulta
        if (!cita) {
            res.json({ mensaje: "Esa cita no existe" });
            return next();
        }
        res.json(cita);
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.actualizarCita = async (req, res, next) => {
    try {
        const cita = await Citas.findByIdAndUpdate(
            { _id: req.params.idCita },
            req.body,
            { new: true }
        )
            .populate("cliente")
            .populate("tecnico")
            .populate("servicio", "nombre")
            .populate("categoria", "nombre");
        res.json(cita);
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.eliminarCita = async (req, res, next) => {
    try {
        await Citas.findByIdAndDelete({ _id: req.params.idCita });
        res.json({ mensaje: "La cita ha sido eliminada" });
    } catch (error) {
        console.log(error);
        next();
    }
};
