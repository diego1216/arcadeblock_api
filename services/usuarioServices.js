const userModel = require('../models/userModel');

async function registrar(nombre, email, password) {
    try {
        await userModel.registrarUsuario(nombre, email, password);
    } catch (error) {
        console.error('Error al registrar usuario en el servicio:', error);
        throw error;
    }
}

async function obtenerPorNombre(nombre) {
    try {
        return await userModel.obtenerNombre(nombre);
    } catch (error) {
        console.error('Error al obtener usuario por nombre en el servicio:', error);
        throw error;
    }
}

async function verificarRegister(email) {
    try {
        return await userModel.verificarUsuarioExistente(email);
    } catch (error) {
        console.error('Error al verificar usuario en el servicio:', error);
        throw error;
    }
}


module.exports = {
    registrar,
    obtenerPorNombre,
    verificarRegister
};