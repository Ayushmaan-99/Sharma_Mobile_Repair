# Quick Start Guide - Sharma Mobile Repair Website

Get your website up and running in 5 minutes!

## 🚀 Quick Setup (Local Development)

### Step 1: Install Dependencies

```bash
# Install Node.js (if not already installed)
# Download from: https://nodejs.org/

# Install MongoDB (if not already installed)
# macOS: brew install mongodb-community
# Ubuntu: sudo apt-get install mongodb
# Windows: Download from mongodb.com

# Navigate to backend folder
cd backend

# Install backend dependencies
npm install
```

### Step 2: Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env file (use any text editor)
nano .env
```

Update these values in `.env`:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/sharma-mobile-repair
JWT_SECRET=my_super_secret_key_12345
```

### Step 3: Start MongoDB

```bash
# Start MongoDB service
# macOS/Linux:
mongod

# Windows:
# MongoDB should start automatically as a service
```

### Step 4: Start Backend Server

```bash
# In the backend directory
npm start
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on port 3000
📍 API URL: http://localhost:3000/api
```

### Step 5: Create Admin User

Open a new terminal and run:

```bash
curl -X POST http://localhost:3000/api/admin/create \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

**Important**: Change the password in production!

### Step 6: Configure Frontend

Edit `js/config.js` and ensure:

```javascript
const CONFIG = {
    API_BASE_URL: 'http://localhost:3000/api',
    // ... rest of config
};
```

### Step 7: Open Website

Simply open these files in your browser:
- **Main Website**: `index.html`
- **Admin Panel**: `admin.html`

## ✅ Test Everything

### Test 1: Homepage
1. Open `index.html`
2. Scroll through all sections
3. Check if services are displayed
4. Verify navigation works

### Test 2: Repair Request
1. Go to "Book a Repair" section
2. Fill out the form:
   - Name: Test User
   - Phone: 9876543210
   - Device: iPhone 13
   - Issue: Screen broken
3. Upload a test image
4. Click "Submit Repair Request"
5. You should see a success message

### Test 3: Admin Login
1. Open `admin.html`
2. Login with:
   - Username: `admin`
   - Password: `admin123` (or what you set)
3. You should see the admin dashboard

### Test 4: View Repair Requests
1. In admin panel, click "Repair Requests"
2. You should see the test request you submitted
3. Click the eye icon to view details
4. Try downloading the uploaded image

### Test 5: Add Accessory
1. In admin panel, click "Manage Accessories"
2. Click "Add New Accessory"
3. Fill in:
   - Name: Phone Charger
   - Price: 299
   - Description: Fast charging cable
   - Upload an image
4. Click "Save Accessory"
5. Go back to homepage and check accessories section

## 🎉 Success!

If all tests pass, your website is working perfectly!

## 📝 Next Steps

1. **Customize Content**:
   - Update business name and contact info
   - Change colors in `css/styles.css`
   - Add your own images

2. **Add Real Data**:
   - Add actual accessories through admin panel
   - Update testimonials in `index.html`
   - Update FAQ section

3. **Deploy to Production**:
   - Follow `DEPLOYMENT.md` guide
   - Set up domain name
   - Configure SSL certificate

## 🐛 Common Issues

### "Cannot connect to MongoDB"
**Solution**: Make sure MongoDB is running
```bash
# Check if MongoDB is running
ps aux | grep mongod

# Start MongoDB if not running
mongod
```

### "Port 3000 already in use"
**Solution**: Change port in `.env` file
```
PORT=3001
```

### "Admin login fails"
**Solution**: Recreate admin user
```bash
# Delete existing admin (in MongoDB shell)
mongo
use sharma-mobile-repair
db.admins.deleteMany({})
exit

# Create new admin
curl -X POST http://localhost:3000/api/admin/create \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"newpassword"}'
```

### "Images not uploading"
**Solution**: Check uploads directory exists
```bash
cd backend
mkdir -p uploads/accessories uploads/repairs
```

### "CORS error in browser"
**Solution**: Make sure backend is running and CORS is enabled in `server.js`

## 💡 Tips

1. **Use Chrome DevTools**: Press F12 to see console errors
2. **Check Backend Logs**: Look at terminal where backend is running
3. **Test API Directly**: Use curl or Postman to test endpoints
4. **Keep MongoDB Running**: Backend needs MongoDB to work

## 📞 Need Help?

- Check `README.md` for detailed documentation
- Check `DEPLOYMENT.md` for deployment guide
- Review error messages in browser console
- Check backend terminal for error logs

## 🎯 Quick Commands Reference

```bash
# Start backend
cd backend && npm start

# Create admin user
curl -X POST http://localhost:3000/api/admin/create \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Check backend health
curl http://localhost:3000/api/health

# View MongoDB data
mongo
use sharma-mobile-repair
db.repairRequests.find()
db.accessories.find()
db.admins.find()
```

---

**You're all set! 🚀**

Your Sharma Mobile Repair website is ready to use!
