const Publicacion = require('../models/publicacionModel');

async function getPublicaciones() {
    return await Publicacion.getAll();
}

// Función para obtener imagen por ID
async function getImagenPorId(id) {
    return await Publicacion.obtenerImagenPorId(id);
}

// Función para obtener video por ID
async function getVideoPorId(id) {
    return await Publicacion.obtenerVideoPorId(id);
}

async function crearPublicacion(usuario_id, titulo, contenido, imagen, video) {
    return await Publicacion.crearPublicacion(usuario_id, titulo, contenido, imagen, video);
    
}

module.exports = {
    getPublicaciones,
    crearPublicacion,
    getImagenPorId,
    getVideoPorId
};