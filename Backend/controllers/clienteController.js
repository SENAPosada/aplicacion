const Clientes = require("../models/Clientes");

// Crear un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
    const cliente = new Clientes(req.body);
    //
    try {
        await cliente.save();
        res.json({ mensaje: "Se agregó un nuevo cliente" });
    } catch (error) {
        res.send(error);
        next();
    }
};

// Para agregar muchos en POSTMAn
// exports.nuevoCliente = async (req, res, next) => {
//     console.log("Datos recibidos en POST:", req.body);
    
//     // Verifica si la solicitud contiene un arreglo de clientes
//     const clientes = Array.isArray(req.body) ? req.body : [req.body];

//     try {
//         // Si es un arreglo, guarda todos los clientes de una vez usando insertMany
//         await Clientes.insertMany(clientes);
//         res.json({ mensaje: "Se agregaron los clientes correctamente" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ mensaje: "Hubo un error al agregar los clientes", error });
//         next();
//     }
// };

// Muestra todos los clientes
exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Muestra un cliente por su Id
exports.mostrarCliente = async (req, res, next) => {
    const cliente = await Clientes.findById(req.params.idCliente);
    // si no existe el cliente
    if (!cliente) {
        res.json({ mensaje: "El cliente no existe" });
        next();
    }
    // si todo está bien muestra el cliente
    res.json(cliente);
};

exports.actualizarCliente = async (req, res, next) => {
    try {
        const { nombre, apellido, tipoDocumento, cedula, empresa, email, telefono, direccion } = req.body;

        // Buscar y actualizar el cliente por su ID
        const cliente = await Clientes.findByIdAndUpdate(
            req.params.idCliente,
            { nombre, apellido, tipoDocumento, cedula, empresa, email, telefono, direccion }, // Actualizar todos los campos
            { new: true } // Devuelve el cliente actualizado
        );

        if (!cliente) {
            return res.status(404).send({ mensaje: 'Cliente no encontrado' });
        }

        res.send(cliente); // Devuelve el cliente actualizado
    } catch (error) {
        console.log(error);
        next(); // Pasa el error al middleware de manejo de errores
    }
};




// Eliminar un cliente por su ID
exports.EliminarCliente = async (req, res, next) => {
    try {
        //                                 que ID queremos eliminar 
        await Clientes.findByIdAndDelete({ _id: req.params.idCliente })
        res.json({ mensaje: 'El cliente se ha eliminado' })
    } catch (error) {
        console.log(error);
        next();
    }
}

