const Pedidos = require("../models/Pedidos.js");

exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);
    try {
        await pedido.save();
        res.json({ mensaje: "Se agregó nuevo pedido" });
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.mostrarPedidos = async (req, res) => {
    try {
        const pedidos = await Pedidos.find({})
            .populate("cliente") // Poblamos la información del cliente
            .populate("categoria") // Poblamos la información de la categoría
            .populate("tecnico") // Poblamos la información del técnico
            .populate("cita") // Poblamos la información de la cita
            .populate({
                path: "pedido.producto", // Este es el campo que se llenará con el nombre del producto
                model: "Productos", // Modelo al que se refiere
            });

        res.json(pedidos); // Retorna los pedidos con toda la información poblada
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los pedidos', error });
    }
};

exports.mostrarPedido = async (req, res, next) => {
    try {
        const pedido = await Pedidos.findById(req.params.idPedido)
            .populate("cliente") // Población del cliente
            .populate("categoria") // Población de la categoría
            .populate("tecnico") // Población del técnico
            .populate("cita") // Población de la cita
            .populate({
                path: "pedido.producto", // Población de los productos dentro de pedido
                model: "Productos",
            });

        if (!pedido) {
            res.status(404).json({ mensaje: "Ese pedido no existe" });
            return next();
        }

        res.json(pedido);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener el pedido", error });
    }
};


exports.actualizarPedido = async (req, res, next) => {
    try {
        let pedido = await Pedidos.findByIdAndUpdate({ _id: req.params.idPedido },
            req.body, {
            new: true
        })
            .populate("cliente")
            .populate({
                path: "pedido.producto",
                model: "Productos",
            });
        res.json(pedido)
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.eliminarPedido = async (req, res, next) => {
    try {
        await Pedidos.findByIdAndDelete({ _id: req.params.idPedido })
        res.json({ mensaje: 'El pedido ha sido eliminado' })
    } catch (error) {
        next();

    }
}

