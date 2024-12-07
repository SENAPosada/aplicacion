const RolePermission = require('../models/RolePermission');
const Role = require('../models/Role');
const Permission = require('../models/Permission');

// Asignar permiso a un rol
exports.assignPermissionToRole = async (req, res) => {
    try {
        const { roleId, permissionId } = req.body;

        // Verificar si el rol y el permiso existen
        const role = await Role.findById(roleId);
        const permission = await Permission.findById(permissionId);

        if (!role) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        if (!permission) {
            return res.status(404).json({ message: 'Permiso no encontrado' });
        }

        // Verificar si el permiso ya está asignado al rol
        const existingAssignment = await RolePermission.findOne({ roleId, permissionId });

        if (existingAssignment) {
            return res.status(400).json({ message: 'El permiso ya está asignado a este rol' });
        }

        // Crear la asignación de permiso
        const rolePermission = new RolePermission({ roleId, permissionId });
        await rolePermission.save();

        res.status(201).json({ message: 'Permiso asignado al rol con éxito', rolePermission });
    } catch (error) {
        res.status(500).json({ message: 'Error al asignar permiso al rol', error });
    }
};

// Obtener permisos asignados a un rol específico
exports.getRolePermissions = async (req, res) => {
    try {
        const { roleId } = req.params;

        // Verificar si el rol existe
        const role = await Role.findById(roleId);
        if (!role) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        // Obtener los permisos asignados al rol
        const rolePermissions = await RolePermission.find({ roleId })
            .populate('roleId', 'name') // Obtener solo el nombre del rol
            .populate('permissionId', 'resource action'); // Obtener solo el resource y action del permiso

        res.status(200).json(rolePermissions);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener permisos asignados', error });
    }
};

