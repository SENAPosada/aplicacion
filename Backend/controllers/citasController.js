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

exports.mostrarCitas = async (req, res, next) => {
    try {
        const citas = await Citas.find({})
            .populate("cliente") // Poblar información del cliente
            .populate("categoria") // Poblar información de la categoría
            .populate("tecnico"); // Poblar información del técnico
        res.json(citas);
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.mostrarCita = async (req, res, next) => {
    try {
        const cita = await Citas.findById(req.params.idCita)
            .populate("cliente")
            .populate("categoria")
            .populate("tecnico");
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
            .populate("categoria")
            .populate("tecnico");
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
