# 📱 Sharma Mobile Repair Website

A modern, responsive website for a mobile repair business with customer repair request submission, accessories showcase, and secure admin panel.

## 🚀 READY TO DEPLOY TO THE INTERNET?

**→ Start here: [START_DEPLOYMENT_HERE.md](START_DEPLOYMENT_HERE.md)**

Your website can be **LIVE** on the internet in just **30 minutes** for **FREE**! ✅

### Quick Deployment Links:
- 📖 [Complete Deployment Guide](DEPLOY_TO_INTERNET.md) - Step-by-step instructions
- ⚡ [Quick Checklist](QUICK_DEPLOY_CHECKLIST.md) - Fast reference
- 🗺️ [Visual Flowchart](DEPLOYMENT_FLOWCHART.md) - Visual guide
- 🔄 [Platform Comparison](DEPLOYMENT_ALTERNATIVES.md) - Choose your platform
- 📊 [Deployment Summary](DEPLOYMENT_SUMMARY.txt) - Overview

---

## 🌟 Features

### Customer Features
- **Responsive Design**: Mobile-first design that works on all devices
- **Services Showcase**: Display of all repair services offered
- **Repair Request Form**: Submit repair requests with device details
- **Image Upload**: Upload multiple photos of damaged devices
- **Accessories Browse**: View available mobile accessories with prices
- **Contact Information**: WhatsApp integration, Google Maps, contact details
- **FAQ Section**: Common questions and answers
- **Testimonials**: Customer reviews and ratings

### Admin Features
- **Secure Login**: Username/password authentication
- **Analytics Dashboard**: View statistics and recent requests
- **Accessories Management**: Add, edit, delete accessories with images
- **Repair Requests**: View all customer requests with uploaded images
- **Image Download**: Download customer-uploaded device images
- **Status Management**: Mark requests as pending or completed
- **Real-time Updates**: Dynamic data loading from backend

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3 (Modern, responsive design)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons

### Backend (Required)
- Node.js + Express.js (recommended) OR PHP
- MySQL or MongoDB database
- File upload handling (Multer for Node.js)

## 📁 Project Structure

```
sharma-mobile-repair/
├── index.html              # Homepage
├── admin.html              # Admin panel
├── css/
│   ├── styles.css          # Main stylesheet
│   └── admin.css           # Admin panel styles
├── js/
│   ├── config.js           # Configuration file
│   ├── main.js             # Main JavaScript
│   └── admin.js            # Admin panel JavaScript
└── README.md               # This file
```

## 🚀 Setup Instructions

### 1. Frontend Setup

1. **Clone or download** this repository
2. **Configure API endpoints** in `js/config.js`:
   ```javascript
   const CONFIG = {
       API_BASE_URL: 'http://your-backend-url/api',
       // ... other settings
   };
   ```

3. **Open in browser**:
   - Open `index.html` for the main website
   - Open `admin.html` for the admin panel

### 2. Backend Setup (Node.js + Express)

#### Prerequisites
- Node.js (v14 or higher)
- MongoDB or MySQL database

#### Installation

1. **Create backend directory**:
   ```bash
   mkdir backend
   cd backend
   npm init -y
   ```

2. **Install dependencies**:
   ```bash
   npm install express mongoose multer bcryptjs jsonwebtoken cors dotenv
   ```

3. **Create backend structure**:
   ```
   backend/
   ├── server.js
   ├── models/
   │   ├── Accessory.js
   │   ├── RepairRequest.js
   │   └── Admin.js
   ├── routes/
   │   ├── accessories.js
   │   ├── repairRequests.js
   │   └── admin.js
   ├── middleware/
   │   └── auth.js
   ├── uploads/
   │   ├── accessories/
   │   └── repairs/
   └── .env
   ```

