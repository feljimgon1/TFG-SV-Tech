const express = require('express');
const router = express.Router();

const verifyToken = require('../controllers/interceptor')

const cuentaPerdidasGananciasController = require('../controllers/cuentaPerdidasGanancias.controller');

router.get('/', cuentaPerdidasGananciasController.getAll)
router.post('/create', cuentaPerdidasGananciasController.create);
router.delete('/:cuentaPerdidasGananciasId', cuentaPerdidasGananciasController.deleteCuentaPerdidasGanancias);
router.get('/my-cuenta-perdidas-ganancias', verifyToken, cuentaPerdidasGananciasController.getCuentaPerdidasGanancias);
router.put('/my-cuenta-perdidas-ganancias', verifyToken, cuentaPerdidasGananciasController.editCuentaPerdidasGanancias);

module.exports = router;