const Categorias = require("../models/Categorias");

// Crear una nueva categoría
exports.nuevaCategoria = async (req, res, next) => {
    const categoria = new Categorias(req.body);
    try {
        await categoria.save();
        res.json({ mensaje: "Se agregó una nueva categoría" });
    } catch (error) {
        if (error.code === 11000) {
            // Código de error de MongoDB para duplicados
            res.status(400).json({
                mensaje: "La categoría ya está registrada"
            });
        } else {
            res.status(500).json({
                mensaje: "Hubo un error al agregar la categoría"
            });
        }
        next();
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
