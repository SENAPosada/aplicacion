const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuarios = require('../models/Usuarios');

exports.CrearUsuario = async (req, res) => {
    try {
        const usuario = req.body;

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(usuario.password, salt);

        const usuarioCreado = new Usuarios({
            nombre: usuario.nombre,
            email: usuario.email,
            password: hashedPassword,
            telefono: usuario.telefono,
            direccion: usuario.direccion
        });

        await usuarioCreado.save();

        res.status(201).json({
            message: 'Usuario creado correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al crear usuario' });
    }
};


exports.LoginUsuario = async (req, res) => {
    try {
        const usuario = await Usuarios.findOne({ email: req.body.email });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const validPassword = await bcrypt.compare(req.body.password, usuario.password);

        if (!validPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: usuario._id }, 'your_secret_key', { expiresIn: '20d' });

        res.json({
            message: 'Usuario logueado correctamente',
            token: token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

exports.ObtenerUsuario = async (req, res) => {
    try {
        const usuario = await Usuarios.findById(req.userId, { password: 0 }); 

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener usuario' });
    }
};


// let tokenClient = 'Bearer your_token_here'

// const token = tokenClient.split(' ')[1];