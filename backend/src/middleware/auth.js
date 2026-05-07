const jwt = require('jsonwebtoken');
const { supabaseFetch } = require('../config/db');
const { toUser } = require('../utils/recordMappers');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized — no token provided',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { data: users } = await supabaseFetch(
            `/users?id=eq.${encodeURIComponent(decoded.id)}&select=*`
        );

        if (!users[0]) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized — user not found',
            });
        }

        req.user = toUser(users[0]);
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized — invalid token',
        });
    }
};

module.exports = { protect };
