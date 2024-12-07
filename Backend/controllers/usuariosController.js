const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuarios = require('../models/Usuarios');
const nodemailer = require('../utils/nodemailer/nodemailer');
const Role = require('../models/Role');

exports.CrearUsuario = async (req, res, next) => {
  try {
    const { nombres, apellidos, email, telefono, password, direccion, role: roleName } = req.body;

    // Validar si el rol existe (buscar el rol por nombre)
    const role = await Role.findOne({ name: roleName });  // Cambiamos "rol" por "roleName"
    if (!role) {
      return res.status(404).json({ mensaje: "El rol no existe" });
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuarios.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El correo ya está en uso" });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear un nuevo usuario con el _id del rol correspondiente
    const nuevoUsuario = new Usuarios({
      nombres,
      apellidos,
      email,
      telefono,
      password: hashedPassword,
      direccion,
      role: role._id,  // Asignamos el _id del rol
    });

    // Guardar el nuevo usuario
    await nuevoUsuario.save();

    res.status(201).json({
      mensaje: "Usuario registrado exitosamente",
      data: nuevoUsuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear el usuario", error });
    next(error);
  }
};

exports.login = async (req, res) => {
  try {
    console.log(req.body);

    // Buscar el usuario por correo y hacer populate para obtener el rol
    const usuario = await Usuarios.findOne({ email: req.body.email }).populate('role'); // 'role' es el campo en tu modelo

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar la contraseña
    const validPassword = await bcrypt.compare(req.body.password, usuario.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Crear el token JWT después de un inicio de sesión exitoso
    const token = jwt.sign({ id: usuario._id }, "mi_clave_secreta", {
      expiresIn: "20d",
    });

    // Eliminar la contraseña del objeto de respuesta
    usuario.password = undefined;

    // Responder con el usuario, el token y el nombre del rol
    res.json({
      message: "Usuario logueado correctamente",
      token: token,
      usuario: {
        _id: usuario._id,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        email: usuario.email,
        roleId: usuario.role._id,  // Aquí se usa 'role._id' correctamente
        role: usuario.role.name,   // Aquí se usa 'role.name' correctamente
        telefono: usuario.telefono,
        direccion: usuario.direccion,
        activo: usuario.activo,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

exports.ObtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuarios.findById(req.userId, { password: 0 }).populate('role'); // Aquí también usamos populate

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
        const { email, nuevaPassword, codigo } = req.body;

        // Si no hay código de recuperación, significa que el usuario está solicitando el restablecimiento
        if (!codigo) {
            const usuario = await Usuarios.findOne({ email });
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const codigoGenerado = Math.floor(100000 + Math.random() * 900000); // Código de 6 dígitos
            const expiracionCodigo = Date.now() + 3600000; // 1 hora de expiración

            usuario.codigoRecuperacion = codigoGenerado;
            usuario.expiracionCodigo = expiracionCodigo;
            await usuario.save();

            const asunto = 'Código de Recuperación de Contraseña';
            const mensaje = `Hola ${usuario.nombres},\n\nTu código de recuperación es: ${codigoGenerado}\nEste código expirará en 1 hora.`;

            const correoEnviado = await nodemailer.enviarCorreo(email, asunto, mensaje);

            if (!correoEnviado) {
                return res.status(500).json({ message: 'Hubo un error al enviar el correo' });
            }

            return res.status(200).json({ message: 'Código de recuperación enviado al correo' });
        }

        const usuario = await Usuarios.findOne({ email });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (usuario.codigoRecuperacion !== parseInt(codigo) || usuario.expiracionCodigo < Date.now()) {
            return res.status(400).json({ message: 'Código inválido o expirado' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(nuevaPassword, salt);

        usuario.password = hashedPassword;
        usuario.codigoRecuperacion = undefined;
        usuario.expiracionCodigo = undefined;
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
        const usuarios = await Usuarios.find({}, { password: 0 }).populate('role'); // Agregado populate para los roles
        console.log("Usuarios encontrados:", usuarios);
        res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.mostrarUsuarioPorId = async (req, res, next) => {
    try {
        const { idUsuario } = req.params;

        const usuario = await Usuarios.findById(idUsuario, { password: 0 }).populate('role'); // Agregado populate para los roles
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json(usuario);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
