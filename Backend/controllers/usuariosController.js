const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usuarios = require("../models/Usuarios");
const { enviarCorreo } = require("../utils/nodemailer/nodemailer");


const your_secret_key = "23hcvas6678xcbfnjqweytryeusxcvcx7cdhscx345jdxys";

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
      direccion,
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

    const token = jwt.sign({ id: usuario._id }, your_secret_key, {
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
