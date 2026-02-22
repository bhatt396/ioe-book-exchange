const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d',
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array().map((e) => e.msg).join(', '),
            });
        }

        const { name, email, password, campus, department, semester } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'An account with this email already exists',
            });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            campus,
            department,
            semester,
        });

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                campus: user.campus,
                department: user.department,
                semester: user.semester,
                wishlist: user.wishlist,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array().map((e) => e.msg).join(', '),
            });
        }

        const { email, password } = req.body;

        // Find user and include password for comparison
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }

        // Generate token
        const token = generateToken(user._id);

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                campus: user.campus,
                department: user.department,
                semester: user.semester,
                wishlist: user.wishlist,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get current logged-in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).populate('wishlist');

        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                campus: user.campus,
                department: user.department,
                semester: user.semester,
                wishlist: user.wishlist,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/me
// @access  Private
const updateProfile = async (req, res, next) => {
    try {
        const { name, campus, department, semester } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name, campus, department, semester },
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                campus: user.campus,
                department: user.department,
                semester: user.semester,
                wishlist: user.wishlist,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login, getMe, updateProfile };
