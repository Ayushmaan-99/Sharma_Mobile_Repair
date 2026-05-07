const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const RepairRequest = require('../models/RepairRequest');
const auth = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/repairs';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'repair-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per file
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

/**
 * POST /api/repair-requests
 * Submit a repair request (public)
 */
router.post('/', upload.array('images', 5), async (req, res) => {
    try {
        const { customerName, phone, email, deviceModel, issueDescription } = req.body;
        
        // Validate required fields
        if (!customerName || !phone || !deviceModel || !issueDescription) {
            return res.status(400).json({
                error: 'Customer name, phone, device model, and issue description are required'
            });
        }
        
        // Validate phone number
        if (!/^[0-9]{10}$/.test(phone)) {
            return res.status(400).json({ error: 'Invalid phone number. Must be 10 digits.' });
        }
        
        // Get uploaded image paths
        const imagePaths = req.files ? req.files.map(file => file.path) : [];
        
        // Create repair request
        const repairRequest = new RepairRequest({
            customerName,
            phone,
            email: email || undefined,
            deviceModel,
            issueDescription,
            images: imagePaths
        });
        
        await repairRequest.save();
        
        res.status(201).json({
            message: 'Repair request submitted successfully',
            request: {
                id: repairRequest._id,
                customerName: repairRequest.customerName,
                phone: repairRequest.phone,
                deviceModel: repairRequest.deviceModel,
                status: repairRequest.status,
                createdAt: repairRequest.createdAt
            }
        });
    } catch (error) {
        console.error('Submit repair request error:', error);
        res.status(500).json({ error: 'Failed to submit repair request' });
    }
});

/**
 * GET /api/repair-requests
 * Get all active repair requests (admin only)
 */
router.get('/', auth, async (req, res) => {
    try {
        // Only get non-deleted requests
        const requests = await RepairRequest.find({ isDeleted: false }).sort({ createdAt: -1 });
        
        // Add full image URLs
        const requestsWithUrls = requests.map(request => ({
            id: request._id,
            customerName: request.customerName,
            phone: request.phone,
            email: request.email,
            deviceModel: request.deviceModel,
            issueDescription: request.issueDescription,
            images: request.images.map(img => `${req.protocol}://${req.get('host')}/${img}`),
            status: request.status,
            createdAt: request.createdAt
        }));
        
        res.json(requestsWithUrls);
    } catch (error) {
        console.error('Get repair requests error:', error);
        res.status(500).json({ error: 'Failed to fetch repair requests' });
    }
});

/**
 * GET /api/repair-requests/recycle-bin
 * Get all deleted repair requests (recycle bin) (admin only)
 */
router.get('/recycle-bin/all', auth, async (req, res) => {
    try {
        console.log('Fetching recycle bin requests...');
        
        // Get deleted requests
        const requests = await RepairRequest.find({ isDeleted: true }).sort({ deletedAt: -1 });
        
        console.log(`Found ${requests.length} deleted requests in recycle bin`);
        
        // Add full image URLs and calculate days remaining
        const requestsWithUrls = requests.map(request => {
            const daysInBin = Math.floor((Date.now() - new Date(request.deletedAt)) / (1000 * 60 * 60 * 24));
            const daysRemaining = 15 - daysInBin;
            
            return {
                id: request._id,
                customerName: request.customerName,
                phone: request.phone,
                email: request.email,
                deviceModel: request.deviceModel,
                issueDescription: request.issueDescription,
                images: request.images.map(img => `${req.protocol}://${req.get('host')}/${img}`),
                status: request.status,
                createdAt: request.createdAt,
                deletedAt: request.deletedAt,
                daysRemaining: daysRemaining > 0 ? daysRemaining : 0
            };
        });
        
        res.json(requestsWithUrls);
    } catch (error) {
        console.error('Get recycle bin error:', error);
        res.status(500).json({ error: 'Failed to fetch recycle bin' });
    }
});

/**
 * GET /api/repair-requests/:id
 * Get single repair request (admin only)
 */
router.get('/:id', auth, async (req, res) => {
    try {
        const request = await RepairRequest.findById(req.params.id);
        
        if (!request) {
            return res.status(404).json({ error: 'Repair request not found' });
        }
        
        res.json({
            id: request._id,
            customerName: request.customerName,
            phone: request.phone,
            email: request.email,
            deviceModel: request.deviceModel,
            issueDescription: request.issueDescription,
            images: request.images.map(img => `${req.protocol}://${req.get('host')}/${img}`),
            status: request.status,
            createdAt: request.createdAt
        });
    } catch (error) {
        console.error('Get repair request error:', error);
        res.status(500).json({ error: 'Failed to fetch repair request' });
    }
});

