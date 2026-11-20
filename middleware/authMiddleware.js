const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    try {
        const [scheme, token] = (req.headers.authorization || '').split(' ');
        if (scheme !== 'Bearer' || !token) return res.status(401).json({ message: 'Authentication required' });
        if (!process.env.JWT_SECRET) return res.status(500).json({ message: 'Authentication is not configured' });
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload.userId).select('-password');
        if (!user) return res.status(401).json({ message: 'Account no longer exists' });
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = protect;
