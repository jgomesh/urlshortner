const express = require('express');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const validateUser = require('../validations/userValidation');
const authAdmin = require('../middlewares/authAdmin');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.delete('/user/:id', authAdmin, UserController.delete);
router.get('/users', authAdmin, UserController.getAll);
router.post('/register', validateUser, UserController.store);
router.post('/login', AuthController.authenticate);
router.get('/auth', authMiddleware, UserController.index);

module.exports = router;
