const PublicacionServicio = require('../services/publicacionServicio');

// Obtener todas las publicaciones
async function getPublicaciones(req, res) {
    try {
        console.log('Solicitud recibida para obtener publicaciones');
        const publicaciones = await PublicacionServicio.getPublicaciones();
        console.log('Publicaciones obtenidas:', publicaciones);

        const publicacionesProcesadas = publicaciones.map(pub => {
            return {
                id: pub.id,
                usuario_id: pub.usuario_id,
                titulo: pub.titulo,
                contenido: pub.contenido,
                imagen: pub.imagen ? `http://localhost:3000/publicaciones/imagen/${pub.id}` : null,
                video: pub.video ? `http://localhost:3000/publicaciones/video/${pub.id}` : null
            };
        });

        console.log('Publicaciones procesadas:', publicacionesProcesadas);

        res.setHeader('Content-Type', 'application/json');
        res.json({ title: 'Página Principal', publicaciones: publicacionesProcesadas });
    } catch (error) {
        console.error('Error al obtener publicaciones:', error);
        res.status(500).json({ error: 'Error al obtener publicaciones' });
    }
}


async function crearPublicacion(req, res) {
    console.log('Llamada a crearPublicacion');
    const { usuario_id, titulo, contenido } = req.body;
    const imagen = req.files && req.files['imagen'] ? req.files['imagen'][0].buffer : null;
    const video = req.files && req.files['video'] ? req.files['video'][0].buffer : null;

    // Validar usuario_id
    if (!usuario_id || isNaN(usuario_id)) {
        return res.status(400).json({ error: 'usuario_id es requerido y debe ser un número válido.' });
    }

    console.log('Datos de la nueva publicación:', {
        usuario_id,
        titulo,
        contenido,
        imagen: imagen ? 'Imagen recibida' : 'Sin imagen',
        video: video ? 'Video recibido' : 'Sin video'
    });

    try {
        await PublicacionServicio.crearPublicacion(usuario_id, titulo, contenido, imagen, video);
        console.log('Publicación creada exitosamente');
        res.status(201).json({ message: 'Publicación creada exitosamente' });
    } catch (error) {
        console.error('Error al crear publicación:', error);
        res.status(500).json({ error: 'Error al crear publicación' });
    }
}

module.exports = {
    getPublicaciones,
    crearPublicacion
};
