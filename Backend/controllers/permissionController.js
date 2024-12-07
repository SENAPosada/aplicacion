const Permission = require('../models/Permission');

// Crear un nuevo permiso
exports.createPermission = async (req, res) => {
    try {
        const { resource, action, description } = req.body;

        const permission = new Permission({ resource, action, description });
        await permission.save();

        res.status(201).json({ message: 'Permiso creado con éxito', permission });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el permiso', error });
    }
};

// Obtener todos los permisos
exports.getPermissions = async (req, res) => {
    try {
        const permissions = await Permission.find();
        res.status(200).json(permissions);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener permisos', error });
    }
};

// Obtener un permiso por ID
exports.getPermissionById = async (req, res) => {
    try {
        const { id } = req.params;

        const permission = await Permission.findById(id);
        if (!permission) {
            return res.status(404).json({ message: 'Permiso no encontrado' });
        }

        res.status(200).json(permission);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el permiso', error });
    }
};

// Actualizar un permiso por ID
exports.updatePermission = async (req, res) => {
    try {
        const { id } = req.params;
        const { resource, action, description } = req.body;

        const updatedPermission = await Permission.findByIdAndUpdate(
            id,
            { resource, action, description },
            { new: true, runValidators: true }
        );

        if (!updatedPermission) {
            return res.status(404).json({ message: 'Permiso no encontrado' });
        }

        res.status(200).json({ message: 'Permiso actualizado con éxito', updatedPermission });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el permiso', error });
    }
};

// Eliminar un permiso por ID
exports.deletePermission = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPermission = await Permission.findByIdAndDelete(id);

        if (!deletedPermission) {
            return res.status(404).json({ message: 'Permiso no encontrado' });
        }

        res.status(200).json({ message: 'Permiso eliminado con éxito', deletedPermission });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el permiso', error });
    }
};
