/**
 * Migration Script - Add isDeleted and deletedAt fields to existing requests
 * Run this once to update existing repair requests in the database
 */

const mongoose = require('mongoose');
require('dotenv').config();

const RepairRequest = require('./models/RepairRequest');

async function migrateExistingRequests() {
    try {
        console.log('\n===========================================');
        console.log('   Migrating Existing Repair Requests');
        console.log('   Adding isDeleted and deletedAt fields');
        console.log('===========================================\n');

        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✓ Connected to MongoDB\n');

        // Find all requests that don't have isDeleted field
        const requests = await RepairRequest.find({
            $or: [
                { isDeleted: { $exists: false } },
                { deletedAt: { $exists: false } }
            ]
        });

        console.log(`Found ${requests.length} requests to update\n`);

        if (requests.length === 0) {
            console.log('✓ All requests already have the required fields!');
            console.log('No migration needed.\n');
            process.exit(0);
        }

        let updatedCount = 0;

        // Update each request
        for (const request of requests) {
            if (request.isDeleted === undefined) {
                request.isDeleted = false;
            }
            if (request.deletedAt === undefined) {
                request.deletedAt = null;
            }
            await request.save();
            updatedCount++;
            console.log(`✓ Updated request ${request._id}`);
        }

        console.log('\n===========================================');
        console.log(`✓ Migration completed successfully!`);
        console.log(`✓ Updated ${updatedCount} repair requests`);
        console.log('===========================================\n');

    } catch (error) {
        console.error('\n❌ Migration error:', error.message);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed.\n');
        process.exit(0);
    }
}

// Run the migration
migrateExistingRequests();
