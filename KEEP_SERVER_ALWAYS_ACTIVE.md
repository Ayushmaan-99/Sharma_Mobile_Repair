# 🚀 Keep Server Always Active

## Options for Keeping Your Server Running 24/7

---

## 🌐 OPTION 1: Deploy to Internet (RECOMMENDED) ⭐

**Best solution:** Deploy your website to the internet so it's always online!

### Benefits:
- ✅ Server runs 24/7 automatically
- ✅ Accessible from anywhere
- ✅ No need to keep your computer on
- ✅ Professional and reliable
- ✅ **100% FREE** with the platforms I recommended

### How to Deploy:

**You already have all the guides ready!**

1. **Read:** `START_DEPLOYMENT_HERE.md`
2. **Follow:** `DEPLOY_TO_INTERNET.md`
3. **Time:** 30 minutes
4. **Cost:** ₹0/month (FREE)

**Platforms:**
- Frontend: Vercel (FREE, always on)
- Backend: Render.com (FREE, always on)
- Database: MongoDB Atlas (already set up!)

**After deployment:**
- Your website will be live 24/7
- Backend runs automatically
- No need to keep your computer on
- Access from anywhere: `https://your-site.vercel.app`

---

## 💻 OPTION 2: Keep Running on Your Computer

If you want to keep it running locally on your computer:

### Method A: Use PM2 (Process Manager) ⭐ BEST FOR LOCAL

PM2 keeps your Node.js server running even if it crashes.

#### Install PM2:

```bash
npm install -g pm2
```

#### Start Backend with PM2:

```bash
cd backend
pm2 start server.js --name sharma-mobile-repair
```

#### Useful PM2 Commands:

```bash
# View running processes
pm2 list

# View logs
pm2 logs sharma-mobile-repair

# Stop server
pm2 stop sharma-mobile-repair

# Restart server
pm2 restart sharma-mobile-repair

# Delete from PM2
pm2 delete sharma-mobile-repair

# Save PM2 configuration
pm2 save

# Start PM2 on system boot (Windows)
pm2 startup
```

#### Auto-start on Computer Restart:

```bash
# After starting your server with PM2
pm2 save

# Setup startup script
pm2 startup
```

**Benefits:**
- ✅ Auto-restarts if server crashes
- ✅ Runs in background
- ✅ Can start on computer boot
- ✅ Easy to manage

**Limitations:**
- ❌ Computer must stay on
- ❌ Only accessible on your network
- ❌ Uses your computer resources

---

### Method B: Windows Service (Advanced)

Convert your Node.js app to a Windows service.

#### Using node-windows:

1. **Install node-windows:**
   ```bash
   npm install -g node-windows
   ```

2. **Create service script** (`install-service.js`):
   ```javascript
   var Service = require('node-windows').Service;

   var svc = new Service({
     name: 'Sharma Mobile Repair',
     description: 'Sharma Mobile Repair Backend Server',
     script: 'D:\\Mobile Repair\\backend\\server.js',
     nodeOptions: [
       '--harmony',
       '--max_old_space_size=4096'
     ]
   });

   svc.on('install', function(){
     svc.start();
   });

   svc.install();
   ```

3. **Run as Administrator:**
   ```bash
   node install-service.js
   ```

**Benefits:**
- ✅ Runs as Windows service
- ✅ Starts automatically on boot
- ✅ Runs even when not logged in

**Limitations:**
- ❌ More complex setup
- ❌ Computer must stay on
- ❌ Requires administrator privileges

---

### Method C: Task Scheduler (Windows)

Use Windows Task Scheduler to start server on boot.

#### Steps:

1. **Create batch file** (`start-server-background.bat`):
   ```batch
   @echo off
   cd /d "D:\Mobile Repair\backend"
   start /min node server.js
   ```

2. **Open Task Scheduler:**
   - Press `Win + R`
   - Type: `taskschd.msc`
   - Press Enter

3. **Create Basic Task:**
   - Click "Create Basic Task"
   - Name: "Sharma Mobile Repair Server"
   - Trigger: "When the computer starts"
   - Action: "Start a program"
   - Program: `D:\Mobile Repair\start-server-background.bat`
   - Finish

**Benefits:**
- ✅ Starts on boot
- ✅ No additional software needed

**Limitations:**
- ❌ No auto-restart on crash
- ❌ Computer must stay on

---

## 🔄 OPTION 3: Hybrid Approach

**Best of both worlds:**

1. **Deploy to internet** for 24/7 access
2. **Keep local server** for development/testing

### Setup:

