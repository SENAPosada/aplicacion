const jwt = require('jsonwebtoken');

exports.authenticateUser = (req, res, next) => {
    console.log('Autenticando usuario...');
    
    // Extraer el token del encabezado Authorization
    const token = req.headers['authorization']?.split(' ')[1]; 
    console.log('Token recibido:', token);

    if (!token) {
        return res.status(403).json({ error: true, message: 'No token provided' });
    }

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decodificado:', decoded);

        // Añadir el ID del usuario al objeto req
        req.user = { id: decoded.id }; 

        next(); // Continuar al siguiente middleware o controlador
    } catch (err) {
        console.error('Error al verificar el token:', err.message);
        return res.status(401).json({ error: true, message: 'Token inválido o expirado' });
    }
};
