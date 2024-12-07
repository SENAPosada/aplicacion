const jwt = require('jsonwebtoken');

exports.authenticateUser = (req, res, next) => {
    console.log('Autenticando usuario...');
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; // Extrae el token

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decodificar el token

        // Asignar el ID del usuario al objeto `req.user`
        req.user = { id: decoded.id };  // Aquí usamos el id extraído del token

        next(); // Continuar con la ejecución
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};
