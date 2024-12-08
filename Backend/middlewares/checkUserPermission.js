const Role = require('../models/Role');
const User = require('../models/Usuarios'); // Para obtener el rol del usuario

const checkPermission = (resource, action) => {
    return async (req, res, next) => {
        try {
            console.log(`Verificando permisos para el recurso: ${resource}, acción: ${action}`);
            console.log(`Usuario autenticado ID: ${req.user?.id}`);

            // Obtener el usuario desde la base de datos
            const user = await User.findById(req.user.id).populate('role');
            
            if (!user) {
                console.log('Acceso denegado: Usuario no encontrado.');
                return res.status(403).json({ message: 'Acceso denegado. Usuario no encontrado.' });
            }

            if (!user.role) {
                console.log('Acceso denegado: Rol no asignado al usuario.');
                return res.status(403).json({ message: 'Acceso denegado. Rol no asignado al usuario.' });
            }

            console.log(`Rol del usuario: ${user.role.name}`);
            console.log(`Permisos del rol:`, user.role.permissions);

            // Buscar el permiso requerido
            const requiredPermission = user.role.permissions.find(
                (permission) => permission.resource === resource && permission.action === action
            );

            if (!requiredPermission) {
                console.log(`Acceso denegado: Permiso '${action}' en '${resource}' no encontrado.`);
                return res.status(403).json({ message: 'Acceso denegado. No tiene el permiso adecuado.' });
            }

            console.log('Permiso validado. Continuando con la ejecución...');
            next();
        } catch (err) {
            console.error('Error en checkPermission:', err);
            return res.status(500).json({ message: 'Error interno del servidor.' });
        }
    };
};


module.exports = checkPermission;
