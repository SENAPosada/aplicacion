const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuarios = require('../models/Usuarios');

exports.CrearUsuario = async (req, res, next) => {
    try {
        const { nombre, email, telefono, password, direccion } = req.body;

        const usuarioExistente = await Usuarios.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: "El correo ya está en uso" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const nuevoUsuario = new Usuarios({
            nombre,
            email,
            telefono,
            password: hashedPassword,
            direccion
        });

        await nuevoUsuario.save();

        res.status(201).json({ mensaje: "Usuario registrado exitosamente" });
    } catch (error) {
        console.error(error);
        next(error);
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