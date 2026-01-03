const AuthModel = require('../models/authModel');
const jwt = require('jsonwebtoken');

class AuthController {
    // Register new user
    static async register(req, res) {
        try {
            const { email, password, firstName, lastName } = req.body;

            // Validate input
            if (!email || !password || !firstName || !lastName) {
                return res.status(400).json({
                    success: false,
                    error: 'All fields are required'
                });
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid email format'
                });
            }

            // Validate password requirements: min 8 chars, at least one letter and one number
            if (password.length < 8) {
                return res.status(400).json({
                    success: false,
                    error: 'Password must be at least 8 characters long'
                });
            }

            const hasLetter = /[a-zA-Z]/.test(password);
            const hasNumber = /[0-9]/.test(password);

            if (!hasLetter || !hasNumber) {
                return res.status(400).json({
                    success: false,
                    error: 'Password must contain at least one letter and one number'
                });
            }

            // Check if email already exists
            const emailExists = await AuthModel.emailExists(email);
            if (emailExists) {
                return res.status(400).json({
                    success: false,
                    error: 'Email already registered'
                });
            }

            // Create user
            const userId = await AuthModel.createUser(email, password, firstName, lastName);

            // Generate JWT token
            const token = jwt.sign(
                { userId, email },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            // Get user info (without password)
            const user = await AuthModel.findById(userId);

            res.status(201).json({
                success: true,
                message: 'Registration successful',
                token,
                user
            });
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({
                success: false,
                error: 'Registration failed. Please try again.',
                message: error.message
            });
        }
    }

    // Login user
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            // Validate input
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    error: 'Email and password are required'
                });
            }

            // Find user by email
            const user = await AuthModel.findByEmail(email);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    error: 'Invalid email or password'
                });
            }

            // Verify password
            const isValidPassword = await AuthModel.verifyPassword(password, user.password_hash);
            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    error: 'Invalid email or password'
                });
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            // Return user info (without password)
            const userInfo = {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name
            };

            res.json({
                success: true,
                message: 'Login successful',
                token,
                user: userInfo
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                success: false,
                error: 'Login failed. Please try again.',
                message: error.message
            });
        }
    }

    // Verify token (get current user)
    static async verifyToken(req, res) {
        try {
            // The auth middleware will have already verified the token
            // and attached the user info to req.user
            const user = await AuthModel.findById(req.user.userId);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    error: 'User not found'
                });
            }

            res.json({
                success: true,
                user
            });
        } catch (error) {
            console.error('Token verification error:', error);
            res.status(500).json({
                success: false,
                error: 'Token verification failed',
                message: error.message
            });
        }
    }
}

module.exports = AuthController;