const express = require('express');
const router = express.Router();

const verifyToken = require('../controllers/interceptor')

const politicaFinanciacionController = require('../controllers/politicaFinanciacion.controller');

router.get('/', politicaFinanciacionController.getAll)
router.post('/create', politicaFinanciacionController.create);
router.delete('/:politicaFinanciacion_id', politicaFinanciacionController.deletePoliticaFinanciacion);
router.get('/my-politica-financiacion', verifyToken, politicaFinanciacionController.getPoliticaFinanciacion);
router.put('/my-politica-financiacion', verifyToken, politicaFinanciacionController.editPoliticaFinanciacion);

module.exports = router;