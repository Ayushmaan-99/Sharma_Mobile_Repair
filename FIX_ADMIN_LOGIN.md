# 🔧 Fix Admin Login Issue

## Problem Identified

**Your backend server is NOT running!** ❌

The admin panel cannot connect to the backend API because the server is not started.

---

## ✅ Solution: Start the Backend Server

### Step 1: Open Terminal in Backend Folder

1. Open a **new terminal/command prompt**
2. Navigate to backend folder:
   ```bash
   cd backend
   ```

### Step 2: Install Dependencies (if not done)

```bash
npm install
```

### Step 3: Start the Backend Server

```bash
npm start
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on port 3000
📍 API URL: http://localhost:3000/api
```

### Step 4: Keep Terminal Open

**IMPORTANT:** Keep this terminal window open! The backend must keep running.

---

## 🔐 Create Admin User (First Time Only)

If you haven't created an admin user yet:

### Option 1: Using the Setup Script (Recommended)

1. Open **another terminal** (keep the first one running!)
2. Navigate to backend:
   ```bash
   cd backend
   ```
3. Run setup script:
   ```bash
   node setup-admin.js
   ```
4. Enter credentials:
   - Username: `admin`
   - Password: `admin123` (or your preferred password)

### Option 2: Using the Batch File (Windows)

Double-click `create-admin.bat` in the project root folder.

### Option 3: Using API Call

Open a **new terminal** and run:

```bash
curl -X POST http://localhost:3000/api/admin/create -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"password\":\"admin123\"}"
```

Or use PowerShell:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/admin/create" -Method POST -ContentType "application/json" -Body '{"username":"admin","password":"admin123"}'
```

---

## 🌐 Test Admin Login

### Step 1: Open Admin Panel

1. Open your browser
2. Go to: `http://localhost:3000` or open `admin.html` directly
3. Navigate to admin panel: `/admin.html`

### Step 2: Login

- **Username:** `admin`
- **Password:** `admin123` (or what you set)

### Step 3: Success!

You should now be logged in and see the admin dashboard! 🎉

---

## 🐛 Troubleshooting

### Issue 1: "Port 3000 is already in use"

**Solution:**

**Option A - Kill the process:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Or use PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
```

**Option B - Use different port:**
1. Edit `backend/.env`
2. Change `PORT=3000` to `PORT=3001`
3. Update `js/config.js`:
   ```javascript
   API_BASE_URL: 'http://localhost:3001/api'
   ```
4. Restart backend

### Issue 2: "Cannot connect to MongoDB"

**Check your connection string in `backend/.env`:**

```env
MONGODB_URI=mongodb+srv://kanxakk0_db_user:Ayushmaan%4099@cluster0.gwzdirw.mongodb.net/sharma-mobile-repair?retryWrites=true&w=majority
```

**Verify:**
- ✅ Password is correct
- ✅ Special characters are URL-encoded (`@` = `%40`)
- ✅ Database name is included
- ✅ Network access allows your IP (0.0.0.0/0)

### Issue 3: "Admin already exists"

This means admin user is already created. Just try logging in with:
- Username: `admin`
- Password: `admin123`

If you forgot the password, see "Reset Admin Password" below.

### Issue 4: "Invalid credentials"

**Possible causes:**
1. Wrong username or password
2. Admin user not created yet
3. Backend not connected to database

**Solution:**
1. Make sure backend is running
2. Check backend terminal for errors
3. Try creating admin user again
4. Check MongoDB connection

### Issue 5: Backend starts but crashes immediately

**Check for errors in terminal:**

Common issues:
- Missing dependencies: Run `npm install` in backend folder
- MongoDB connection failed: Check connection string
- Port already in use: Use different port

---

## 🔄 Reset Admin Password

If you forgot your admin password:

### Method 1: Using Update Script

1. Open terminal in backend folder
2. Run:
   ```bash
   node update-admin.js
   ```
3. Enter new credentials

### Method 2: Using Batch File (Windows)

Double-click `update-admin.bat`

### Method 3: Delete and Recreate

1. Delete admin from MongoDB Atlas:
   - Go to MongoDB Atlas dashboard
   - Browse Collections
   - Find `admins` collection
   - Delete the admin document

2. Create new admin:
   ```bash
   node setup-admin.js
   ```

---

## 📋 Quick Checklist

Before trying to login, verify:

- [ ] Backend server is running (`npm start` in backend folder)
- [ ] Terminal shows "Connected to MongoDB"
- [ ] Terminal shows "Server running on port 3000"
- [ ] Admin user has been created
- [ ] Using correct username and password
- [ ] Browser can access `http://localhost:3000/api/health`

---

## 🔍 Verify Backend is Working

### Test 1: Health Check

Open browser and go to:
```
http://localhost:3000/api/health
```

You should see:
```json
{
  "status": "OK",
  "message": "Sharma Mobile Repair API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Test 2: Check Admin Login Endpoint

Open browser console (F12) and run:

```javascript
fetch('http://localhost:3000/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'admin', password: 'admin123' })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

**Success response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "admin"
}
```

**Error response:**
```json
{
  "error": "Invalid credentials"
}
```

---

## 🚀 Complete Startup Process

### Every time you want to use the admin panel:

1. **Start Backend:**
   ```bash
   cd backend
   npm start
   ```
   Keep this terminal open!

2. **Open Admin Panel:**
   - Open `admin.html` in browser
   - Or go to `http://localhost:3000/admin.html` if serving from backend

3. **Login:**
   - Username: `admin`
   - Password: `admin123`

4. **Done!** ✅

---

## 💡 Pro Tips

### Tip 1: Use Batch Files (Windows)

Create `start-backend.bat` in project root:
```batch
@echo off
cd backend
npm start
pause
```

Double-click to start backend easily!

### Tip 2: Keep Backend Running

While developing, keep the backend terminal open and running. Don't close it!

### Tip 3: Check Logs

If something goes wrong, check the backend terminal for error messages.

### Tip 4: Use PM2 for Production

For production/deployment, use PM2 to keep backend running:
```bash
npm install -g pm2
cd backend
pm2 start server.js --name sharma-mobile-repair
pm2 save
```

---

## 📞 Still Having Issues?

### Check Backend Logs

Look at the backend terminal for error messages. Common errors:

1. **"EADDRINUSE"** - Port already in use
2. **"MongoNetworkError"** - Cannot connect to MongoDB
3. **"JWT_SECRET not defined"** - Missing environment variable
4. **"Cannot find module"** - Missing dependencies

### Get More Help

1. Check `ADMIN_LOGIN_GUIDE.md` for detailed login instructions
2. Check `backend/server.js` logs for errors
3. Verify all environment variables in `backend/.env`
4. Make sure MongoDB Atlas is accessible

---

## ✅ Success Checklist

You'll know everything is working when:

- [ ] Backend terminal shows "Server running on port 3000"
- [ ] Backend terminal shows "Connected to MongoDB"
- [ ] `http://localhost:3000/api/health` returns OK
- [ ] Admin panel loads without errors
- [ ] Can login with username and password
- [ ] Dashboard shows after login

---

## 🎉 Summary

**The main issue:** Backend server was not running.

**The solution:** 
1. Start backend: `cd backend && npm start`
2. Create admin user: `node setup-admin.js`
3. Login with credentials

**Remember:** Backend must be running for admin panel to work!

---

**Created:** May 7, 2026
**Issue:** Cannot login to admin panel
**Status:** ✅ SOLUTION PROVIDED
