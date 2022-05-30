const express = require('express');
const router = express.Router();

const verifyToken = require('../controllers/interceptor')

const politicaInversionController = require('../controllers/politicaInversion.controller');

router.get('/', politicaInversionController.getAll)
router.post('/create', politicaInversionController.create);
router.delete('/:politicaInversion_id', politicaInversionController.deletePoliticaInversion);
router.get('/my-politica-inversion', verifyToken, politicaInversionController.getPoliticaInversion);
router.put('/my-politica-inversion', verifyToken, politicaInversionController.editPoliticaInversion);

module.exports = router;