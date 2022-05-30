const express = require('express');
const router = express.Router();

const planPersonalizadoController = require('../controllers/planPersonalizado.controller');

router.get('/get', planPersonalizadoController.get)

module.exports = router;