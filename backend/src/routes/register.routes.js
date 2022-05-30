const { Router } = require('express');
const router = Router();

const registerController = require('../controllers/register.controller');

router.post('/', registerController.register);
router.get('/checkEmail/:email', registerController.checkEmail);

module.exports = router;