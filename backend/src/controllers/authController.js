const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { supabaseFetch } = require('../config/db');
const { toUser } = require('../utils/recordMappers');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d',
    });
};

const getWishlistIds = async (userId) => {
    const { data } = await supabaseFetch(
        `/wishlists?user_id=eq.${encodeURIComponent(userId)}&select=book_id`
    );
    return data.map((item) => item.book_id);
};

const findUserByEmail = async (email) => {
    const { data } = await supabaseFetch(
        `/users?email=eq.${encodeURIComponent(email.toLowerCase())}&select=*`
    );
    return data[0] || null;
};

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
        const normalizedEmail = email.toLowerCase();

        const existingUser = await findUserByEmail(normalizedEmail);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'An account with this email already exists',
            });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const { data: users } = await supabaseFetch('/users?select=*', {
            method: 'POST',
            headers: { Prefer: 'return=representation' },
            body: JSON.stringify({
                name,
                email: normalizedEmail,
                password: hashedPassword,
                campus,
                department,
                semester: Number(semester),
            }),
        });

        const user = toUser(users[0]);
        const token = generateToken(user.id);

        res.status(201).json({
            success: true,
            token,
            user,
        });
    } catch (error) {
        next(error);
    }
};

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
        const userRow = await findUserByEmail(email);

        if (!userRow) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }

        const isMatch = await bcrypt.compare(password, userRow.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }

        const wishlist = await getWishlistIds(userRow.id);
        const user = toUser(userRow, wishlist);
        const token = generateToken(user.id);

        res.json({
            success: true,
            token,
            user,
        });
    } catch (error) {
        next(error);
    }
};

const getMe = async (req, res, next) => {
    try {
        const wishlist = await getWishlistIds(req.user.id);

        res.json({
            success: true,
            user: {
                ...req.user,
                wishlist,
            },
        });
    } catch (error) {
        next(error);
    }
};

const updateProfile = async (req, res, next) => {
    try {
        const { name, campus, department, semester } = req.body;
        const update = {
            updated_at: new Date().toISOString(),
        };

        if (name !== undefined) update.name = name;
        if (campus !== undefined) update.campus = campus;
        if (department !== undefined) update.department = department;
        if (semester !== undefined) update.semester = Number(semester);

        const { data: users } = await supabaseFetch(
            `/users?id=eq.${encodeURIComponent(req.user.id)}&select=*`,
            {
                method: 'PATCH',
                headers: { Prefer: 'return=representation' },
                body: JSON.stringify(update),
            }
        );

        const wishlist = await getWishlistIds(req.user.id);

        res.json({
            success: true,
            user: toUser(users[0], wishlist),
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login, getMe, updateProfile };
