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

exports.mostrarVentas = async (req, res) => {
    try {
        const ventas = await Ventas.find({})
        res.json(ventas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las ventas', error });
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
        const venta = await Ventas.findByIdAndUpdate({ _id: req.params.idVenta },
            req.body, {
            new: true
        })
        res.json(venta)
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.eliminarVenta = async (req, res, next) => {
    try {
        await Ventas.findByIdAndDelete({ _id: req.params.idVenta })
        res.json({ mensaje: 'La venta ha sido eliminada' })
    } catch (error) {
        next();
    }
}