4. **Configure environment variables** (`.env`):
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/sharma-mobile-repair
   JWT_SECRET=your_jwt_secret_key_here
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your_secure_password
   ```

5. **Start the server**:
   ```bash
   node server.js
   ```

### 3. Database Setup

#### MongoDB Schema

**Accessories Collection**:
```javascript
{
    name: String,
    description: String,
    price: Number,
    image: String,
    available: Boolean,
    createdAt: Date
}
```

**Repair Requests Collection**:
```javascript
{
    customerName: String,
    phone: String,
    email: String,
    deviceModel: String,
    issueDescription: String,
    images: [String],
    status: String, // 'pending' or 'completed'
    createdAt: Date
}
```

**Admin Collection**:
```javascript
{
    username: String,
    password: String, // hashed
    createdAt: Date
}
```

### 4. API Endpoints

#### Public Endpoints

**GET /api/accessories**
- Get all accessories
- Response: Array of accessory objects

**POST /api/repair-requests**
- Submit a repair request
- Body: FormData with customer details and images
- Response: Created request object

#### Protected Endpoints (Require Authentication)

**POST /api/admin/login**
- Admin login
- Body: `{ username, password }`
- Response: `{ token, username }`

**GET /api/repair-requests** (Admin only)
- Get all repair requests
- Headers: `Authorization: Bearer <token>`
- Response: Array of request objects

**POST /api/accessories** (Admin only)
- Add new accessory
- Body: FormData with accessory details and image
- Headers: `Authorization: Bearer <token>`

**PUT /api/accessories/:id** (Admin only)
- Update accessory
- Body: FormData with updated details
- Headers: `Authorization: Bearer <token>`

**DELETE /api/accessories/:id** (Admin only)
- Delete accessory
- Headers: `Authorization: Bearer <token>`

**PATCH /api/repair-requests/:id** (Admin only)
- Update request status
- Body: `{ status: 'pending' | 'completed' }`
- Headers: `Authorization: Bearer <token>`

## 🔒 Security Features

- **Input Validation**: All form inputs are validated
- **File Upload Validation**: Only images allowed, max 5MB per file
- **XSS Protection**: Input sanitization
- **Authentication**: JWT-based admin authentication
- **Password Hashing**: Bcrypt for password security
- **CORS Configuration**: Proper CORS setup
- **Environment Variables**: Sensitive data in .env file

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px and above

## 🎨 Color Scheme

- **Primary**: Deep Navy Blue (#1e3a8a)
- **Secondary**: Electric Cyan (#06b6d4)
- **Accent**: Orange (#f97316)
- **Success**: Green (#10b981)
- **Error**: Red (#ef4444)

## 🌐 Deployment

### Frontend Deployment (Cloudflare Pages)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Cloudflare Pages**:
   - Go to Cloudflare Pages dashboard
   - Connect your GitHub repository
   - Set build command: (none for static site)
   - Set build output directory: `/`
   - Deploy

### Backend Deployment (Heroku/Railway/Render)

1. **Create Procfile**:
   ```
   web: node server.js
   ```

2. **Deploy to hosting platform**:
   - Connect repository
   - Set environment variables
   - Deploy

### Database Deployment

- **MongoDB Atlas**: Free cloud MongoDB hosting
- **MySQL**: Use managed MySQL service (AWS RDS, DigitalOcean)

## 🔧 Configuration

### Update API Base URL

In `js/config.js`, update the API base URL:

```javascript
const CONFIG = {
    API_BASE_URL: 'https://your-backend-domain.com/api',
    // ...
};
```

### Admin Credentials

Default admin credentials (change in production):
- **Username**: admin
- **Password**: Set in backend .env file

## 📝 Usage

### For Customers

1. Visit the website
2. Browse services and accessories
3. Fill out the repair request form
4. Upload photos of damaged device
5. Submit the form
6. Wait for contact from the shop

### For Admin

1. Go to `/admin.html`
2. Login with admin credentials
3. View analytics dashboard
4. Manage accessories (add/edit/delete)
5. View repair requests
6. Download customer images
7. Update request status

## 🐛 Troubleshooting

### Images not uploading
- Check file size (max 5MB)
- Check file type (only JPEG, PNG, WEBP)
- Verify backend upload endpoint is working

### Admin login not working
- Check API endpoint configuration
- Verify admin credentials in database
- Check browser console for errors

### Accessories not loading
- Verify backend API is running
- Check CORS configuration
- Check browser console for errors

## 📄 License

This project is created for Sharma Mobile Repair. All rights reserved.

## 👨‍💻 Support

For support or questions:
- **Email**: info@sharmamobilerepair.com
- **Phone**: +91 98765 43210
- **WhatsApp**: +91 98765 43210

## 🚀 Future Enhancements

- [ ] Online payment integration
- [ ] SMS notifications for customers
- [ ] Email notifications
- [ ] Appointment booking system
- [ ] Customer portal for tracking repairs
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Progressive Web App (PWA)
- [ ] Real-time chat support

---

**Built with ❤️ for Sharma Mobile Repair**
