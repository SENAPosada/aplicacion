const Tecnicos = require("../models/Tecnicos");


// Crear un nuevo técnico
exports.nuevoTecnico = async (req, res, next) => {
    const tecnico = new Tecnicos(req.body);
    //
    try {
        await tecnico.save();
        res.json({ mensaje: "Se agregó un nuevo técnico" });
    } catch (error) {
        res.send(error);
        next();
    }
};

// exports.nuevoTecnico = async (req, res, next) => {
//     console.log("Datos recibidos en POST:", req.body);

//     // Verifica si la solicitud contiene un arreglo de técnicos
//     const tecnicos = Array.isArray(req.body) ? req.body : [req.body];

//     try {
//         // Si es un arreglo, guarda todos los técnicos de una vez usando insertMany
//         await Tecnicos.insertMany(tecnicos);
//         res.json({ mensaje: "Se agregaron los técnicos correctamente" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ mensaje: "Hubo un error al agregar los técnicos", error });
//         next();
//     }
// };


// Muestra todos los técnicos
exports.mostrarTecnicos = async (req, res, next) => {
    try {
        const tecnicos = await Tecnicos.find({});
        res.json(tecnicos);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Muestra un técnico por su Id
exports.mostrarTecnico = async (req, res, next) => {
    const tecnico = await Tecnicos.findById(req.params.idTecnico);
    // si no existe el técnico
    if (!tecnico) {
        res.json({ mensaje: "El técnico no existe" });
        next();
    }
    // si todo está bien muestra el técnico
    res.json(tecnico);
};

// Actualiza un técnico por su ID
exports.actualizarTecnico = async (req, res, next) => {
    try {
        const tecnico = await Tecnicos.findByIdAndUpdate(
            { _id: req.params.idTecnico },
            req.body,
            {
                new: true,
            }
        );
        res.status(200).send(tecnico);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Eliminar un técnico por su ID
exports.EliminarTecnico = async (req, res, next) => {
    try {
        await Tecnicos.findByIdAndDelete({ _id: req.params.idTecnico });
        res.json({ mensaje: 'El técnico se ha eliminado' });
    } catch (error) {
        console.log(error);
        next();
    }
};
