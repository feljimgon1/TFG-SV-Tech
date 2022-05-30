const { Router } = require('express');
const router = Router();

const profileController = require('../controllers/profile.controller');

router.get('/', profileController.get);

module.exports = router;