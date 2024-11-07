const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'luisenriquesoraca27@gmail.com',
        pass: 'wuvugllyczsmxxsb'
    },
    tls: {
        rejectUnauthorized: false
    }
});


exports.enviarCorreo = async (email, asunto, mensaje) => {
    try {
        const info = await transporter.sendMail({
            from: '"Luis Enrique Soraca" <luisenriquesoraca27@gmail.com>',
            to: email,
            subject: asunto,
            text: mensaje
        });
        console.log('Correo enviado con éxito:', info.messageId);
        return true;
        
    } catch (error) {
        console.error('Hubo un error al enviar el correo:', error);
        return false;
    }
}
