const express = require('express');
const router = express.Router();

const verifyToken = require('../../controllers/interceptor')

const cuentaPerdidasGananciasPrevisionalesController = require('../../controllers/resultados/cuentaPerdidasGananciasPrevisionales.controller');

router.get('/', verifyToken , cuentaPerdidasGananciasPrevisionalesController.getResultados)

module.exports = router;