const { obtenerConexion } = require('../database/conexion');

async function getAll() {
    const conexion = await obtenerConexion();
    try {
        const [results] = await conexion.query('SELECT * FROM publicaciones');
        return results;
    } catch (error) {
        console.error('Error al seleccionar publicaciones', error);
        throw error;
    } finally {
        conexion.release();
    }
}

// Función para obtener una imagen por ID
async function obtenerImagenPorId(id) {
    const conexion = await obtenerConexion();
    try {
        const [results] = await conexion.query('SELECT imagen FROM publicaciones WHERE id = ?', [id]);
        if (results.length > 0) {
            return results[0].imagen;  // Devuelve el campo de imagen
        } else {
            return null;  // No se encontró la imagen
        }
    } catch (error) {
        console.error('Error al obtener la imagen:', error);
        throw error;
    } finally {
        conexion.release();
    }
}

// Función para obtener un vídeo por ID
async function obtenerVideoPorId(id) {
    const conexion = await obtenerConexion();
    try {
        const [results] = await conexion.query('SELECT video FROM publicaciones WHERE id = ?', [id]);
        if (results.length > 0) {
            return results[0].video;  // Devuelve el campo de video
        } else {
            return null;  // No se encontró el video
        }
    } catch (error) {
        console.error('Error al obtener el video:', error);
        throw error;
    } finally {
        conexion.release();
    }
}

// Crear una nueva publicación
async function crearPublicacion(usuario_id, titulo, contenido, imagen, video) {
    const conexion = await obtenerConexion();
    try {
        await conexion.query(
            'INSERT INTO publicaciones (usuario_id, titulo, contenido, imagen, video) VALUES (?, ?, ?, ?, ?)',
            [usuario_id, titulo, contenido, imagen, video]
        );
    } catch (error) {
        console.error('Error al crear la publicación:', error);
        throw error;
    } finally {
        conexion.release();
    }
}


module.exports = {
    getAll,
    crearPublicacion,
    obtenerImagenPorId,
    obtenerVideoPorId
};