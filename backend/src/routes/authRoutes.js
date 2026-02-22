const express = require('express');
const { body } = require('express-validator');
const { register, login, getMe, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/auth/register
router.post(
    '/register',
    [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('email')
            .isEmail()
            .withMessage('Please provide a valid email')
            .normalizeEmail(),
        body('password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters'),
        body('campus').notEmpty().withMessage('Campus is required'),
        body('department').notEmpty().withMessage('Department is required'),
        body('semester')
            .isInt({ min: 1, max: 8 })
            .withMessage('Semester must be between 1 and 8'),
    ],
    register
);

// @route   POST /api/auth/login
router.post(
    '/login',
    [
        body('email')
            .isEmail()
            .withMessage('Please provide a valid email')
            .normalizeEmail(),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    login
);

// @route   GET /api/auth/me
router.get('/me', protect, getMe);

// @route   PUT /api/auth/me
router.put('/me', protect, updateProfile);

module.exports = router;
