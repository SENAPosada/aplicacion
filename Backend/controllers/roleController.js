const Role = require('../models/Role');

// Crear un nuevo rol
exports.createRole = async (req, res) => {
    try {
        const { name, description, permissions, activo } = req.body;

        // Validar que los datos esenciales estén presentes
        if (!name || !permissions || permissions.length === 0) {
            return res.status(400).json({ message: 'El nombre del rol y los permisos son requeridos' });
        }

        // Crear el nuevo rol con los datos recibidos
        const role = new Role({ name, description, permissions, activo });
        await role.save();

        res.status(201).json({ message: 'Rol creado con éxito', role });
    } catch (error) {
        console.error('Error al crear el rol:', error);
        res.status(500).json({ message: 'Error al crear el rol', error });
    }
};


// Obtener todos los roles
exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.find().select('name description permissions activo');
        res.status(200).json(roles);
    } catch (error) {
        console.error('Error al obtener roles:', error);
        res.status(500).json({ message: 'Error al obtener roles', error });
    }
};


// Obtener un rol por ID
exports.getRoleById = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Role.findById(id).select('name description permissions activo');
        if (!role) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.status(200).json(role);
    } catch (error) {
        console.error('Error al obtener el rol:', error);
        res.status(500).json({ message: 'Error al obtener el rol', error });
    }
};


// Actualizar un rol por ID
exports.updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, permissions } = req.body; // Incluye los permisos

        // Actualiza el rol con todos los campos enviados
        const updatedRole = await Role.findByIdAndUpdate(
            id,
            { name, description, permissions }, // Actualiza también los permisos
            { new: true, runValidators: true } // Retorna el documento actualizado
        );

        if (!updatedRole) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        res.status(200).json({ message: 'Rol actualizado con éxito', updatedRole });
    } catch (error) {
        console.error('Error al actualizar el rol:', error);
        res.status(500).json({ message: 'Error al actualizar el rol', error });
    }
};


// Eliminar un rol por ID
exports.deleteRole = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRole = await Role.findByIdAndDelete(id);

        if (!deletedRole) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        res.status(200).json({ message: 'Rol eliminado con éxito', deletedRole });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el rol', error });
    }
};
