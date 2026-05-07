# 🚀 Quick Installation Guide - Recycle Bin Feature

## Step 1: Install Dependencies

Open Command Prompt and navigate to the backend folder:

```bash
cd backend
npm install node-cron
```

## Step 2: Restart Backend Server

If the backend is running, restart it:

1. **Stop** the current server (Ctrl+C)
2. **Start** again:
   ```bash
   npm start
   ```
   
   Or use the batch file:
   ```bash
   cd ..
   start-backend.bat
   ```

## Step 3: Verify Installation

You should see in the console:
```
✅ Connected to MongoDB
🚀 Server running on port 3000
📍 API URL: http://localhost:3000/api
Cleanup scheduler initialized. Will run daily at 2:00 AM.
```

## Step 4: Test the Feature

1. **Login** to admin panel
2. Go to **"Repair Requests"**
3. Click **delete icon** on any request
4. Go to **"Recycle Bin"** section
5. See the deleted request with days remaining
6. Try **restoring** the request

## ✅ That's It!

The recycle bin feature is now active and will:
- ✅ Move deleted requests to recycle bin
- ✅ Show days remaining (15 days)
- ✅ Allow restoring requests
- ✅ Automatically delete old requests daily at 2 AM

---

## 🔧 Troubleshooting

### "Cannot find module 'node-cron'"
**Solution**: Run `npm install` in the backend folder

### Scheduler not showing in console
**Solution**: Restart the backend server

### Recycle bin not loading
**Solution**: 
- Check backend is running
- Check browser console for errors
- Verify you're logged in as admin

---

**Need help?** See `RECYCLE_BIN_GUIDE.md` for complete documentation.
