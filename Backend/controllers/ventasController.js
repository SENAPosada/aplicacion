const Ventas = require("../models/Ventas.js");

exports.nuevaVenta = async (req, res, next) => {
    const venta = new Ventas(req.body);
    try {
        await venta.save();
        res.json({ mensaje: "Se agregó nueva venta" });
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.mostrarVentas = async (req, res, next) => {
    try {
        // Usamos populate para los campos que contienen ObjectId
        const ventas = await Ventas.find({})
        .populate('cliente', 'nombre apellido cedula email direccion') // Poblamos el cliente
        .populate('tecnico', 'nombre apellido cedula email direccion') // Poblamos el cliente
        .populate('servicio') // Poblamos el servicio
        .populate('categoria') // Poblamos la categoria
        .populate('repuestos') // Poblamos los repuestos (en caso de que también tengas un ObjectId en repuesto)
        .exec(); // Ejecutamos la consulta

        res.json(ventas); // Regresamos las ventas con los datos poblados
    } catch (error) {
        console.log(error);
        next();
    }
};


exports.mostrarVenta = async (req, res, next) => {
    try {
        const venta = await Ventas.findById(req.params.idVenta)
        if (!venta) {
            res.status(404).json({ mensaje: "Esa venta no existe" });
            return next();
        }

        res.json(venta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener la venta", error });
    }
};

exports.actualizarVenta = async (req, res, next) => {
    try {
        // Busca la venta por ID
        const venta = await Ventas.findById(req.params.idVenta);

        if (!venta) {
            return res.status(404).json({ mensaje: "Venta no encontrada" });
        }

        // Verifica si el estado de la venta es "Finalizado"
        if (venta.estado === "Finalizado") {
            return res.status(403).json({ mensaje: "No se puede editar una venta finalizada." });
        }

        // Si no está finalizada, permite la actualización
        const ventaActualizada = await Ventas.findByIdAndUpdate(
            req.params.idVenta,
            req.body, // Actualiza con los datos del cliente
            { new: true, runValidators: true } // Devuelve la venta actualizada
        );

        res.json(ventaActualizada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al actualizar la venta" });
    }
};



exports.eliminarVenta = async (req, res, next) => {
    try {
        await Ventas.findByIdAndDelete({ _id: req.params.idVenta })
        res.json({ mensaje: 'La venta ha sido eliminada' })
    } catch (error) {
        next();
    }
}
