# 🔐 Update Admin Credentials Guide
## Sharma Mobile Repair

This guide explains how to update your admin username and password.

---

## 📋 Two Methods Available

### Method 1: Using the Admin Panel (Recommended)
Update credentials while logged into the admin panel

### Method 2: Using Update Script
Update credentials directly via command line

---

## 🎯 Method 1: Admin Panel (Web Interface)

### Change Username

1. **Login** to the admin panel
2. Click **"Settings"** in the sidebar
3. Find the **"Change Username"** section
4. Enter your **current password** (for verification)
5. Enter your **new username** (minimum 3 characters)
6. Click **"Update Username"**
7. Your username will be updated immediately

**Requirements:**
- ✅ Current password required
- ✅ New username must be at least 3 characters
- ✅ Username must be unique

### Change Password

1. **Login** to the admin panel
2. Click **"Settings"** in the sidebar
3. Find the **"Change Password"** section
4. Enter your **current password**
5. Enter your **new password** (minimum 6 characters)
6. **Confirm** your new password
7. Click **"Update Password"**
8. You'll be logged out automatically
9. Login again with your new password

**Requirements:**
- ✅ Current password required
- ✅ New password must be at least 6 characters
- ✅ New password must match confirmation

---

## 🖥️ Method 2: Update Script (Command Line)

### When to Use This Method
- You forgot your current password
- You can't access the admin panel
- You need to reset credentials quickly
- Initial setup or troubleshooting

### Steps to Update Credentials

#### Option A: Using Batch File (Windows)

1. **Double-click** `update-admin.bat` in the project root folder

2. The script will:
   - Connect to MongoDB
   - Show your current username
   - Ask for new credentials

3. **Follow the prompts:**
   ```
   Enter new username (or press Enter to keep current): mynewusername
   Enter new password (minimum 6 characters): mynewpassword123
   Confirm new password: mynewpassword123
   ```

4. **Save the credentials** shown on screen

5. **Login** with your new credentials

#### Option B: Using Command Line

1. **Open Command Prompt** or Terminal

2. **Navigate** to the backend folder:
   ```bash
   cd backend
   ```

3. **Run the script:**
   ```bash
   node update-admin.js
   ```

4. **Follow the prompts** as shown above

---

## 📝 Important Notes

### Username Requirements
- **Minimum Length**: 3 characters
- **Allowed Characters**: Letters, numbers, underscores
- **Case Sensitive**: "Admin" and "admin" are different
- **Must be Unique**: Cannot use an existing username

### Password Requirements
- **Minimum Length**: 6 characters
- **Recommended**: 8+ characters with mix of:
  - Uppercase letters (A-Z)
  - Lowercase letters (a-z)
  - Numbers (0-9)
  - Special characters (!@#$%^&*)

### Security Best Practices
- ✅ Use strong, unique passwords
- ✅ Don't share your credentials
- ✅ Change password regularly (every 3-6 months)
- ✅ Use different passwords for different accounts
- ✅ Store credentials securely (password manager)
- ✅ Never write passwords in plain text files

---

## 🔄 What Happens After Update

### After Changing Username
- ✅ Username updated in database
- ✅ UI updated immediately (if using admin panel)
- ✅ Can continue using the admin panel
- ✅ Next login requires new username

### After Changing Password
- ✅ Password updated in database (encrypted with bcrypt)
- ✅ Automatically logged out (security measure)
- ✅ Must login with new password
- ✅ Old password no longer works

---

## 🐛 Troubleshooting

### "Current password is incorrect"
**Problem**: Wrong password entered  
**Solution**: 
- Double-check your current password
- Use the password visibility toggle
- If forgotten, use Method 2 (update script)

### "Username already taken"
**Problem**: Username exists in database  
**Solution**: Choose a different username

### "Password must be at least 6 characters long"
**Problem**: New password too short  
**Solution**: Use a longer password (6+ characters)

### "Passwords do not match"
**Problem**: Password confirmation doesn't match  
**Solution**: Carefully re-enter both password fields

### "Failed to connect to MongoDB"
**Problem**: Database connection issue  
**Solution**: 
- Ensure MongoDB is running
- Check `.env` file has correct MONGODB_URI
- Verify internet connection (for MongoDB Atlas)

### "No admin user found"
**Problem**: No admin exists in database  
**Solution**: Run `create-admin.bat` first to create an admin

---

## 🔒 Security Features

### Password Encryption
- Passwords stored using **bcrypt** hashing
- Salt rounds: 10
- Never stored in plain text
- Cannot be reversed or decrypted

### Authentication
- **JWT tokens** for session management
- Token expiration: 24 hours
- Secure token verification
- Authorization required for all updates

### Validation
- Server-side validation for all inputs
- Minimum length requirements enforced
- Password confirmation required
- Current password verification required

---

## 📊 API Endpoints

### Change Username
```
POST /api/admin/change-username
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "current_password",
  "newUsername": "new_username"
}
```

### Change Password
```
POST /api/admin/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "current_password",
  "newPassword": "new_password"
}
```

---

## 📁 Related Files

### Frontend
- `admin.html` - Settings page UI
- `js/admin.js` - Change credentials logic
- `js/config.js` - API endpoint configuration

### Backend
- `backend/routes/admin.js` - API endpoints
- `backend/models/Admin.js` - Admin model with password hashing
- `backend/update-admin.js` - Update script

### Scripts
- `update-admin.bat` - Windows batch file for easy updates
- `create-admin.bat` - Create new admin user

---

## ✅ Quick Reference

### Change Username (Admin Panel)
1. Settings → Change Username
2. Enter current password
3. Enter new username
4. Click Update Username

### Change Password (Admin Panel)
1. Settings → Change Password
2. Enter current password
3. Enter new password
4. Confirm new password
5. Click Update Password
6. Re-login with new password

### Reset Credentials (Script)
1. Run `update-admin.bat`
2. Follow prompts
3. Save new credentials
4. Login with new credentials

---

## 🆘 Need Help?

If you're having trouble updating your credentials:

1. **Check this guide** for troubleshooting steps
2. **Verify MongoDB connection** is working
3. **Check backend logs** for error messages
4. **Try the update script** if admin panel doesn't work
5. **Contact system administrator** if issues persist

---

## 📞 Support Commands

### Check if admin exists:
```bash
cd backend
node -e "require('dotenv').config(); const mongoose = require('mongoose'); const Admin = require('./models/Admin'); mongoose.connect(process.env.MONGODB_URI).then(async () => { const admin = await Admin.findOne(); console.log('Admin:', admin ? admin.username : 'Not found'); process.exit(); });"
```

### View current username:
```bash
cd backend
node update-admin.js
# Press Ctrl+C when you see the current username
```

---

**Last Updated**: May 7, 2026  
**Version**: 2.0  
**Status**: ✅ Fully Implemented

## 🎉 Summary

You now have **two convenient ways** to update your admin credentials:

1. **Admin Panel** - Easy web interface (when logged in)
2. **Update Script** - Command line tool (when you need to reset)

Both methods are secure, validated, and easy to use!
