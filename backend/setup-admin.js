/**
 * Admin Setup Script
 * Run this to create your first admin user
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

async function setupAdmin() {
    try {
        console.log('🔄 Connecting to MongoDB...');
        
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sharma-mobile-repair', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('✅ Connected to MongoDB');
        
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ username: 'admin' });
        
        if (existingAdmin) {
            console.log('⚠️  Admin user already exists!');
            console.log('Username: admin');
            console.log('If you forgot the password, delete the admin from MongoDB and run this script again.');
            process.exit(0);
        }
        
        // Create new admin
        const admin = new Admin({
            username: 'admin',
            password: 'admin123' // Change this password!
        });
        
        await admin.save();
        
        console.log('✅ Admin user created successfully!');
        console.log('');
        console.log('📝 Login Credentials:');
        console.log('   Username: admin');
        console.log('   Password: admin123');
        console.log('');
        console.log('⚠️  IMPORTANT: Change this password after first login!');
        console.log('');
        console.log('🚀 You can now login at: http://localhost:3000/admin.html');
        
        process.exit(0);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        console.log('');
        console.log('💡 Troubleshooting:');
        console.log('   1. Make sure MongoDB is running');
        console.log('   2. Check your MONGODB_URI in .env file');
        console.log('   3. Make sure you have internet connection (for MongoDB Atlas)');
        process.exit(1);
    }
}

setupAdmin();
