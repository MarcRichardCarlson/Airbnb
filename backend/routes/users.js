const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../Middleware/authMiddleware');

// Public routes (no authentication required)
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);

// Protected routes (authentication required)
router.use(authMiddleware.authenticateUser); // Authentication middleware to the routes below

router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;
