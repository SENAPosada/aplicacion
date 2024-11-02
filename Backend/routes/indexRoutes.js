const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const repuestosController = require("../controllers/repuestosController");
const ventasController = require("../controllers/ventasController.js")
const categoriasController = require("../controllers/categoriasController");
const tecnicosController = require("../controllers/tecnicosController");
const citasController = require("../controllers/citasController")
const serviciosController = require("../controllers/serviciosController"); // Importar el controlador de servicios
const horarioController = require("../controllers/horarioController.js")
const usuariosController = require("../controllers/usuariosController.js")

//Middleware para validar los tokens
const { protectSession, protectAdmin } = require("../middlewares/auth.middleware");
module.exports = function () {

    //Horario
    router.post('/horarios', horarioController.crearHorario);
    router.get('/horarios', horarioController.obtenerHorarios);


    // Usuarios
    router.post("/usuarios", usuariosController.CrearUsuario);
    router.get("/usuarios", usuariosController.ObtenerUsuario);
    router.post("/usuarios/login", usuariosController.login);
    //router.use(protectSession)
    // router.use(protectAdmin)
    // router.get("/usuarios/:idUsuario", protectSession, protectAdmin, clienteController.mostrarUsuario);
    // router.put("/usuarios/:idUsuario", clienteController.actualizarUsuario);
    // router.delete("/usuarios/:idUsuario", clienteController.eliminarUsuario);

    // Clientes
    router.post("/clientes", clienteController.nuevoCliente);
    router.get("/clientes", clienteController.mostrarClientes);
    router.get("/clientes/:idCliente", clienteController.mostrarCliente);
    router.put("/clientes/:idCliente", clienteController.actualizarCliente);
    router.delete("/clientes/:idCliente", clienteController.EliminarCliente);

    // Tecnicos
    router.post("/tecnicos", tecnicosController.nuevoTecnico);
    router.get("/tecnicos", tecnicosController.mostrarTecnicos);
    router.get("/tecnicos/:idTecnico", tecnicosController.mostrarTecnico);
    router.put("/tecnicos/:idTecnico", tecnicosController.actualizarTecnico);
    router.delete("/tecnicos/:idTecnico", tecnicosController.EliminarTecnico);

    // Categoría de servicios
    router.post("/categorias", categoriasController.nuevaCategoria);
    router.get("/categorias", categoriasController.mostrarCategorias);
    router.get("/categorias/:idCategoria", categoriasController.mostrarCategoria);
    router.put("/categorias/:idCategoria", categoriasController.actualizarCategoria);
    router.delete("/categorias/:idCategoria", categoriasController.EliminarCategoria);

    // Servicios
    router.post("/servicios", serviciosController.nuevoServicio);
    router.get("/servicios", serviciosController.mostrarServicios);
    router.get("/servicios/:idServicio", serviciosController.mostrarServicio);
    router.put("/servicios/:idServicio", serviciosController.actualizarServicio);
    router.delete("/servicios/:idServicio", serviciosController.eliminarServicio);

    // Repuestos
    router.post(
        "/repuestos",
        repuestosController.subirArchivo,
        repuestosController.nuevoRepuesto
    );
    router.get("/repuestos", repuestosController.mostrarRepuestos);
    router.get("/repuestos/:idRepuesto", repuestosController.mostrarRepuesto);
    router.put(
        "/repuestos/:idRepuesto",
        repuestosController.subirArchivo,
        repuestosController.actualizarRepuesto
    );
    router.delete("/repuestos/:idRepuesto", repuestosController.eliminarRepuesto);

    // Búsqueda de repuestos
    router.post("/repuestos/busqueda/:query", repuestosController.buscarRepuesto);

    // Citas
    router.post("/citas", citasController.nuevaCita);
    router.get("/citas", citasController.mostrarCitas);
    router.get("/citas/:idCita", citasController.mostrarCita);
    router.put("/citas/:idCita", citasController.actualizarCita);
    router.delete("/citas/:idCita", citasController.eliminarCita);

    // Pedidos
    router.post("/ventas", ventasController.nuevaVenta);
    router.get("/ventas", ventasController.mostrarVentas);
    router.get("/ventas/:idVenta", ventasController.mostrarVenta);
    router.put("/ventas/:idVenta", ventasController.actualizarVenta);
    router.delete("/ventas/:idVenta", ventasController.eliminarVenta);

    return router;
};
