const express = require('express');
const router = express.Router();

const verifyToken = require('../controllers/interceptor')

const estrategiaCirculanteController = require('../controllers/estrategiaCirculante.controller');

router.get('/', estrategiaCirculanteController.getAll)
router.post('/create', estrategiaCirculanteController.create);
router.delete('/:estrategiaCirculante_id', estrategiaCirculanteController.deleteEstrategiaCirculante);
router.get('/my-estrategia-circulante', verifyToken, estrategiaCirculanteController.getEstrategiaCirculante);
router.put('/my-estrategia-circulante', verifyToken, estrategiaCirculanteController.editEstrategiaCirculante);

module.exports = router;