const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const fs = require('fs');

function verificarToken(req, res, next) {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' });
    }

    const privateKey = fs.readFileSync('./config/jwtRS256.key');
    jwt.verify(token, privateKey, { algorithm: 'RS256' }, (err, usuario) => {
        if (err) {
            return res.status(403).json({ mensaje: 'Token inválido.' });
        }
        req.usuario = usuario;
        next();
    });
}

function verificarDatos(dataSegura) {
    console.log("verificarDatos(dataSegura) = ", dataSegura);
    if (typeof dataSegura === 'object') {
        let resultado = {};
        console.log("resultado = ", resultado);
        Object.keys(dataSegura).forEach(key => {
            console.log("dataSegura = ", dataSegura,' key = ', key);
            resultado[key] = decryptData(dataSegura[key]);
        });
        console.log("resultado = ", resultado);
        return resultado;
    } else {
        throw new Error('Formato de dataSegura no soportado');
    }
}

function decryptData(encryptedText) {
    const key = Buffer.from(process.env.AES_PRIVATE_KEY, 'hex');
    const [ivHex, authTagHex, encryptedHex] = encryptedText.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

async function comparePassword(passwordString, bdHash) {
    return await bcrypt.compare(passwordString, bdHash);
}

module.exports = {
    verificarToken,
    verificarDatos,
    comparePassword
};