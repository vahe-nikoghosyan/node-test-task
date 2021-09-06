const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();
const verify = require('../middlewares/verifyToken')

router.get('/', verify, userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/register', userController.insertNewUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
