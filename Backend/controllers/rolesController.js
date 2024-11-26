const Rol = require("../models/Roles");

// Crear un nuevo rol
exports.nuevoRol = async (req, res, next) => {
    const rol = new Rol(req.body);

    try {
        await rol.save();
        res.json({ mensaje: "Se creó un nuevo rol" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensaje: "Hubo un error al crear el rol" });
        next();
    }
};

// Mostrar todos los roles
exports.mostrarRoles = async (req, res, next) => {
    try {
        const roles = await Rol.find({});
        res.json(roles);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Mostrar un rol por su ID
exports.mostrarRol = async (req, res, next) => {
    const rol = await Rol.findById(req.params.idRol);

    // Si no existe el rol
    if (!rol) {
        return res.status(404).json({ mensaje: "El rol no existe" });
    }

    // Si todo está bien muestra el rol
    res.json(rol);
};

// Actualizar un rol por su ID
exports.actualizarRol = async (req, res, next) => {
    try {
        const { nombre, permisos, activo } = req.body; // Extraer los campos para actualizar

        // Buscar y actualizar el rol por su ID
        const rol = await Rol.findByIdAndUpdate(
            req.params.idRol,
            { nombre, permisos, activo }, // Actualizar los campos
            { new: true } // Devuelve el rol actualizado
        );

        if (!rol) {
            return res.status(404).json({ mensaje: 'Rol no encontrado' });
        }

        res.json(rol); // Devuelve el rol actualizado
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensaje: 'Hubo un error al actualizar el rol' });
        next(); // Pasa el error al middleware de manejo de errores
    }
};

// Eliminar un rol por su ID
exports.eliminarRol = async (req, res, next) => {
    try {
        // Eliminar el rol por su ID
        await Rol.findByIdAndDelete(req.params.idRol);
        res.json({ mensaje: 'El rol se ha eliminado' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensaje: 'Hubo un error al eliminar el rol' });
        next(); // Pasa el error al middleware de manejo de errores
    }
};
