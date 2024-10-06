const Repuestos = require("../models/Respuestos");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const fs = require('fs');

const configuracionMulter = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            // Especifica la ruta directamente como una cadena de texto
            cb(null, __dirname + "/../uploads");
        },
        filename: (req, file, cb) => {
            // Obtener la extensión del archivo
            const extension = file.mimetype.split("/")[1];
            cb(null, `${uuidv4()}.${extension}`);
        },
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, true);
        } else {
            cb(new Error("Formato no válido"));
        }
    },
};

// Middleware para subir archivos
const upload = multer(configuracionMulter).single("imagen");

// Sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error });
        }
        return next();
    });
};

// Agrega nuevos repuestos
exports.nuevoRepuesto = async (req, res, next) => {
    const repuesto = new Repuestos(req.body);

    try {
        // Solo asignar la imagen si se ha subido un archivo
        if (req.file && req.file.filename) {
            repuesto.imagen = req.file.filename;
        }
        await repuesto.save();
        res.json({ mensaje: "Se agregó un nuevo repuesto" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Hubo un error al agregar el repuesto' });
    }
};

// Muestra todos los repuestos
exports.mostrarRepuestos = async (req, res, next) => {
    try {
        const repuestos = await Repuestos.find({});
        res.json(repuestos);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Mostrar un repuesto por ID
exports.mostrarRepuesto = async (req, res, next) => {
    const repuesto = await Repuestos.findById(req.params.idRepuesto);
    // Si no existe el repuesto
    if (!repuesto) {
        res.json({ mensaje: "Ese repuesto no existe" });
        return next();
    }
    res.json(repuesto);
};

// Actualizar un repuesto por su ID
exports.actualizarRepuesto = async (req, res, next) => {
    try {
        // Construir nuevo repuesto
        let nuevoRepuesto = req.body;
        // Verificar si hay una imagen nueva, si no hay nada (req.file)
        if (req.file) {
            nuevoRepuesto.imagen = req.file.filename;
        } else {
            // Si no hay imagen nueva, mantener la imagen anterior
            let repuestoAnterior = await Repuestos.findById(req.params.idRepuesto);
            nuevoRepuesto.imagen = repuestoAnterior.imagen;
        }
        // Filtrar por el ID
        let repuesto = await Repuestos.findByIdAndUpdate(
            { _id: req.params.idRepuesto },
            nuevoRepuesto, {
                // Retornar el nuevo valor
                new: true,
            }
        );
        res.json(repuesto);
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.eliminarRepuesto = async (req, res, next) => {
    try {
        const repuesto = await Repuestos.findOneAndDelete({ _id: req.params.idRepuesto });
        console.log(repuesto.imagen);
        console.log(__dirname + `/../uploads/${repuesto.imagen}`);
        if (repuesto.imagen) {
            const imagenAnteriorPath = __dirname + `/../uploads/${repuesto.imagen}`;
            // Eliminar archivo con filesystem
            fs.unlink(imagenAnteriorPath, (error) => {
                if (error) {
                    console.log(error);
                }
                return;
            });
        }
        res.json({ repuesto, mensaje: 'Repuesto eliminado' });
    } catch (error) {
        res.json({ mensaje: 'No existe ese repuesto' });
        console.log(error);
        next();
    }
};

exports.buscarRepuesto = async (req, res, next) => {
    try {
        // Obtener el query
        const { query } = req.params;
        // Crear la expresión regular para buscar por nombre, sin importar mayúsculas/minúsculas
        const repuesto = await Repuestos.find({ nombre: new RegExp(query, 'i') });
        res.json(repuesto);
    } catch (error) {
        console.log(error);
        next();
    }
};
