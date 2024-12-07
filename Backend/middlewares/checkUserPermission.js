const Role = require('../models/Role');
const User = require('../models/Usuarios'); // Para obtener el rol del usuario

const checkPermission = (resource, action) => {
    return async (req, res, next) => {
        try {
            // Obtener el rol del usuario desde la base de datos
            const user = await User.findById(req.user.id).populate('role'); // Suponiendo que el rol del usuario está en el campo 'role'

            // Si el usuario no tiene rol, denegamos el acceso
            if (!user || !user.role) {
                return res.status(403).json({ message: 'Acceso denegado. Rol no encontrado.' });
            }

            // Verificamos si el rol tiene el permiso adecuado
            const requiredPermission = user.role.permissions.find(permission => permission.resource === resource && permission.action === action);

            if (!requiredPermission) {
                return res.status(403).json({ message: 'Acceso denegado. No tiene el permiso adecuado.' });
            }

            // Si tiene el permiso, continuar con la ejecución de la ruta
            next();

        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error interno del servidor.' });
        }
    };
};

module.exports = checkPermission;
