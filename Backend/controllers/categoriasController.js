const Categorias = require("../models/Categorias");

// Crear una nueva categoría
exports.nuevaCategoria = async (req, res) => {
    const { tipo } = req.body; // Extraer el tipo de categoría del cuerpo de la solicitud

    try {
        const categoria = new Categorias(req.body);
        await categoria.save(); // Intentar guardar la nueva categoría

        res.status(201).json({ mensaje: "Se agregó una nueva categoría" });
    } catch (error) {
        // Verificar si el error es por duplicado
        if (error.code === 11000) {
            return res.status(400).json({
                mensaje: "La categoría ya está registrada"
            });
        }
        // En caso de otro tipo de error, manejarlo aquí
        console.error(error); // Registrar el error en la consola
        res.status(500).send("Hubo un error al agregar la categoría");
    }
};


// Muestra todas las categorías
exports.mostrarCategorias = async (req, res, next) => {
    try {
        const categorias = await Categorias.find({});
        res.json(categorias);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Muestra una categoría por su Id
exports.mostrarCategoria = async (req, res, next) => {
    const categoria = await Categorias.findById(req.params.idCategoria);
    // si no existe la categoría
    if (!categoria) {
        res.json({ mensaje: "La categoría no existe" });
        next();
    }
    // si todo está bien muestra la categoría
    res.json(categoria);
};

// Actualiza una categoría por su ID
exports.actualizarCategoria = async (req, res, next) => {
    try {
        const categoria = await Categorias.findByIdAndUpdate(
            { _id: req.params.idCategoria },
            req.body,
            {
                new: true,
            }
        );
        res.send(categoria);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Eliminar una categoría por su ID
exports.EliminarCategoria = async (req, res, next) => {
    try {
        await Categorias.findByIdAndDelete({ _id: req.params.idCategoria });
        res.json({ mensaje: 'La categoría se ha eliminado' });
    } catch (error) {
        console.log(error);
        next();
    }
};
