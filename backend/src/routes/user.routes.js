const { Router } = require('express');
const router = Router();

const userController = require('../controllers/user.controller');

router.get('/', userController.getUsers);

router.get('/getPreMed', userController.getPreMedUsers);

router.get('/getPrem', userController.getPrem);

router.get('/getAdmin', userController.getAdmin);

router.get('/:id', userController.getUser);

router.put('/:id', userController.editUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;