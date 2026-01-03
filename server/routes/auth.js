const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Register new user
router.post('/register', AuthController.register);

// Login user
router.post('/login', AuthController.login);

// Verify token (protected route)
router.get('/verify', authMiddleware, AuthController.verifyToken);

module.exports = router;