const express = require('express');
const router = express.Router();

const verifyToken = require('../controllers/interceptor')

const estrategiaMercadoController = require('../controllers/estrategiaMercado.controller');

router.get('/', estrategiaMercadoController.getAll)
router.post('/create', estrategiaMercadoController.create);
router.delete('/:estrategiaMercado_id', estrategiaMercadoController.deleteEstrategiaMercado);
router.get('/my-estrategia-mercado', verifyToken, estrategiaMercadoController.getEstrategiaMercado);
router.put('/my-estrategia-mercado', verifyToken, estrategiaMercadoController.editEstrategiaMercado);

module.exports = router;