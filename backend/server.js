/**
 * Sharma Mobile Repair - Backend Server
 * Node.js + Express + MongoDB
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { initializeCleanupScheduler } = require('./cleanup-scheduler');
const { uploadsRoot } = require('./utils/fileStorage');

const app = express();
const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/sharma-mobile-repair';

const corsOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim()).filter(Boolean)
    : true;

app.set('trust proxy', 1);
app.use(cors({ origin: corsOrigins }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.use('/uploads', express.static(uploadsRoot));

app.use('/api/accessories', require('./routes/accessories'));
app.use('/api/repair-requests', require('./routes/repairRequests'));
app.use('/api/admin', require('./routes/admin'));

app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Sharma Mobile Repair API is running',
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString()
    });
});

app.use(express.static(path.join(__dirname, '..'), {
    extensions: ['html'],
    dotfiles: 'ignore'
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error'
    });
});

app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found'
    });
});

async function startServer() {
    await mongoose.connect(mongoUri);
    await mongoose.connection.syncIndexes();
    console.log('Connected to MongoDB');

    const server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`API URL: http://localhost:${PORT}/api`);
        initializeCleanupScheduler();
    });

    const shutdown = async signal => {
        console.log(`${signal} received. Shutting down gracefully...`);
        server.close(async () => {
            await mongoose.connection.close();
            process.exit(0);
        });
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));

    return server;
}

if (require.main === module) {
    startServer().catch(error => {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    });
}

module.exports = { app, startServer };
