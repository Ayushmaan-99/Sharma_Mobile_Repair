/**
 * Update Admin Credentials Script
 * Sharma Mobile Repair
 * 
 * This script allows you to update the admin username and password
 */

const mongoose = require('mongoose');
const readline = require('readline');
require('dotenv').config();

const Admin = require('./models/Admin');

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Promisify readline question
function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function updateAdmin() {
    try {
        console.log('\n===========================================');
        console.log('   Update Admin Credentials');
        console.log('   Sharma Mobile Repair');
        console.log('===========================================\n');

        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sharma-mobile-repair');
        await mongoose.connection.syncIndexes();
        console.log('✓ Connected to MongoDB\n');

        // Get current admin
        const currentAdmin = await Admin.findOne();
        
        if (!currentAdmin) {
            console.log('❌ No admin user found in database!');
            console.log('Please run setup-admin.js first to create an admin user.\n');
            process.exit(1);
        }

        console.log(`Current admin username: ${currentAdmin.username}\n`);

        // Ask for new credentials
        const newUsername = await question('Enter new username (or press Enter to keep current): ');
        const newPassword = await question('Enter new password (minimum 8 characters): ');
        const confirmPassword = await question('Confirm new password: ');

        // Validate password
        if (!newPassword || newPassword.length < 8) {
            console.log('\nPassword must be at least 8 characters long!');
            process.exit(1);
        }

        if (newPassword !== confirmPassword) {
            console.log('\n❌ Passwords do not match!');
            process.exit(1);
        }

        // Update credentials
        if (newUsername && newUsername.trim() !== '') {
            currentAdmin.username = newUsername.trim();
        }
        currentAdmin.password = newPassword;

        await currentAdmin.save();

        console.log('\n✓ Admin credentials updated successfully!');
        console.log('\n===========================================');
        console.log('   Updated Credentials');
        console.log('===========================================');
        console.log(`Username: ${currentAdmin.username}`);
        console.log(`Password: ${newPassword}`);
        console.log('===========================================\n');
        console.log('⚠️  IMPORTANT: Save these credentials securely!');
        console.log('You can now login with these new credentials.\n');

    } catch (error) {
        console.error('\n❌ Error updating admin:', error.message);
        process.exit(1);
    } finally {
        rl.close();
        await mongoose.connection.close();
        process.exit(0);
    }
}

// Run the script
updateAdmin();
