const Role = require('../models/Role');

// Crear un nuevo rol
exports.createRole = async (req, res) => {
    try {
        const { name, description } = req.body;

        const role = new Role({ name, description });
        await role.save();

        res.status(201).json({ message: 'Rol creado con éxito', role });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el rol', error });
    }
};

// Obtener todos los roles
exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener roles', error });
    }
};

// Obtener un rol por ID
exports.getRoleById = async (req, res) => {
    try {
        const { id } = req.params;

        const role = await Role.findById(id);
        if (!role) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el rol', error });
    }
};

// Actualizar un rol por ID
exports.updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const updatedRole = await Role.findByIdAndUpdate(
            id,
            { name, description },
            { new: true, runValidators: true }
        );

        if (!updatedRole) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        res.status(200).json({ message: 'Rol actualizado con éxito', updatedRole });
    } catch (error) {
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
