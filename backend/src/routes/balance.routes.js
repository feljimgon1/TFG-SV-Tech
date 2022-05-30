const express = require('express');
const router = express.Router();

const verifyToken = require('../controllers/interceptor')

const balanceController = require('../controllers/balance.controller');

router.get('/', balanceController.getAll)
router.post('/create', balanceController.create);
router.delete('/:balance_id', balanceController.deleteBalance);
router.get('/my-balance', verifyToken, balanceController.getBalance);
router.put('/my-balance', verifyToken, balanceController.editBalance);

module.exports = router;