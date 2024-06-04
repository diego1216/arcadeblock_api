const usuarioServices = require('../services/usuarioServices'); // Crea una constante llamada Usuario que recibe funciones de mis modelos
const authMiddleWare = require('../middlewares/authMiddleware');

async function registrarUsuario(req, res) {
    const dataSegura = req.body.dataSegura;
    console.log("dataSegura = ", dataSegura);
    try {
        let datos = authMiddleWare.verificarDatos(dataSegura);

        console.log('datos = ', datos);

        const usuarioExistente = await verificarRegistro(datos.email);

        if (usuarioExistente) {
            res.status(409).send('El usuario ya está registrado');
        } else {
            await usuarioServices.registrar(datos.nombre, datos.email, datos.password);
            res.status(201).send('Usuario registrado correctamente');
        }
    } catch (error) {
        console.error('Error al registrar usuario en la API:', error.message);
        res.status(500).send('Error interno del servidor');
    }
}



async function logearUsuario(req, res) {
    const { dataSegura } = req.body;
    console.log("req.body = ", req.body);
    try {
        let datos = authMiddleWare.verificarDatos(dataSegura);

        const usuario = await verificarRegistro(datos.email)

        console.log('datos, usuario = ', dataSegura, usuario);

        if (!usuario) {
            return { status: 404, message: 'Usuario Incorrecto' };
        } else {
            let validPassword = await authMiddleWare.comparePassword(datos.password, usuario.contraseña);
            if (!validPassword) {
                res.status(404).send('Contraseña incorrecta');
            } else {
                console.log('se devolvio el usuario');
                res.status(200).json(usuario);
            }
        }
    } catch (error) {
        console.error('Error al verificar el registro:', error);
        return { status: 500, message: 'Error interno del servidor' };
    }
}

async function verificarRegistro(email) {
    try {
        const usuarioExistente = await usuarioServices.verificarRegister(email);
        console.log("usuarioExistente es =", usuarioExistente)
        return usuarioExistente;
    } catch (error) {
        console.error('Error al verificar registro:', error);
        return { status: 500, message: 'Error interno del servidor' };
    }
}

module.exports = {
    registrarUsuario,
    logearUsuario
};
