const { Router } = require('express');
const router = Router();

const adminController = require('../controllers/admin.controller');

router.get('/user/:id', adminController.getUserById);
router.delete('/users/:id', adminController.deleteUser);

router.get('/plan/:id', adminController.getPlan)
router.get('/plan/balance/:id', adminController.getBalance)
router.put('/plan/balance/:id', adminController.editBalance)

router.get('/plan/cuentaPerdidasGanancias/:id', adminController.getCuentaPerdidasGanancias)
router.put('/plan/cuentaPerdidasGanancias/:id', adminController.editCuentaPerdidasGanancias)

router.get('/plan/estrategiaMercado/:id', adminController.getEstrategiaMercado)
router.put('/plan/estrategiaMercado/:id', adminController.editEstrategiaMercado)

router.get('/plan/politicaInversion/:id', adminController.getPoliticaInversion)
router.put('/plan/politicaInversion/:id', adminController.editPoliticaInversion)

router.get('/plan/politicaFinanciacion/:id', adminController.getPoliticaFinanciacion)
router.put('/plan/politicaFinanciacion/:id', adminController.editPoliticaFinanciacion)

router.get('/plan/estrategiaCirculante/:id', adminController.getEstrategiaCirculante)
router.put('/plan/estrategiaCirculante/:id', adminController.editEstrategiaCirculante)

router.get('/plan-user', adminController.planAdmin)

module.exports = router;