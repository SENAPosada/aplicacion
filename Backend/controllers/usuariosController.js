const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuarios = require('../models/Usuarios');
const nodemailer = require('../utils/nodemailer/nodemailer');

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

    res
      .status(201)
      .json({ mensaje: "Usuario registrado exitosamente", data: nuevoUsuario });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.login = async (req, res) => {
  try {
    const usuario = await Usuarios.findOne({ email: req.body.email });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      usuario.password 
    );

    if (!validPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: usuario._id, roles: usuario.roles }, your_secret_key, {
      expiresIn: "20d",
    });

    usuario.password = undefined;

    res.json({
      message: "Usuario logueado correctamente",
      token: token,
      usuario: usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

exports.ObtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuarios.findById(req.userId, { password: 0 });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};

exports.restablecerPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const usuario = await Usuarios.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    //crear una codigo numero aleatorio de 6 digitos
    const codigo = Math.floor(Math.random() * 100000) + 100000;

    //Enviar codigo de recuperacion al correo
    await enviarCorreo(
      email,
      "Restablecimiento de contraseña",
      `Tu código de recuperación es: ${codigo}`
    );

    //Actualizar la fecha de expiracion del codigo
    usuario.codigoRecuperacion = codigo;
    usuario.codigoExpiracion = Date.now() + 3600000; //Expira en 1 hora

    await usuario.save();

    res.status(200).json({
      message: "Se ha enviado un código de recuperación a su correo electrónico",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al restablecer contraseña" });
  }
};


exports.restablecerPassword = async (req, res) => {
    try {
        const { email, nuevaPassword, codigo } = req.body;  // Cambié 'codigoRecuperacion' por 'codigo' para mayor claridad

        // Si no hay código de recuperación, significa que el usuario está solicitando el restablecimiento
        if (!codigo) {
            // Verificar si el usuario existe
            const usuario = await Usuarios.findOne({ email });
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Generar un código de recuperación (puede ser un número aleatorio o una cadena)
            const codigoGenerado = Math.floor(100000 + Math.random() * 900000); // Código de 6 dígitos
            const expiracionCodigo = Date.now() + 3600000; // 1 hora de expiración

            // Guardar el código y su expiración en el usuario (en la base de datos)
            usuario.codigoRecuperacion = codigoGenerado;
            usuario.expiracionCodigo = expiracionCodigo;
            await usuario.save();

            // Enviar el código de recuperación por correo
            const asunto = 'Código de Recuperación de Contraseña';
            const mensaje = `Hola ${usuario.nombres},\n\nTu código de recuperación es: ${codigoGenerado}\nEste código expirará en 1 hora.`;

            const correoEnviado = await nodemailer.enviarCorreo(email, asunto, mensaje);

            if (!correoEnviado) {
                return res.status(500).json({ message: 'Hubo un error al enviar el correo' });
            }

            return res.status(200).json({ message: 'Código de recuperación enviado al correo' });
        }

        // Si hay un código, procederemos con la verificación y restablecimiento de la contraseña
        const usuario = await Usuarios.findOne({ email });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si el código es correcto y no ha expirado
        if (usuario.codigoRecuperacion !== parseInt(codigo) || usuario.expiracionCodigo < Date.now()) {
            return res.status(400).json({ message: 'Código inválido o expirado' });
        }

        // Hashear la nueva contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(nuevaPassword, salt);

        // Actualizar la contraseña en la base de datos
        usuario.password = hashedPassword;
        usuario.codigoRecuperacion = undefined; // Borrar el código después de usarlo
        usuario.expiracionCodigo = undefined; // Borrar la expiración
        await usuario.save();

        res.status(200).json({ message: 'Contraseña restablecida exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al gestionar la contraseña' });
    }
};

exports.actualizarUsuario = async (req, res, next) => {
    try {
        const { idUsuario } = req.params;
        const datosActualizados = req.body;

        // Buscar y actualizar el usuario
        const usuarioActualizado = await Usuarios.findByIdAndUpdate(
            idUsuario,
            datosActualizados,
            { new: true, runValidators: true }
        );

        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json({
            mensaje: "Usuario actualizado exitosamente",
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.mostrarUsuarios = async (req, res, next) => {
    try {
        const usuarios = await Usuarios.find({}, { password: 0 }); // Excluye las contraseñas
        res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.mostrarUsuarioPorId = async (req, res, next) => {
    try {
        const { idUsuario } = req.params;

        const usuario = await Usuarios.findById(idUsuario, { password: 0 }); // Excluye las contraseñas
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json(usuario);
    } catch (error) {
        console.error(error);
        next(error);
    }
};