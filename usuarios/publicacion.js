const express = require('express');
const router = express.Router();
const publicacionController = require('../controllers/publicacionController');
const multer = require('multer');

// Configuración de `multer` para manejar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/createNewPost', (req, res) => {
    res.render('createNewPost', { title: 'Crear Publicación' });
});

router.get('/getAllPost', (req, res) => {
    console.log('Solicitud GET recibida en /getAllPost');
    publicacionController.getPublicaciones(req, res);
});

router.post('/createNewPost', upload.fields([{ name: 'imagen' }, { name: 'video' }]), (req, res, next) => {
    console.log('Solicitud POST recibida en /createNewPost');
    next();
}, (req, res) => {
    console.log('Pasando a controlador crearPublicacion');
    publicacionController.crearPublicacion(req, res);
});


module.exports = router;
