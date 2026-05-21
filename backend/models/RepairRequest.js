const mongoose = require('mongoose');

const repairRequestSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    phone: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    deviceModel: {
        type: String,
        required: true,
        trim: true,
        maxlength: 120
    },
    issueDescription: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000
    },
    images: [{
        type: String
    }],
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

repairRequestSchema.index({ isDeleted: 1, createdAt: -1 });
repairRequestSchema.index({ isDeleted: 1, deletedAt: 1 });
repairRequestSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('RepairRequest', repairRequestSchema);
