const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

/**
 * USER modul útvonalai
 */

// register new user
router.post('/register', userController.register);

// login user
router.post('/login', userController.login);

// get all users
router.get('/', authMiddleware, userController.getAllUsers);

// get user by id
router.get('/:id', authMiddleware, userController.getUserByID);

// get logged user profile
router.get('/profile', authMiddleware, userController.getProfile);

// update user by id
router.patch('/:id', authMiddleware, userController.updateUserByID);

// delete user by id
router.delete('/:id', authMiddleware, userController.deleteUserByID);

module.exports = router;