/**
 * PATCH /api/repair-requests/:id
 * Update repair request status (admin only)
 */
router.patch('/:id', auth, async (req, res) => {
    try {
        const { status } = req.body;
        
        if (!status || !['pending', 'completed'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status. Must be "pending" or "completed"' });
        }
        
        const request = await RepairRequest.findById(req.params.id);
        
        if (!request) {
            return res.status(404).json({ error: 'Repair request not found' });
        }
        
        request.status = status;
        await request.save();
        
        res.json({
            message: 'Status updated successfully',
            request: {
                id: request._id,
                status: request.status
            }
        });
    } catch (error) {
        console.error('Update repair request error:', error);
        res.status(500).json({ error: 'Failed to update repair request' });
    }
});

/**
 * DELETE /api/repair-requests/:id
 * Soft delete repair request (move to recycle bin) (admin only)
 */
router.delete('/:id', auth, async (req, res) => {
    try {
        console.log('Delete request received for ID:', req.params.id);
        
        const request = await RepairRequest.findById(req.params.id);
        
        if (!request) {
            console.log('Request not found:', req.params.id);
            return res.status(404).json({ error: 'Repair request not found' });
        }
        
        console.log('Request found, current isDeleted:', request.isDeleted);
        
        // Soft delete - move to recycle bin
        request.isDeleted = true;
        request.deletedAt = new Date();
        await request.save();
        
        console.log('Request soft deleted successfully:', request._id);
        console.log('New isDeleted value:', request.isDeleted);
        console.log('DeletedAt:', request.deletedAt);
        
        res.json({ 
            message: 'Repair request moved to recycle bin',
            daysUntilPermanentDelete: 15
        });
    } catch (error) {
        console.error('Delete repair request error:', error);
        res.status(500).json({ error: 'Failed to delete repair request' });
    }
});

/**
 * POST /api/repair-requests/:id/restore
 * Restore repair request from recycle bin (admin only)
 */
router.post('/:id/restore', auth, async (req, res) => {
    try {
        const request = await RepairRequest.findById(req.params.id);
        
        if (!request) {
            return res.status(404).json({ error: 'Repair request not found' });
        }
        
        if (!request.isDeleted) {
            return res.status(400).json({ error: 'Repair request is not in recycle bin' });
        }
        
        // Restore from recycle bin
        request.isDeleted = false;
        request.deletedAt = null;
        await request.save();
        
        res.json({ 
            message: 'Repair request restored successfully',
            request: {
                id: request._id,
                customerName: request.customerName,
                status: request.status
            }
        });
    } catch (error) {
        console.error('Restore repair request error:', error);
        res.status(500).json({ error: 'Failed to restore repair request' });
    }
});

/**
 * DELETE /api/repair-requests/:id/permanent
 * Permanently delete repair request (admin only)
 */
router.delete('/:id/permanent', auth, async (req, res) => {
    try {
        const request = await RepairRequest.findById(req.params.id);
        
        if (!request) {
            return res.status(404).json({ error: 'Repair request not found' });
        }
        
        // Delete uploaded images
        request.images.forEach(imagePath => {
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        });
        
        // Permanently delete from database
        await RepairRequest.findByIdAndDelete(req.params.id);
        
        res.json({ message: 'Repair request permanently deleted' });
    } catch (error) {
        console.error('Permanent delete repair request error:', error);
        res.status(500).json({ error: 'Failed to permanently delete repair request' });
    }
});

/**
 * POST /api/repair-requests/cleanup
 * Clean up old deleted requests (older than 15 days) (admin only)
 */
router.post('/cleanup/old', auth, async (req, res) => {
    try {
        const fifteenDaysAgo = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000);
        
        // Find requests deleted more than 15 days ago
        const oldRequests = await RepairRequest.find({
            isDeleted: true,
            deletedAt: { $lte: fifteenDaysAgo }
        });
        
        let deletedCount = 0;
        
        // Delete images and requests
        for (const request of oldRequests) {
            // Delete uploaded images
            request.images.forEach(imagePath => {
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            });
            
            await RepairRequest.findByIdAndDelete(request._id);
            deletedCount++;
        }
        
        res.json({ 
            message: `Cleaned up ${deletedCount} old repair requests`,
            deletedCount
        });
    } catch (error) {
        console.error('Cleanup error:', error);
        res.status(500).json({ error: 'Failed to cleanup old requests' });
    }
});

module.exports = router;
