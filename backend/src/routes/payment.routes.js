const { Router } = require('express');
const router = Router();

const paymentController = require('../controllers/payment.controller');
const paymentMediumController = require('../controllers/paymentMedium.controller');
const paymentPremiumController = require('../controllers/paymentPremium.controller');

router.post('/basico', paymentController.charge);
router.post('/medium', paymentMediumController.charge);
router.post('/premium', paymentPremiumController.charge);

module.exports = router;