const Servicios = require("../models/Servicios");

// Crear un nuevo servicio
exports.nuevoServicio = async (req, res, next) => {
    const servicio = new Servicios(req.body);
    try {
        await servicio.save();
        res.json({ mensaje: "Se agregó un nuevo servicio" });
    } catch (error) {
        if (error.code === 11000) {
            // Código de error de MongoDB para duplicados
            res.status(400).json({
                mensaje: "El servicio ya está registrado"
            });
        } else {
            res.status(500).json({
                mensaje: "Hubo un error al agregar el servicio"
            });
        }
        next();
    }
};

// Muestra todos los servicios
exports.mostrarServicios = async (req, res, next) => {
    try {
        const servicios = await Servicios.find({});
        res.json(servicios);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Muestra un servicio por su Id
exports.mostrarServicio = async (req, res, next) => {
    const servicio = await Servicios.findById(req.params.idServicio);
    // si no existe el servicio
    if (!servicio) {
        res.json({ mensaje: "El servicio no existe" });
        next();
    }
    // si todo está bien muestra el servicio
    res.json(servicio);
};

// Actualiza un servicio por su ID
exports.actualizarServicio = async (req, res, next) => {
    try {
        const servicio = await Servicios.findByIdAndUpdate(
            { _id: req.params.idServicio },
            req.body,
            {
                new: true,
            }
        );
        res.send(servicio);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Eliminar un servicio por su ID
exports.eliminarServicio = async (req, res, next) => {
    try {
        await Servicios.findByIdAndDelete({ _id: req.params.idServicio });
        res.json({ mensaje: 'El servicio se ha eliminado' });
    } catch (error) {
        console.log(error);
        next();
    }
};
