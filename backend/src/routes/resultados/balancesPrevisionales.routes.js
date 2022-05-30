const express = require('express');
const router = express.Router();

const verifyToken = require('../../controllers/interceptor')

const balancesPrevisionalesController = require('../../controllers/resultados/balancesPrevisionales.controller');

router.get('/', verifyToken, balancesPrevisionalesController.getResultados)

module.exports = router;