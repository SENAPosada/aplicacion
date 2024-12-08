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

const rolePermissionController = require("../controllers/rolePermissionController")
// Paso 1
const { authenticateUser } = require("../middlewares/authenticateUser.js")
//Middleware para validar los tokens
// Paso 2
const checkPermission = require("../middlewares/checkUserPermission.js")
module.exports = function () {
  // Roles
  router.post('/roles', roleController.createRole);
  router.get('/roles', roleController.getRoles);
  router.get('/roles/:id', roleController.getRoleById);
  router.put('/roles/:id', roleController.updateRole);

  // Rutas para permisos
  router.post('/permissions', permissionController.createPermission); // Crear un permiso
  router.get('/permissions', permissionController.getPermissions); // Obtener todos los permisos
  router.get('/permissions/:id', permissionController.getPermissionById); // Obtener un permiso por ID
  router.put('/permissions/:id', permissionController.updatePermission); // Actualizar un permiso por ID
  router.delete('/permissions/:id', permissionController.deletePermission);

  // Rutas para asignar permisos a un rol
  // Asignar permiso a un rol
  router.post("/roles/asignar-permisos/:id", rolePermissionController.assignPermissionToRole);

  // Obtener permisos asignados a un rol
  router.get("/roles/:roleId/permisos", rolePermissionController.getRolePermissions);


  //Horario
  router.post("/horarios", horarioController.crearHorario);
  router.get("/horarios", horarioController.obtenerHorarios);

  router.post("/usuarios/login", usuariosController.login);
  router.post('/usuarios', usuariosController.CrearUsuario);
  router.get('/usuarios', usuariosController.mostrarUsuarios);
  router.put("/usuarios/:id", usuariosController.mostrarUsuarioPorId);

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
  router.put(
    "/categorias/:idCategoria",
    categoriasController.actualizarCategoria
  );
  router.delete(
    "/categorias/:idCategoria",
    categoriasController.EliminarCategoria
  );

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
  router.post("/citas", authenticateUser, checkPermission('citas', 'crear'), citasController.nuevaCita);
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
