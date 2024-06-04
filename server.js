const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


// Middleware para parsear el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = require('./usuarios/routes.js');
app.use('/', router);

const port = process.env.SERVER_PORT;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

