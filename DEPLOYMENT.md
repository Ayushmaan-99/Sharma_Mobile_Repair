# Deployment Guide - Sharma Mobile Repair Website

This guide covers deploying the complete website with frontend and backend.

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB database (local or cloud)
- Git
- Domain name (optional)

## 🚀 Quick Start

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
nano .env

# Start the server
npm start
```

### 2. Create Admin User

After starting the backend, create an admin user:

```bash
curl -X POST http://localhost:3000/api/admin/create \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your_secure_password"}'
```

**Important**: Remove or secure the `/api/admin/create` endpoint in production!

### 3. Frontend Setup

```bash
# Update API URL in js/config.js
# Change API_BASE_URL to your backend URL

# For local testing
API_BASE_URL: 'http://localhost:3000/api'

# For production
API_BASE_URL: 'https://your-backend-domain.com/api'
```

### 4. Test Locally

1. Start backend: `cd backend && npm start`
2. Open `index.html` in browser
3. Test repair request submission
4. Login to admin panel at `admin.html`

## ☁️ Cloud Deployment

### Option 1: Cloudflare Pages (Frontend) + Railway (Backend)

#### Deploy Backend to Railway

1. **Create Railway Account**: https://railway.app
2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository
   - Select the `backend` folder

3. **Configure Environment Variables**:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_random_secret_key
   PORT=3000
   ```

4. **Deploy**: Railway will automatically deploy your backend

5. **Get Backend URL**: Copy the generated URL (e.g., `https://your-app.railway.app`)

#### Deploy Frontend to Cloudflare Pages

1. **Update API URL**:
   - Edit `js/config.js`
   - Set `API_BASE_URL` to your Railway backend URL

2. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy to Cloudflare Pages"
   git push origin main
   ```

3. **Deploy to Cloudflare Pages**:
   - Go to Cloudflare Pages dashboard
   - Click "Create a project"
   - Connect to GitHub
   - Select your repository
   - Build settings:
     - Build command: (leave empty)
     - Build output directory: `/`
   - Click "Save and Deploy"

4. **Custom Domain** (optional):
   - Go to "Custom domains"
   - Add your domain
   - Update DNS records as instructed

### Option 2: Heroku (Full Stack)

#### Deploy Backend to Heroku

1. **Install Heroku CLI**:
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**:
   ```bash
   heroku login
   ```

3. **Create Heroku App**:
   ```bash
   cd backend
   heroku create sharma-mobile-repair-api
   ```

4. **Add MongoDB**:
   ```bash
   heroku addons:create mongolab:sandbox
   ```

5. **Set Environment Variables**:
   ```bash
   heroku config:set JWT_SECRET=your_random_secret_key
   ```

6. **Deploy**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

7. **Create Admin User**:
   ```bash
   heroku run node -e "
   const mongoose = require('mongoose');
   const Admin = require('./models/Admin');
   mongoose.connect(process.env.MONGODB_URI).then(async () => {
     const admin = new Admin({ username: 'admin', password: 'your_password' });
     await admin.save();
     console.log('Admin created');
     process.exit(0);
   });
   "
   ```

#### Deploy Frontend to Heroku

1. **Create Static Site**:
   ```bash
   # In root directory
   heroku create sharma-mobile-repair-web
   ```

2. **Add PHP Buildpack** (for static hosting):
   ```bash
   heroku buildpacks:set heroku/php
   ```

3. **Create index.php**:
   ```php
   <?php header('Location: /index.html'); ?>
   ```

4. **Deploy**:
   ```bash
   git add .
   git commit -m "Deploy frontend"
   git push heroku main
   ```

### Option 3: DigitalOcean App Platform

1. **Create DigitalOcean Account**
2. **Create New App**:
   - Connect GitHub repository
   - Select backend folder
   - Choose Node.js environment

3. **Configure**:
   - Add MongoDB database component
   - Set environment variables
   - Deploy

4. **Frontend**:
   - Create static site component
   - Point to root directory
   - Deploy

## 🗄️ Database Setup

### MongoDB Atlas (Cloud)

1. **Create Account**: https://www.mongodb.com/cloud/atlas
2. **Create Cluster**:
   - Choose free tier (M0)
   - Select region closest to your users
   - Create cluster

3. **Create Database User**:
   - Go to "Database Access"
   - Add new user with password
   - Save credentials

4. **Whitelist IP**:
   - Go to "Network Access"
   - Add IP address (0.0.0.0/0 for all IPs)

5. **Get Connection String**:
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password

6. **Update .env**:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sharma-mobile-repair
   ```

### Local MongoDB

1. **Install MongoDB**:
   - macOS: `brew install mongodb-community`
   - Ubuntu: `sudo apt-get install mongodb`
   - Windows: Download from mongodb.com

2. **Start MongoDB**:
   ```bash
   mongod
   ```

3. **Use in .env**:
   ```
   MONGODB_URI=mongodb://localhost:27017/sharma-mobile-repair
   ```

## 🔒 Security Checklist

Before deploying to production:

- [ ] Change JWT_SECRET to a random secure string
- [ ] Use strong admin password
- [ ] Remove or secure `/api/admin/create` endpoint
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable MongoDB authentication
- [ ] Whitelist only necessary IPs
- [ ] Set up backup strategy
- [ ] Configure error logging
- [ ] Add monitoring (e.g., PM2, New Relic)

## 🔧 Environment Variables

### Backend (.env)

```bash
# Required
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key

# Optional
ALLOWED_ORIGINS=https://yourdomain.com
NODE_ENV=production
```

### Frontend (js/config.js)

```javascript
const CONFIG = {
    API_BASE_URL: 'https://your-backend-url.com/api',
    // ... other settings
};
```

## 📊 Monitoring

### Backend Health Check

```bash
curl https://your-backend-url.com/api/health
```

Expected response:
```json
{
    "status": "OK",
    "message": "Sharma Mobile Repair API is running",
    "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Logs

**Railway**: View logs in dashboard
**Heroku**: `heroku logs --tail`
**DigitalOcean**: View in app console

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Verify all environment variables are set
- Check port is not already in use
- Review error logs

### Images not uploading
- Check `uploads/` directory exists
- Verify file permissions
- Check multer configuration
- Ensure file size is under 5MB

### CORS errors
- Add frontend URL to CORS configuration
- Check ALLOWED_ORIGINS environment variable
- Verify API_BASE_URL in frontend config

### Admin login fails
- Verify admin user exists in database
- Check JWT_SECRET is set
- Verify password is correct
- Check token expiration

## 📱 Testing

### Test Repair Request Submission

```bash
curl -X POST https://your-backend-url.com/api/repair-requests \
  -F "customerName=Test User" \
  -F "phone=9876543210" \
  -F "deviceModel=iPhone 13" \
  -F "issueDescription=Screen broken" \
  -F "images=@/path/to/image.jpg"
```

### Test Admin Login

```bash
curl -X POST https://your-backend-url.com/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your_password"}'
```

## 🔄 Updates

To update the deployed application:

1. Make changes locally
2. Test thoroughly
3. Commit changes: `git commit -am "Update message"`
4. Push to repository: `git push origin main`
5. Platform will auto-deploy (Railway, Cloudflare Pages)
6. Or manually deploy (Heroku): `git push heroku main`

## 📞 Support

For deployment issues:
- Check platform documentation
- Review error logs
- Contact platform support
- Email: info@sharmamobilerepair.com

---

**Deployment completed successfully! 🎉**

Your Sharma Mobile Repair website is now live and ready to serve customers!
