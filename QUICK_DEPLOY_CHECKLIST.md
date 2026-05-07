# ⚡ Quick Deployment Checklist

## 30-Minute Deployment Guide

### ☑️ Pre-Deployment Checklist

- [ ] All files are ready and tested locally
- [ ] Admin login works locally
- [ ] Repair request submission works
- [ ] Images upload successfully
- [ ] All sections display correctly

---

## 🚀 Deployment Steps (30 minutes)

### Step 1: MongoDB Atlas (5 minutes)
- [ ] Create account at mongodb.com/cloud/atlas
- [ ] Create FREE M0 cluster (Mumbai region)
- [ ] Create database user (save password!)
- [ ] Allow access from anywhere (0.0.0.0/0)
- [ ] Copy connection string
- [ ] Add database name: `sharma-mobile-repair`

**Connection String Format:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sharma-mobile-repair
```

---

### Step 2: GitHub (5 minutes)
- [ ] Create repository at github.com/new
- [ ] Name: `sharma-mobile-repair`
- [ ] Push code:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/sharma-mobile-repair.git
git push -u origin main
```

---

### Step 3: Backend - Render.com (10 minutes)
- [ ] Sign up at render.com with GitHub
- [ ] New → Web Service
- [ ] Connect repository
- [ ] Configure:
  - Name: `sharma-mobile-repair-api`
  - Root Directory: `backend`
  - Build: `npm install`
  - Start: `npm start`
  - Instance: Free
- [ ] Add Environment Variables:
  - `MONGODB_URI`: (your connection string)
  - `JWT_SECRET`: `sharma_mobile_repair_secret_2024`
  - `PORT`: `3000`
  - `NODE_ENV`: `production`
- [ ] Click Deploy
- [ ] Wait 5-10 minutes
- [ ] Copy backend URL: `https://sharma-mobile-repair-api.onrender.com`
- [ ] Create admin user via Shell: `node setup-admin.js`

---

### Step 4: Frontend - Vercel (5 minutes)
- [ ] Update `js/config.js` with backend URL:
```javascript
API_BASE_URL: 'https://sharma-mobile-repair-api.onrender.com/api'
```
- [ ] Commit and push:
```bash
git add js/config.js
git commit -m "Update API URL"
git push origin main
```
- [ ] Sign up at vercel.com with GitHub
- [ ] New Project → Import repository
- [ ] Click Deploy
- [ ] Wait 2-3 minutes
- [ ] Copy frontend URL: `https://sharma-mobile-repair.vercel.app`

---

### Step 5: Test Everything (5 minutes)
- [ ] Visit frontend URL
- [ ] Test repair request form
- [ ] Upload test image
- [ ] Login to admin panel: `/admin.html`
- [ ] Check repair requests appear
- [ ] Test adding accessory
- [ ] Change admin password in Settings

---

## ✅ Success Checklist

After deployment, verify:

- [ ] Frontend loads without errors
- [ ] All images and styles load
- [ ] Repair form submits successfully
- [ ] Admin login works
- [ ] Can view repair requests in admin
- [ ] Can add/edit/delete accessories
- [ ] Recycle bin works
- [ ] Settings page works
- [ ] Mobile responsive design works

---

## 🔗 Your Live URLs

After deployment, save these:

| Service | URL | Purpose |
|---------|-----|---------|
| **Website** | `https://sharma-mobile-repair.vercel.app` | Customer-facing site |
| **Admin Panel** | `https://sharma-mobile-repair.vercel.app/admin.html` | Admin dashboard |
| **Backend API** | `https://sharma-mobile-repair-api.onrender.com/api` | API endpoint |
| **Health Check** | `https://sharma-mobile-repair-api.onrender.com/api/health` | Check if API is running |

---

## 🔒 Security Checklist (Do Immediately!)

- [ ] Change admin password (Settings page)
- [ ] Update JWT_SECRET to random string
- [ ] Save all passwords in safe place
- [ ] Don't share admin credentials
- [ ] Enable 2FA on GitHub, Vercel, Render

---

## 📱 Share Your Website

After deployment, share on:

- [ ] WhatsApp Business status
- [ ] Facebook page
- [ ] Instagram bio link
- [ ] Google My Business
- [ ] Business cards
- [ ] Shop signage

---

## 🔄 How to Update

When you make changes:

```bash
# 1. Make changes to files
# 2. Test locally
# 3. Commit and push
git add .
git commit -m "Description of changes"
git push origin main

# 4. Auto-deploys in 2-5 minutes!
```

---

## 💰 Cost: ₹0/month

All services are **100% FREE**:
- ✅ MongoDB Atlas: Free M0 tier
- ✅ Render.com: Free tier
- ✅ Vercel: Free hobby plan
- ✅ GitHub: Free public repositories

---

## 🆘 Quick Troubleshooting

### Backend not responding?
- Wait 60 seconds (free tier wakes from sleep)
- Check Render logs
- Verify MongoDB connection string

### Frontend not loading?
- Check Vercel deployment logs
- Verify API_BASE_URL is correct
- Clear browser cache

### Admin login fails?
- Verify admin user was created
- Check username/password
- Check browser console for errors

### Images not uploading?
- Check file size < 5MB
- Verify backend is running
- Check browser console

---

## 📞 Support Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Docs**: https://docs.atlas.mongodb.com/

---

## 🎉 Deployment Complete!

**Time Taken:** ~30 minutes
**Cost:** ₹0
**Status:** ✅ LIVE

Your professional mobile repair website is now on the internet!

---

**Last Updated:** May 7, 2026
**Version:** 1.0.0
