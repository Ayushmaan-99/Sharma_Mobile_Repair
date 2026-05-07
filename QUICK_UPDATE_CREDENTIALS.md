# 🚀 Quick Guide: Update Admin Credentials

## Method 1: Admin Panel (When Logged In)

### Change Username
1. Login → Settings
2. Enter current password
3. Enter new username (min 3 chars)
4. Click "Update Username"

### Change Password
1. Login → Settings
2. Enter current password
3. Enter new password (min 6 chars)
4. Confirm new password
5. Click "Update Password"
6. Re-login with new password

---

## Method 2: Update Script (Command Line)

### Quick Steps
1. **Double-click** `update-admin.bat`
2. **Enter new username** (or press Enter to keep current)
3. **Enter new password** (minimum 6 characters)
4. **Confirm password**
5. **Save the credentials** shown on screen

### Manual Command
```bash
cd backend
node update-admin.js
```

---

## 📋 Requirements

### Username
- ✅ Minimum 3 characters
- ✅ Must be unique

### Password
- ✅ Minimum 6 characters
- ✅ Must match confirmation
- ✅ Recommended: Mix of letters, numbers, symbols

---

## 🎯 Current Default Credentials

**Username**: `admin`  
**Password**: `admin123`

⚠️ **IMPORTANT**: Change these default credentials immediately for security!

---

## 🔧 Files Created

- `update-admin.bat` - Easy update script (double-click to run)
- `backend/update-admin.js` - Node.js update script
- `UPDATE_CREDENTIALS_GUIDE.md` - Detailed guide
- Admin panel now has Settings page with change username/password forms

---

## ✅ What's New

### Admin Panel Features
- ✅ Change username form with password verification
- ✅ Change password form with confirmation
- ✅ Password visibility toggles
- ✅ Real-time validation
- ✅ Success/error messages
- ✅ Account information display
- ✅ Security tips

### Backend API
- ✅ `/api/admin/change-username` endpoint
- ✅ `/api/admin/change-password` endpoint
- ✅ JWT authentication required
- ✅ Password verification
- ✅ Input validation
- ✅ Secure bcrypt hashing

### Command Line Tool
- ✅ Interactive update script
- ✅ Current username display
- ✅ Password confirmation
- ✅ Validation checks
- ✅ Success confirmation

---

## 🆘 Quick Troubleshooting

**Forgot password?**  
→ Use `update-admin.bat` to reset

**Can't login?**  
→ Check username/password are correct  
→ Use update script to reset credentials

**Script not working?**  
→ Make sure backend server is NOT running  
→ Check MongoDB connection in `.env` file

---

**Need detailed help?** See `UPDATE_CREDENTIALS_GUIDE.md`
