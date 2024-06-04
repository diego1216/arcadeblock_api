
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/registrar', userController.registrarUsuario);
router.post('/login', userController.logearUsuario);

module.exports = router;

