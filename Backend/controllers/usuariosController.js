const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.CrearUsuario = async (req, res) => {
    
    try {
        const usuario = req.body

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(usuario.password, salt);

    const usuriocreado = new Usuarios({
        nombre: usuario.nombre,
        email: usuario.email,
        password: hashedPassword
    })                            
    await usuriocreado.save();
    
    res.status(201).json({
        message: 'Usuario creado correctamente',
    });
    } catch (error) {
        console.log(error);
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
    }
}


let tokenClient = 'Bearer your_token_here'

const token = tokenClient.split(' ')[1];