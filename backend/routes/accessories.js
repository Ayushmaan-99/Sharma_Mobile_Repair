const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const Accessory = require('../models/Accessory');
const auth = require('../middleware/auth');
const {
    ensureUploadSubdir,
    buildStoredUploadPath,
    toPublicUrl,
    deleteUpload
} = require('../utils/fileStorage');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, ensureUploadSubdir('accessories'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'accessory-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
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

router.param('id', (req, res, next, id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid accessory id' });
    }

    next();
});

/**
 * GET /api/accessories
 * Get all accessories (public)
 */
router.get('/', async (req, res) => {
    try {
        const accessories = await Accessory.find().sort({ createdAt: -1 });
        
        // Add full image URL
        const accessoriesWithUrls = accessories.map(accessory => ({
            id: accessory._id,
            name: accessory.name,
            description: accessory.description,
            price: accessory.price,
            image: toPublicUrl(req, accessory.image),
            available: accessory.available,
            createdAt: accessory.createdAt
        }));
        
        res.json(accessoriesWithUrls);
    } catch (error) {
        console.error('Get accessories error:', error);
        res.status(500).json({ error: 'Failed to fetch accessories' });
    }
});

/**
 * POST /api/accessories
 * Add new accessory (admin only)
 */
router.post('/', auth, upload.single('image'), async (req, res) => {
    try {
        const name = String(req.body.name || '').trim();
        const description = String(req.body.description || '').trim();
        const price = Number(req.body.price);
        const { available } = req.body;
        
        // Validate input
        if (!name || !description || !Number.isFinite(price) || price < 0) {
            return res.status(400).json({ error: 'Name, description, and price are required' });
        }
        
        if (!req.file) {
            return res.status(400).json({ error: 'Image is required' });
        }
        
        // Create accessory
        const accessory = new Accessory({
            name,
            description,
            price,
            image: buildStoredUploadPath('accessories', req.file.filename),
            available: available === 'true' || available === true
        });
        
        await accessory.save();
        
        res.status(201).json({
            message: 'Accessory added successfully',
            accessory: {
                id: accessory._id,
                name: accessory.name,
                description: accessory.description,
                price: accessory.price,
                image: toPublicUrl(req, accessory.image),
                available: accessory.available
            }
        });
    } catch (error) {
        console.error('Add accessory error:', error);
        res.status(500).json({ error: 'Failed to add accessory' });
    }
});

/**
 * PUT /api/accessories/:id
 * Update accessory (admin only)
 */
router.put('/:id', auth, upload.single('image'), async (req, res) => {
    try {
        const name = req.body.name ? String(req.body.name).trim() : '';
        const description = req.body.description ? String(req.body.description).trim() : '';
        const price = req.body.price !== undefined ? Number(req.body.price) : undefined;
        const { available } = req.body;
        
        const accessory = await Accessory.findById(req.params.id);
        
        if (!accessory) {
            return res.status(404).json({ error: 'Accessory not found' });
        }
        
        // Update fields
        if (name) accessory.name = name;
        if (description) accessory.description = description;
        if (price !== undefined) {
            if (!Number.isFinite(price) || price < 0) {
                return res.status(400).json({ error: 'Price must be a valid non-negative number' });
            }
            accessory.price = price;
        }
        if (available !== undefined) accessory.available = available === 'true' || available === true;
        
        // Update image if new one is uploaded
        if (req.file) {
            // Delete old image
            deleteUpload(accessory.image);
            accessory.image = buildStoredUploadPath('accessories', req.file.filename);
        }
        
        await accessory.save();
        
        res.json({
            message: 'Accessory updated successfully',
            accessory: {
                id: accessory._id,
                name: accessory.name,
                description: accessory.description,
                price: accessory.price,
                image: toPublicUrl(req, accessory.image),
                available: accessory.available
            }
        });
    } catch (error) {
        console.error('Update accessory error:', error);
        res.status(500).json({ error: 'Failed to update accessory' });
    }
});

/**
 * DELETE /api/accessories/:id
 * Delete accessory (admin only)
 */
router.delete('/:id', auth, async (req, res) => {
    try {
        const accessory = await Accessory.findById(req.params.id);
        
        if (!accessory) {
            return res.status(404).json({ error: 'Accessory not found' });
        }
        
        // Delete image file
        deleteUpload(accessory.image);
        
        await Accessory.findByIdAndDelete(req.params.id);
        
        res.json({ message: 'Accessory deleted successfully' });
    } catch (error) {
        console.error('Delete accessory error:', error);
        res.status(500).json({ error: 'Failed to delete accessory' });
    }
});

module.exports = router;
