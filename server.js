const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const PublicacionServicio = require('./services/publicacionServicio');

const app = express();

// Middleware para manejar los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/publicaciones/imagen/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const imagen = await PublicacionServicio.getImagenPorId(id);
      if (imagen) {
          // Asumiendo que la imagen es un buffer y que es tipo JPEG
          res.writeHead(200, {
              'Content-Type': 'image/jpeg',
              'Content-Length': imagen.length
          });
          res.end(imagen);
      } else {
          res.status(404).send('Imagen no encontrada');
      }
  } catch (error) {
      console.error('Error al obtener la imagen:', error);
      res.status(500).send('Error interno del servidor');
  }
});

app.get('/publicaciones/video/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const video = await PublicacionServicio.getVideoPorId(id);
      if (video) {
          res.writeHead(200, {
              'Content-Type': 'video/mp4', // Ajusta según el formato de tus vídeos
              'Content-Length': video.length
          });
          res.end(video);
      } else {
          res.status(404).send('Video no encontrado');
      }
  } catch (error) {
      console.error('Error al obtener el video:', error);
      res.status(500).send('Error interno del servidor');
  }
});

const router = require('./usuarios/routes.js');
app.use('/', router);


// Rutas de publicaciones
const publicacionRoutes = require('./usuarios/publicacion');
app.use('/publicaciones', (req, res, next) => {
    console.log('Solicitud recibida en /publicaciones');
    next();
}, publicacionRoutes);

console.log('Publicacion routes loaded');

// Ruta de prueba
app.get('/test', (req, res) => {
  res.json({ message: 'Ruta de prueba funcionando' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