**Production (Online):**
- Deploy to Vercel + Render (always active)
- Use for customers and real usage
- URL: `https://sharma-mobile-repair.vercel.app`

**Development (Local):**
- Run locally with PM2 when developing
- Test new features before deploying
- URL: `http://localhost:3000`

---

## 📊 Comparison

| Method | Always On | No Computer Needed | Free | Easy Setup | Recommended |
|--------|-----------|-------------------|------|------------|-------------|
| **Deploy Online** | ✅ | ✅ | ✅ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **PM2** | ⚠️* | ❌ | ✅ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Windows Service** | ⚠️* | ❌ | ✅ | ⭐⭐ | ⭐⭐ |
| **Task Scheduler** | ⚠️* | ❌ | ✅ | ⭐⭐⭐ | ⭐ |

*⚠️ = Only while computer is on

---

## 🎯 My Recommendation

### For Your Business: DEPLOY ONLINE ⭐

**Why?**
1. **Professional:** Customers can access 24/7
2. **Reliable:** No downtime when computer is off
3. **Free:** Costs ₹0/month
4. **Easy:** 30-minute setup
5. **Scalable:** Can handle more traffic

**How?**
- Follow `DEPLOY_TO_INTERNET.md`
- Your backend will run on Render.com (always active)
- Your website will be on Vercel (always active)
- MongoDB Atlas is already set up!

### For Development: Use PM2

While developing new features:
```bash
pm2 start server.js --name sharma-mobile-repair-dev
```

---

## 🚀 Quick Start: Deploy Online (30 Minutes)

Since you want the server always active, let's deploy it online:

### Step 1: Push to GitHub (5 min)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/sharma-mobile-repair.git
git push -u origin main
```

### Step 2: Deploy Backend to Render (10 min)
1. Go to render.com
2. Sign up with GitHub
3. New Web Service
4. Connect repository
5. Configure (already documented in guides)
6. Deploy

### Step 3: Deploy Frontend to Vercel (5 min)
1. Go to vercel.com
2. Sign up with GitHub
3. Import project
4. Deploy

### Step 4: Test (5 min)
- Visit your live website
- Test admin login
- Everything works 24/7!

**Detailed guide:** `DEPLOY_TO_INTERNET.md`

---

## 💡 Quick Setup: PM2 (If You Want Local)

If you prefer to keep it running on your computer:

### Install PM2:
```bash
npm install -g pm2
```

### Start Server:
```bash
cd backend
pm2 start server.js --name sharma-mobile-repair
pm2 save
```

### View Status:
```bash
pm2 list
```

### View Logs:
```bash
pm2 logs
```

### Stop Server:
```bash
pm2 stop sharma-mobile-repair
```

**Done!** Server will keep running and auto-restart if it crashes.

---

## 🔧 Troubleshooting

### PM2: "pm2: command not found"

**Solution:**
```bash
npm install -g pm2
```

If still not working:
```bash
npm config get prefix
# Add the output path to your system PATH
```

### PM2: Server not starting

**Solution:**
```bash
# Check logs
pm2 logs sharma-mobile-repair

# Restart
pm2 restart sharma-mobile-repair

# Delete and recreate
pm2 delete sharma-mobile-repair
pm2 start server.js --name sharma-mobile-repair
```

### Windows Service: Permission denied

**Solution:**
- Run Command Prompt as Administrator
- Then run the install script

---

## 📞 What Do You Want?

**Choose your path:**

### Path A: Deploy Online (Recommended)
- ✅ Server always active 24/7
- ✅ Accessible from anywhere
- ✅ No computer needed
- ✅ Free
- 📖 **Read:** `DEPLOY_TO_INTERNET.md`

### Path B: Keep Local with PM2
- ✅ Server runs on your computer
- ✅ Auto-restarts on crash
- ⚠️ Computer must stay on
- 📖 **Follow:** PM2 instructions above

### Path C: Both (Best)
- ✅ Online for customers (24/7)
- ✅ Local for development
- 📖 **Do:** Deploy online + use PM2 locally

---

## 🎯 Summary

**For always active server:**

**Best Option:** Deploy to internet
- Time: 30 minutes
- Cost: Free
- Result: Always online 24/7

**Alternative:** Use PM2 locally
- Time: 5 minutes
- Cost: Free
- Result: Runs while computer is on

**My Recommendation:** Deploy online! Your business deserves a professional, always-available website.

---

**Created:** May 7, 2026
**Topic:** Keep server always active
**Recommendation:** Deploy to internet (FREE, 24/7)
