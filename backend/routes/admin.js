
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');
const { getJwtSecret } = require('../utils/authConfig');

/**
 * POST /api/admin/login
 * Admin login
 */
router.post('/login', async (req, res) => {
    try {
        const username = String(req.body.username || '').trim();
        const password = String(req.body.password || '');
        
        // Validate input
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        
        // Find admin
        const admin = await Admin.findOne({ username });
        
        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Check password
        const isMatch = await admin.comparePassword(password);
        
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { id: admin._id, username: admin.username },
            getJwtSecret(),
            { expiresIn: '24h' }
        );
        
        res.json({
            token,
            username: admin.username
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

/**
 * POST /api/admin/create
 * Create admin user (for initial setup only)
 * In production, remove this endpoint or add additional security
 */
router.post('/create', async (req, res) => {
    try {
        const username = String(req.body.username || '').trim();
        const password = String(req.body.password || '');

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        if (username.length < 3) {
            return res.status(400).json({ error: 'Username must be at least 3 characters long' });
        }

        if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long' });
        }

        const adminCount = await Admin.countDocuments();
        const setupEnabled = process.env.ALLOW_ADMIN_CREATE === 'true';

        if (adminCount > 0 && !setupEnabled) {
            return res.status(403).json({
                error: 'Admin creation is disabled after the first admin is created'
            });
        }
        
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Admin already exists' });
        }
        
        // Create new admin
        const admin = new Admin({ username, password });
        await admin.save();
        
        res.status(201).json({
            message: 'Admin created successfully',
            username: admin.username
        });
        
    } catch (error) {
        console.error('Create admin error:', error);
        res.status(500).json({ error: 'Failed to create admin' });
    }
});

/**
 * POST /api/admin/change-password
 * Change admin password
 */
router.post('/change-password', auth, async (req, res) => {
    try {
        const currentPassword = String(req.body.currentPassword || '');
        const newPassword = String(req.body.newPassword || '');
        
        // Validate input
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Current password and new password are required' });
        }
        
        // Validate new password length
        if (newPassword.length < 8) {
            return res.status(400).json({ error: 'New password must be at least 8 characters long' });
        }
        
        // Find admin
        const admin = await Admin.findById(req.admin.id);
        
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        
        // Verify current password
        const isMatch = await admin.comparePassword(currentPassword);
        
        if (!isMatch) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }
        
        // Update password
        admin.password = newPassword;
        await admin.save();
        
        res.json({
            message: 'Password changed successfully'
        });
        
    } catch (error) {
        console.error('Change password error:', error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }
        
        res.status(500).json({ error: 'Failed to change password' });
    }
});

/**
 * POST /api/admin/change-username
 * Change admin username
 */
router.post('/change-username', auth, async (req, res) => {
    try {
        const currentPassword = String(req.body.currentPassword || '');
        const newUsername = String(req.body.newUsername || '').trim();
        
        // Validate input
        if (!currentPassword || !newUsername) {
            return res.status(400).json({ error: 'Current password and new username are required' });
        }
        
        // Validate new username length
        if (newUsername.length < 3) {
            return res.status(400).json({ error: 'New username must be at least 3 characters long' });
        }
        
        // Find admin
        const admin = await Admin.findById(req.admin.id);
        
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        
        // Verify current password
        const isMatch = await admin.comparePassword(currentPassword);
        
        if (!isMatch) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }
        
        // Check if username already exists (if there are multiple admins)
        const existingAdmin = await Admin.findOne({ 
            username: newUsername,
            _id: { $ne: admin._id }
        });
        
        if (existingAdmin) {
            return res.status(400).json({ error: 'Username already taken' });
        }
        
        // Update username
        admin.username = newUsername;
        await admin.save();
        
        res.json({
            message: 'Username changed successfully',
            username: admin.username
        });
        
    } catch (error) {
        console.error('Change username error:', error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }
        
        res.status(500).json({ error: 'Failed to change username' });
    }
});

module.exports = router;
