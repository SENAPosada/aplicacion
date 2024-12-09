const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const repuestosController = require("../controllers/repuestosController");
const ventasController = require("../controllers/ventasController.js");
const categoriasController = require("../controllers/categoriasController");
const tecnicosController = require("../controllers/tecnicosController");
const citasController = require("../controllers/citasController");
const serviciosController = require("../controllers/serviciosController"); // Importar el controlador de servicios
const horarioController = require("../controllers/horarioController.js");
const usuariosController = require("../controllers/usuariosController")
const roleController = require("../controllers/roleController.js")
const permissionController = require("../controllers/permissionController.js")
const turnosController = require("../controllers/turnosController");

const appointmentsController = require("../controllers/appointmentsController.js")
const rolePermissionController = require("../controllers/rolePermissionController")
// Paso 1
// const { authenticateUser } = require("../middlewares/authenticateUser.js")
//Middleware para validar los tokens
// Paso 2
// const checkPermission = require("../middlewares/checkUserPermission.js")
const { authenticateUser, checkPermission } = require("../middlewares/mockMiddlewares.js");

module.exports = function () {
// Roles
router.post('/roles', roleController.createRole);
router.get('/roles', authenticateUser, checkPermission('roles', 'leer'), roleController.getRoles);
router.get('/roles/:id', authenticateUser, checkPermission('roles', 'leer'), roleController.getRoleById);
router.put('/roles/:id', authenticateUser, checkPermission('roles', 'actualizar'), roleController.updateRole);

// Permisos
router.post('/permissions', authenticateUser, checkPermission('permissions', 'crear'), permissionController.createPermission);
router.get('/permissions', authenticateUser, checkPermission('permissions', 'leer'), permissionController.getPermissions);
router.get('/permissions/:id', authenticateUser, checkPermission('permissions', 'leer'), permissionController.getPermissionById);
router.put('/permissions/:id', authenticateUser, checkPermission('permissions', 'actualizar'), permissionController.updatePermission);
router.delete('/permissions/:id', authenticateUser, checkPermission('permissions', 'eliminar'), permissionController.deletePermission);

// Rutas para asignar permisos a un rol
router.post("/roles/asignar-permisos/:id", authenticateUser, checkPermission('roles', 'actualizar'), rolePermissionController.assignPermissionToRole);
router.get("/roles/:roleId/permisos", authenticateUser, checkPermission('roles', 'leer'), rolePermissionController.getRolePermissions);

// Turnos
router.post("/turnos", authenticateUser, checkPermission('turnos', 'crear'), turnosController.crearTurno);
router.get("/turnos", authenticateUser, checkPermission('turnos', 'leer'), turnosController.obtenerTurnos);
router.get("/turnos/:id", authenticateUser, checkPermission('turnos', 'leer'), turnosController.obtenerTurnoPorId);
router.put("/turnos/:id", authenticateUser, checkPermission('turnos', 'actualizar'), turnosController.actualizarTurno);
router.delete("/turnos/:id", authenticateUser, checkPermission('turnos', 'eliminar'), turnosController.eliminarTurno);

// Horarios
router.post("/horarios", authenticateUser, checkPermission('horarios', 'crear'), horarioController.crearHorario);
router.get("/horarios", authenticateUser, checkPermission('horarios', 'leer'), horarioController.obtenerHorarios);

// Usuarios token implementado 
router.post("/usuarios/login", usuariosController.login); // Pública
router.post('/usuarios', usuariosController.CrearUsuario); // Pública
router.get("/usuarios", authenticateUser, checkPermission('usuarios', 'leer'), usuariosController.mostrarUsuarios); // Requiere autenticación y permisos para leer usuarios
router.put("/usuarios/:id", authenticateUser, checkPermission('usuarios', 'actualizar'), usuariosController.actualizarUsuario); // Requiere autenticación y permisos para actualizar usuario



// Clientes
router.post('/clientes', authenticateUser, checkPermission('clientes', 'crear'), clienteController.nuevoCliente);
router.get('/clientes', authenticateUser, checkPermission('clientes', 'leer'), clienteController.mostrarClientes);
router.get('/clientes/:idCliente', authenticateUser, checkPermission('clientes', 'leer'), clienteController.mostrarCliente);
router.put('/clientes/:idCliente', authenticateUser, checkPermission('clientes', 'actualizar'), clienteController.actualizarCliente);
// router.delete('/clientes/:idCliente', authenticateUser, checkPermission('clientes', 'eliminar'), clienteController.EliminarCliente);

// Técnicos
router.post('/tecnicos', authenticateUser, checkPermission('tecnicos', 'crear'), tecnicosController.nuevoTecnico);
router.get('/tecnicos', authenticateUser, checkPermission('tecnicos', 'leer'), tecnicosController.mostrarTecnicos);
router.get('/tecnicos/:idTecnico', authenticateUser, checkPermission('tecnicos', 'leer'), tecnicosController.mostrarTecnico);
router.put('/tecnicos/:idTecnico', authenticateUser, checkPermission('tecnicos', 'actualizar'), tecnicosController.actualizarTecnico);
router.delete('/tecnicos/:idTecnico', authenticateUser, checkPermission('tecnicos', 'eliminar'), tecnicosController.EliminarTecnico);

// Categorías
router.post('/categorias', authenticateUser, checkPermission('categorias', 'crear'), categoriasController.nuevaCategoria);
router.get('/categorias', authenticateUser, checkPermission('categorias', 'leer'), categoriasController.mostrarCategorias);
router.get('/categorias/:idCategoria', authenticateUser, checkPermission('categorias', 'leer'), categoriasController.mostrarCategoria);
router.put('/categorias/:idCategoria', authenticateUser, checkPermission('categorias', 'actualizar'), categoriasController.actualizarCategoria);
router.delete('/categorias/:idCategoria', authenticateUser, checkPermission('categorias', 'eliminar'), categoriasController.EliminarCategoria);

// Servicios
router.post('/servicios', authenticateUser, checkPermission('servicios', 'crear'), serviciosController.nuevoServicio);
router.get('/servicios', authenticateUser, checkPermission('servicios', 'leer'), serviciosController.mostrarServicios);
router.get('/servicios/:idServicio', authenticateUser, checkPermission('servicios', 'leer'), serviciosController.mostrarServicio);
router.put('/servicios/:idServicio', authenticateUser, checkPermission('servicios', 'actualizar'), serviciosController.actualizarServicio);
router.delete('/servicios/:idServicio', authenticateUser, checkPermission('servicios', 'eliminar'), serviciosController.eliminarServicio);

// Repuestos
router.post('/repuestos', authenticateUser, checkPermission('repuestos', 'crear'), repuestosController.nuevoRepuesto);
router.get('/repuestos', authenticateUser, checkPermission('repuestos', 'leer'), repuestosController.mostrarRepuestos);
router.get('/repuestos/:idRepuesto', authenticateUser, checkPermission('repuestos', 'leer'), repuestosController.mostrarRepuesto);
router.put('/repuestos/:idRepuesto', authenticateUser, checkPermission('repuestos', 'actualizar'), repuestosController.actualizarRepuesto);
router.delete('/repuestos/:idRepuesto', authenticateUser, checkPermission('repuestos', 'eliminar'), repuestosController.eliminarRepuesto);

// Ventas
router.post('/ventas', authenticateUser, checkPermission('ventas', 'crear'), ventasController.nuevaVenta);
router.get('/ventas', authenticateUser, checkPermission('ventas', 'leer'), ventasController.mostrarVentas);
router.get('/ventas/:idVenta', authenticateUser, checkPermission('ventas', 'leer'), ventasController.mostrarVenta);
router.put('/ventas/:idVenta', authenticateUser, checkPermission('ventas', 'actualizar'), ventasController.actualizarVenta);
router.delete('/ventas/:idVenta', authenticateUser, checkPermission('ventas', 'eliminar'), ventasController.eliminarVenta);

  return router;
};
