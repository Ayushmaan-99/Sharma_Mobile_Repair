# 🚀 Deploy Sharma Mobile Repair Website to Internet

## Complete Step-by-Step Guide for Beginners

This guide will help you deploy your website to the internet **for FREE** using the best platforms.

---

## 🎯 Recommended Deployment Stack (100% FREE)

- **Frontend**: Vercel or Netlify (Free)
- **Backend**: Render.com (Free)
- **Database**: MongoDB Atlas (Free)

**Total Cost: ₹0 per month** ✅

---

## 📋 What You Need Before Starting

1. ✅ GitHub account (create at https://github.com)
2. ✅ Your project files (you already have them)
3. ✅ 30 minutes of time
4. ✅ Internet connection

---

## 🗄️ STEP 1: Setup MongoDB Atlas (Database)

### 1.1 Create MongoDB Atlas Account

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google or Email
3. Choose **FREE** M0 cluster
4. Select region: **Mumbai (ap-south-1)** for India
5. Cluster name: `sharma-mobile-repair`
6. Click **Create Cluster** (takes 3-5 minutes)

### 1.2 Create Database User

1. Click **Database Access** (left sidebar)
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Username: `sharma_admin`
5. Password: Click **Autogenerate Secure Password** (SAVE THIS!)
6. Database User Privileges: **Read and write to any database**
7. Click **Add User**

### 1.3 Allow Network Access

1. Click **Network Access** (left sidebar)
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (0.0.0.0/0)
4. Click **Confirm**

### 1.4 Get Connection String

1. Click **Database** (left sidebar)
2. Click **Connect** button on your cluster
3. Choose **Connect your application**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://sharma_admin:<password>@cluster0.xxxxx.mongodb.net/
   ```
5. Replace `<password>` with your actual password
6. Add database name at the end: `sharma-mobile-repair`
7. **SAVE THIS CONNECTION STRING** - you'll need it!

**Example:**
```
mongodb+srv://sharma_admin:MySecurePass123@cluster0.gwzdirw.mongodb.net/sharma-mobile-repair
```

✅ **MongoDB Setup Complete!**

---

## 📦 STEP 2: Push Your Code to GitHub

### 2.1 Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `sharma-mobile-repair`
3. Description: `Mobile repair shop website`
4. Choose **Public**
5. Click **Create repository**

### 2.2 Push Your Code

Open terminal in your project folder and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Sharma Mobile Repair Website"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/sharma-mobile-repair.git

# Push to GitHub
git branch -M main
git push -u origin main
```

✅ **Code is now on GitHub!**

---

## 🖥️ STEP 3: Deploy Backend to Render.com

### 3.1 Create Render Account

1. Go to: https://render.com
2. Click **Get Started for Free**
3. Sign up with GitHub (recommended)
4. Authorize Render to access your repositories

### 3.2 Create Web Service

1. Click **New +** → **Web Service**
2. Connect your GitHub repository: `sharma-mobile-repair`
3. Click **Connect**

### 3.3 Configure Web Service

Fill in these details:

- **Name**: `sharma-mobile-repair-api`
- **Region**: `Singapore` (closest to India)
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: `Free`

### 3.4 Add Environment Variables

Click **Advanced** → **Add Environment Variable**

Add these variables:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your MongoDB connection string from Step 1.4 |
| `JWT_SECRET` | `sharma_mobile_repair_secret_key_2024` |
| `PORT` | `3000` |
| `NODE_ENV` | `production` |

### 3.5 Deploy

1. Click **Create Web Service**
2. Wait 5-10 minutes for deployment
3. Once deployed, you'll see: **Your service is live 🎉**
4. Copy your backend URL (looks like): `https://sharma-mobile-repair-api.onrender.com`

### 3.6 Create Admin User

After deployment, create admin user:

1. Go to your Render dashboard
2. Click on your service
3. Click **Shell** tab
4. Run this command:

```bash
node setup-admin.js
```

When prompted:
- Username: `admin`
- Password: `admin123` (or your preferred password)

✅ **Backend is Live!**

---

## 🌐 STEP 4: Deploy Frontend to Vercel

### 4.1 Update API URL

Before deploying frontend, update the API URL:

1. Open `js/config.js` in your project
2. Change `API_BASE_URL` to your Render backend URL:

```javascript
const CONFIG = {
    API_BASE_URL: 'https://sharma-mobile-repair-api.onrender.com/api',
    // ... rest of config
};
```

3. Save the file
4. Commit and push to GitHub:

```bash
git add js/config.js
git commit -m "Update API URL for production"
git push origin main
```

### 4.2 Create Vercel Account

1. Go to: https://vercel.com/signup
2. Click **Continue with GitHub**
3. Authorize Vercel

### 4.3 Deploy Frontend

1. Click **Add New...** → **Project**
2. Import your repository: `sharma-mobile-repair`
3. Click **Import**

### 4.4 Configure Project

- **Framework Preset**: `Other`
- **Root Directory**: `./` (leave as is)
- **Build Command**: (leave empty)
- **Output Directory**: (leave empty)
- **Install Command**: (leave empty)

### 4.5 Deploy

1. Click **Deploy**
2. Wait 2-3 minutes
3. You'll see: **Congratulations! 🎉**
4. Click **Visit** to see your live website!

Your website URL will be: `https://sharma-mobile-repair.vercel.app`

✅ **Frontend is Live!**

---

## 🎨 STEP 5: Add Custom Domain (Optional)

### Option A: Use Free Subdomain

Your site is already live at:
- Frontend: `https://sharma-mobile-repair.vercel.app`
- Backend: `https://sharma-mobile-repair-api.onrender.com`

### Option B: Buy Custom Domain

1. Buy domain from:
   - **Namecheap**: https://www.namecheap.com (~₹500/year)
   - **GoDaddy**: https://www.godaddy.com (~₹700/year)
   - **Hostinger**: https://www.hostinger.in (~₹400/year)

2. Add domain to Vercel:
   - Go to Vercel dashboard
   - Click your project
   - Go to **Settings** → **Domains**
   - Add your domain
   - Update DNS records as instructed

---

## ✅ STEP 6: Test Your Live Website

### 6.1 Test Frontend

1. Visit: `https://sharma-mobile-repair.vercel.app`
2. Check all sections load correctly
3. Test repair request form
4. Upload test images

### 6.2 Test Admin Panel

1. Visit: `https://sharma-mobile-repair.vercel.app/admin.html`
2. Login with:
   - Username: `admin`
   - Password: `admin123` (or what you set)
3. Check all sections work
4. Test adding accessories
5. Check repair requests appear

### 6.3 Test Backend API

Open browser and visit:
```
https://sharma-mobile-repair-api.onrender.com/api/health
```

You should see:
```json
{
    "status": "OK",
    "message": "Sharma Mobile Repair API is running",
    "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## 🔒 STEP 7: Security (IMPORTANT!)

### 7.1 Change Admin Password

1. Login to admin panel
2. Go to **Settings**
3. Change password to something strong
4. Example: `Sharma@Mobile#2024!`

### 7.2 Update JWT Secret

1. Go to Render dashboard
2. Click your service
3. Go to **Environment**
4. Change `JWT_SECRET` to a random string
5. Click **Save Changes**
6. Service will restart automatically

### 7.3 Enable CORS (Already configured)

Your backend already has CORS enabled for all origins. For production, you can restrict it:

Edit `backend/server.js`:
```javascript
app.use(cors({
    origin: 'https://sharma-mobile-repair.vercel.app'
}));
```

---

## 📱 STEP 8: Share Your Website

Your website is now live! Share it:

### Website URLs:
- **Main Website**: `https://sharma-mobile-repair.vercel.app`
- **Admin Panel**: `https://sharma-mobile-repair.vercel.app/admin.html`

### Share on:
- WhatsApp Business
- Facebook Page
- Instagram Bio
- Google My Business
- Print on business cards

---

## 🔄 How to Update Your Website

When you make changes:

1. Edit files locally
2. Test locally
3. Commit changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```
4. **Vercel** will auto-deploy frontend (2-3 minutes)
5. **Render** will auto-deploy backend (5-10 minutes)

---

## 💰 Cost Breakdown

| Service | Plan | Cost |
|---------|------|------|
| MongoDB Atlas | M0 Free | ₹0 |
| Render.com | Free | ₹0 |
| Vercel | Hobby | ₹0 |
| **Total** | | **₹0/month** |

### Free Tier Limits:
- **MongoDB**: 512 MB storage (enough for 1000s of requests)
- **Render**: 750 hours/month (always on)
- **Vercel**: Unlimited bandwidth

---

## 🐛 Troubleshooting

### Problem: Backend shows "Service Unavailable"
**Solution**: Render free tier sleeps after 15 minutes of inactivity. First request takes 30-60 seconds to wake up. This is normal.

### Problem: Images not uploading
**Solution**: 
1. Check file size is under 5MB
2. Render free tier has limited storage
3. Consider using Cloudinary for images (free tier available)

### Problem: Admin login fails
**Solution**:
1. Check you created admin user (Step 3.6)
2. Verify username and password
3. Check browser console for errors

### Problem: CORS errors
**Solution**:
1. Verify API_BASE_URL in `js/config.js` is correct
2. Check backend is running
3. Clear browser cache

### Problem: MongoDB connection fails
**Solution**:
1. Check connection string is correct
2. Verify password doesn't have special characters (URL encode if needed)
3. Check Network Access allows 0.0.0.0/0

---

## 📞 Need Help?

### Check Logs:

**Render Backend Logs:**
1. Go to Render dashboard
2. Click your service
3. Click **Logs** tab

**Vercel Frontend Logs:**
1. Go to Vercel dashboard
2. Click your project
3. Click **Deployments**
4. Click latest deployment
5. View build logs

---

## 🎉 Congratulations!

Your Sharma Mobile Repair website is now **LIVE ON THE INTERNET**! 🌐

### What You've Accomplished:
✅ Professional website deployed
✅ Admin panel for managing business
✅ Database for storing customer requests
✅ Image upload functionality
✅ Responsive design for all devices
✅ Secure authentication system
✅ Automatic recycle bin cleanup

### Next Steps:
1. Share your website URL with customers
2. Add website to Google My Business
3. Create social media accounts
4. Start receiving repair requests online!

---

**Your Live URLs:**
- 🌐 Website: `https://sharma-mobile-repair.vercel.app`
- 👨‍💼 Admin: `https://sharma-mobile-repair.vercel.app/admin.html`
- 🔧 API: `https://sharma-mobile-repair-api.onrender.com/api`

**Deployment Date:** May 7, 2026
**Status:** ✅ LIVE AND RUNNING

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)

---

**Made with ❤️ for Sharma Mobile Repair**
