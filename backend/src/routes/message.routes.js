const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message.controller');

router.get('/', messageController.getAll);
router.post('/create', messageController.postMessage);
router.get('/:src/:dst', messageController.getMessages)
router.get('/roomId/:id', messageController.getMessagesByUser)

module.exports = router;