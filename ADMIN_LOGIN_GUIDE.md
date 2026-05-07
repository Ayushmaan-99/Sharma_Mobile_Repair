# 🔐 Admin Login Setup Guide

## Quick Setup (Choose One Option)

### ⭐ Option 1: MongoDB Atlas (Cloud - Recommended)

**Easiest option - No installation needed!**

#### Step 1: Create MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for free (no credit card required)
3. Create a new cluster (M0 Free tier)
4. Wait 3-5 minutes for cluster creation

#### Step 2: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database password

Example:
```
mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/sharma-mobile-repair
```

#### Step 3: Update .env File
Open `backend/.env` and update:
```
MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/sharma-mobile-repair
```

#### Step 4: Create Admin User
```bash
cd backend
node setup-admin.js
```

#### Step 5: Start Backend Server
```bash
npm start
```

#### Step 6: Login
1. Open `admin.html` in your browser
2. Use these credentials:
   - **Username**: `admin`
   - **Password**: `admin123`

---

### Option 2: Local MongoDB (Advanced)

**Requires MongoDB installation**

#### Step 1: Install MongoDB
- **Windows**: Download from https://www.mongodb.com/try/download/community
- **Mac**: `brew install mongodb-community`
- **Linux**: `sudo apt-get install mongodb`

#### Step 2: Start MongoDB
```bash
# Windows (as Administrator)
net start MongoDB

# Mac/Linux
mongod
```

#### Step 3: Keep Default .env
The `.env` file is already configured for local MongoDB:
```
MONGODB_URI=mongodb://localhost:27017/sharma-mobile-repair
```

#### Step 4: Create Admin User
```bash
cd backend
node setup-admin.js
```

#### Step 5: Start Backend Server
```bash
npm start
```

#### Step 6: Login
1. Open `admin.html` in your browser
2. Use these credentials:
   - **Username**: `admin`
   - **Password**: `admin123`

---

## 🚀 Quick Commands

### Start Everything
```bash
# Terminal 1: Start backend
cd backend
npm start

# Terminal 2: Open admin page
# Just open admin.html in your browser
```

### Create Admin User
```bash
cd backend
node setup-admin.js
```

### Check if Backend is Running
Open in browser: http://localhost:3000/api/health

Should show:
```json
{
  "status": "OK",
  "message": "Sharma Mobile Repair API is running"
}
```

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"

**For MongoDB Atlas:**
- Check your internet connection
- Verify connection string in `.env`
- Make sure you replaced `<password>` with actual password
- Whitelist your IP in MongoDB Atlas (Network Access)

**For Local MongoDB:**
- Make sure MongoDB is running: `mongod`
- Check if port 27017 is available

### "Admin already exists"

If you see this message, the admin user is already created. Just login with:
- Username: `admin`
- Password: `admin123`

If you forgot the password:
1. Delete the admin from MongoDB
2. Run `node setup-admin.js` again

### "Cannot find module"

Run:
```bash
cd backend
npm install
```

### "Port 3000 already in use"

Change PORT in `.env`:
```
PORT=3001
```

---

## 📝 Default Credentials

**Username**: `admin`  
**Password**: `admin123`

⚠️ **IMPORTANT**: Change this password after first login!

---

## ✅ Verification Steps

1. ✅ Backend running: http://localhost:3000/api/health
2. ✅ MongoDB connected: Check terminal for "Connected to MongoDB"
3. ✅ Admin created: Run `node setup-admin.js`
4. ✅ Login works: Open admin.html and login

---

## 🎯 Next Steps After Login

Once logged in, you can:
- View analytics dashboard
- Add accessories
- View repair requests
- Manage website content

---

## 💡 Pro Tips

1. **Use MongoDB Atlas** - It's free and easier than local setup
2. **Keep backend running** - Admin panel needs it to work
3. **Check browser console** - Press F12 to see any errors
4. **Change default password** - For security!

---

## 📞 Need Help?

Check these files:
- `QUICKSTART.md` - General setup
- `README.md` - Complete documentation
- `DEPLOYMENT.md` - Production deployment

---

**Ready to login! 🚀**
