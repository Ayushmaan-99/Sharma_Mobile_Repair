const jwt = require('jsonwebtoken');
const { getJwtSecret } = require('../utils/authConfig');

const auth = (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ error: 'No authentication token provided' });
        }
        
        // Verify token
        const decoded = jwt.verify(token, getJwtSecret());
        req.admin = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = auth;
