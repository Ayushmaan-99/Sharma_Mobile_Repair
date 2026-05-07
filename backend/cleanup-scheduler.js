/**
 * Automatic Cleanup Scheduler
 * Deletes repair requests older than 15 days from recycle bin
 */

const cron = require('node-cron');
const RepairRequest = require('./models/RepairRequest');
const fs = require('fs');

/**
 * Clean up old deleted requests
 */
async function cleanupOldRequests() {
    try {
        console.log('Running cleanup job...');
        
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
                    try {
                        fs.unlinkSync(imagePath);
                        console.log(`Deleted image: ${imagePath}`);
                    } catch (err) {
                        console.error(`Failed to delete image: ${imagePath}`, err);
                    }
                }
            });
            
            await RepairRequest.findByIdAndDelete(request._id);
            deletedCount++;
            console.log(`Permanently deleted request: ${request._id}`);
        }
        
        console.log(`Cleanup completed. Deleted ${deletedCount} old repair requests.`);
        
        return deletedCount;
    } catch (error) {
        console.error('Cleanup error:', error);
        throw error;
    }
}

/**
 * Initialize cleanup scheduler
 * Runs every day at 2:00 AM
 */
function initializeCleanupScheduler() {
    // Schedule cleanup to run daily at 2:00 AM
    cron.schedule('0 2 * * *', async () => {
        console.log('Scheduled cleanup started at:', new Date().toISOString());
        try {
            await cleanupOldRequests();
        } catch (error) {
            console.error('Scheduled cleanup failed:', error);
        }
    });
    
    console.log('Cleanup scheduler initialized. Will run daily at 2:00 AM.');
}

module.exports = {
    cleanupOldRequests,
    initializeCleanupScheduler
};
