const express = require('express');
const router = express.Router();


// Rutas para el controlador

const usuarios = require('./registrarRoute');


router.use('/usuarios', usuarios);


module.exports = router;