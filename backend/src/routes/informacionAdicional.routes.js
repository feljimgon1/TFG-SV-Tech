const express = require('express');
const router = express.Router();

const verifyToken = require('../controllers/interceptor')

const informacionAdicionalController = require('../controllers/informacionAdicional.controller');

router.get('/getAll',informacionAdicionalController.getAll)
router.get('/get',verifyToken,informacionAdicionalController.get)
router.put('/edit', verifyToken, informacionAdicionalController.edit);

module.exports = router;