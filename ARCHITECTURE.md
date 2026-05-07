# System Architecture - Sharma Mobile Repair Website

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USERS                                    │
│  ┌──────────────┐              ┌──────────────┐                │
│  │  Customers   │              │    Admin     │                │
│  └──────┬───────┘              └──────┬───────┘                │
│         │                              │                         │
└─────────┼──────────────────────────────┼─────────────────────────┘
          │                              │
          ▼                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND LAYER                              │
│  ┌──────────────────────┐    ┌──────────────────────┐          │
│  │   index.html         │    │   admin.html         │          │
│  │  (Customer Site)     │    │  (Admin Panel)       │          │
│  │                      │    │                      │          │
│  │  • Hero Section      │    │  • Login Page        │          │
│  │  • Services          │    │  • Dashboard         │          │
│  │  • Accessories       │    │  • Manage Items      │          │
│  │  • Repair Form       │    │  • View Requests     │          │
│  │  • Testimonials      │    │  • Analytics         │          │
│  │  • FAQ               │    │                      │          │
│  │  • Contact           │    │                      │          │
│  └──────────┬───────────┘    └──────────┬───────────┘          │
│             │                           │                       │
│             │    ┌──────────────────────┘                       │
│             │    │                                               │
│             ▼    ▼                                               │
│  ┌─────────────────────────────────────────────┐               │
│  │         JavaScript Layer                     │               │
│  │  ┌──────────────┐    ┌──────────────┐      │               │
│  │  │   main.js    │    │   admin.js   │      │               │
│  │  │              │    │              │      │               │
│  │  │ • Navigation │    │ • Auth       │      │               │
│  │  │ • Forms      │    │ • CRUD Ops   │      │               │
│  │  │ • Upload     │    │ • Analytics  │      │               │
│  │  │ • API Calls  │    │ • Modals     │      │               │
│  │  └──────────────┘    └──────────────┘      │               │
│  │                                              │               │
│  │  ┌──────────────────────────────────┐      │               │
│  │  │         config.js                 │      │               │
│  │  │  • API URLs                       │      │               │
│  │  │  • Settings                       │      │               │
│  │  └──────────────────────────────────┘      │               │
│  └─────────────────────────────────────────────┘               │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      │ HTTP/HTTPS
                      │ (REST API)
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND LAYER                               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Express.js Server                      │  │
│  │                      (server.js)                          │  │
│  │                                                            │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │              Middleware                           │   │  │
│  │  │  • CORS                                           │   │  │
│  │  │  • JSON Parser                                    │   │  │
│  │  │  • Authentication (JWT)                           │   │  │
│  │  │  • File Upload (Multer)                           │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  │                                                            │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │              API Routes                           │   │  │
│  │  │                                                    │   │  │
│  │  │  ┌────────────────────────────────────────┐     │   │  │
│  │  │  │  /api/repair-requests                  │     │   │  │
│  │  │  │  • POST   (submit request)             │     │   │  │
│  │  │  │  • GET    (list all) [Admin]           │     │   │  │
│  │  │  │  • PATCH  (update status) [Admin]      │     │   │  │
│  │  │  └────────────────────────────────────────┘     │   │  │
│  │  │                                                    │   │  │
│  │  │  ┌────────────────────────────────────────┐     │   │  │
│  │  │  │  /api/accessories                      │     │   │  │
│  │  │  │  • GET    (list all)                   │     │   │  │
│  │  │  │  • POST   (add new) [Admin]            │     │   │  │
│  │  │  │  • PUT    (update) [Admin]             │     │   │  │
│  │  │  │  • DELETE (remove) [Admin]             │     │   │  │
│  │  │  └────────────────────────────────────────┘     │   │  │
│  │  │                                                    │   │  │
│  │  │  ┌────────────────────────────────────────┐     │   │  │
│  │  │  │  /api/admin                            │     │   │  │
│  │  │  │  • POST   /login (authenticate)        │     │   │  │
│  │  │  │  • POST   /create (setup)              │     │   │  │
│  │  │  └────────────────────────────────────────┘     │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  │                                                            │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │              Models (Mongoose)                    │   │  │
│  │  │  • RepairRequest                                  │   │  │
│  │  │  • Accessory                                      │   │  │
│  │  │  • Admin                                          │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      │ MongoDB Protocol
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    MongoDB Database                       │  │
│  │                                                            │  │
│  │  ┌────────────────────────────────────────────────┐     │  │
│  │  │  Collections:                                   │     │  │
│  │  │                                                  │     │  │
│  │  │  ┌──────────────────────────────────────┐     │     │  │
│  │  │  │  repairRequests                      │     │     │  │
│  │  │  │  • customerName                      │     │     │  │
│  │  │  │  • phone                             │     │     │  │
│  │  │  │  • email                             │     │     │  │
│  │  │  │  • deviceModel                       │     │     │  │
│  │  │  │  • issueDescription                  │     │     │  │
│  │  │  │  • images[]                          │     │     │  │
│  │  │  │  • status                            │     │     │  │
│  │  │  │  • createdAt                         │     │     │  │
│  │  │  └──────────────────────────────────────┘     │     │  │
│  │  │                                                  │     │  │
│  │  │  ┌──────────────────────────────────────┐     │     │  │
│  │  │  │  accessories                         │     │     │  │
│  │  │  │  • name                              │     │     │  │
│  │  │  │  • description                       │     │     │  │
│  │  │  │  • price                             │     │     │  │
│  │  │  │  • image                             │     │     │  │
│  │  │  │  • available                         │     │     │  │
│  │  │  │  • createdAt                         │     │     │  │
│  │  │  └──────────────────────────────────────┘     │     │  │
│  │  │                                                  │     │  │
│  │  │  ┌──────────────────────────────────────┐     │     │  │
│  │  │  │  admins                              │     │     │  │
│  │  │  │  • username                          │     │     │  │
│  │  │  │  • password (hashed)                 │     │     │  │
│  │  │  │  • createdAt                         │     │     │  │
│  │  │  └──────────────────────────────────────┘     │     │  │
│  │  └────────────────────────────────────────────────┘     │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                      FILE STORAGE                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    uploads/                               │  │
│  │  ┌────────────────────┐    ┌────────────────────┐       │  │
│  │  │  accessories/      │    │  repairs/          │       │  │
│  │  │  • product images  │    │  • customer images │       │  │
│  │  └────────────────────┘    └────────────────────┘       │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow Diagrams

### Customer Repair Request Flow

```
Customer                Frontend              Backend               Database
   │                       │                     │                     │
   │  Fill Form            │                     │                     │
   │  Upload Images        │                     │                     │
   │──────────────────────>│                     │                     │
   │                       │                     │                     │
   │                       │  Validate Input     │                     │
   │                       │─────────────────────│                     │
   │                       │                     │                     │
   │                       │  POST /api/repair-requests               │
   │                       │────────────────────>│                     │
   │                       │                     │                     │
   │                       │                     │  Upload Images      │
   │                       │                     │─────────────────────│
   │                       │                     │                     │
   │                       │                     │  Save Request       │
   │                       │                     │────────────────────>│
   │                       │                     │                     │
   │                       │                     │  Return ID          │
   │                       │                     │<────────────────────│
   │                       │                     │                     │
   │                       │  Success Response   │                     │
   │                       │<────────────────────│                     │
   │                       │                     │                     │
   │  Success Message      │                     │                     │
   │<──────────────────────│                     │                     │
```

### Admin Login Flow

```
Admin                   Frontend              Backend               Database
   │                       │                     │                     │
   │  Enter Credentials    │                     │                     │
   │──────────────────────>│                     │                     │
   │                       │                     │                     │
   │                       │  POST /api/admin/login                   │
   │                       │────────────────────>│                     │
   │                       │                     │                     │
   │                       │                     │  Find Admin         │
   │                       │                     │────────────────────>│
   │                       │                     │                     │
   │                       │                     │  Return Admin       │
   │                       │                     │<────────────────────│
   │                       │                     │                     │
   │                       │                     │  Verify Password    │
   │                       │                     │─────────────────────│
   │                       │                     │                     │
   │                       │                     │  Generate JWT       │
   │                       │                     │─────────────────────│
   │                       │                     │                     │
   │                       │  Return Token       │                     │
   │                       │<────────────────────│                     │
   │                       │                     │                     │
   │                       │  Store Token        │                     │
   │                       │─────────────────────│                     │
   │                       │                     │                     │
   │  Show Dashboard       │                     │                     │
   │<──────────────────────│                     │                     │
```

### Admin Manage Accessories Flow

```
Admin                   Frontend              Backend               Database
   │                       │                     │                     │
   │  Add Accessory        │                     │                     │
   │  Upload Image         │                     │                     │
   │──────────────────────>│                     │                     │
   │                       │                     │                     │
   │                       │  POST /api/accessories                   │
   │                       │  (with JWT token)   │                     │
   │                       │────────────────────>│                     │
   │                       │                     │                     │
   │                       │                     │  Verify Token       │
   │                       │                     │─────────────────────│
   │                       │                     │                     │
   │                       │                     │  Upload Image       │
   │                       │                     │─────────────────────│
   │                       │                     │                     │
   │                       │                     │  Save Accessory     │
   │                       │                     │────────────────────>│
   │                       │                     │                     │
   │                       │                     │  Return ID          │
   │                       │                     │<────────────────────│
   │                       │                     │                     │
   │                       │  Success Response   │                     │
   │                       │<────────────────────│                     │
   │                       │                     │                     │
   │                       │  Reload List        │                     │
   │                       │─────────────────────│                     │
   │                       │                     │                     │
   │  Updated List         │                     │                     │
   │<──────────────────────│                     │                     │
```

## 🔐 Security Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      SECURITY LAYERS                             │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Layer 1: Frontend Validation                          │    │
│  │  • Input validation (phone, email)                     │    │
│  │  • File type validation                                │    │
│  │  • File size validation                                │    │
│  │  • Required field checks                               │    │
│  └────────────────────────────────────────────────────────┘    │
│                           │                                      │
│                           ▼                                      │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Layer 2: Network Security                             │    │
│  │  • HTTPS/SSL encryption                                │    │
│  │  • CORS configuration                                  │    │
│  │  • Rate limiting                                       │    │
│  └────────────────────────────────────────────────────────┘    │
│                           │                                      │
│                           ▼                                      │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Layer 3: Backend Validation                           │    │
│  │  • Input sanitization                                  │    │
│  │  • File type verification                              │    │
│  │  • File size limits                                    │    │
│  │  • Data type validation                                │    │
│  └────────────────────────────────────────────────────────┘    │
│                           │                                      │
│                           ▼                                      │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Layer 4: Authentication                               │    │
│  │  • JWT token verification                              │    │
│  │  • Password hashing (bcrypt)                           │    │
│  │  • Token expiration                                    │    │
│  │  • Protected routes                                    │    │
│  └────────────────────────────────────────────────────────┘    │
│                           │                                      │
│                           ▼                                      │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Layer 5: Database Security                            │    │
│  │  • MongoDB authentication                              │    │
│  │  • Connection encryption                               │    │
│  │  • Query sanitization                                  │    │
│  │  • Access control                                      │    │
│  └────────────────────────────────────────────────────────┘    │
│                           │                                      │
│                           ▼                                      │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Layer 6: File Storage Security                        │    │
│  │  • Unique filename generation                          │    │
│  │  • Path traversal prevention                           │    │
│  │  • Access permissions                                  │    │
│  │  • Organized directory structure                       │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

## 📊 Component Interaction Matrix

```
┌──────────────┬──────────┬──────────┬──────────┬──────────┐
│ Component    │ Frontend │ Backend  │ Database │ Storage  │
├──────────────┼──────────┼──────────┼──────────┼──────────┤
│ Homepage     │    ✓     │    ✓     │    ✓     │    ✗     │
│ Repair Form  │    ✓     │    ✓     │    ✓     │    ✓     │
│ Accessories  │    ✓     │    ✓     │    ✓     │    ✓     │
│ Admin Login  │    ✓     │    ✓     │    ✓     │    ✗     │
│ Admin Panel  │    ✓     │    ✓     │    ✓     │    ✓     │
│ Analytics    │    ✓     │    ✓     │    ✓     │    ✗     │
└──────────────┴──────────┴──────────┴──────────┴──────────┘

Legend:
✓ = Direct interaction
✗ = No interaction
```

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      PRODUCTION SETUP                            │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  CDN Layer (Cloudflare)                                │    │
│  │  • Static file caching                                 │    │
│  │  • DDoS protection                                     │    │
│  │  • SSL/TLS termination                                 │    │
│  │  • Bot protection                                      │    │
│  └────────────────────────────────────────────────────────┘    │
│                           │                                      │
│                           ▼                                      │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Frontend Hosting (Cloudflare Pages)                   │    │
│  │  • index.html                                          │    │
│  │  • admin.html                                          │    │
│  │  • Static assets (CSS, JS)                            │    │
│  └────────────────────────────────────────────────────────┘    │
│                           │                                      │
│                           │ API Calls                            │
│                           ▼                                      │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Backend Hosting (Railway/Heroku)                      │    │
│  │  • Node.js + Express server                            │    │
│  │  • API endpoints                                       │    │
│  │  • File upload handling                                │    │
│  │  • Authentication                                      │    │
│  └────────────────────────────────────────────────────────┘    │
│                           │                                      │
│                           │ Database Queries                     │
│                           ▼                                      │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Database (MongoDB Atlas)                              │    │
│  │  • Replica set (3 nodes)                               │    │
│  │  • Automatic backups                                   │    │
│  │  • Encryption at rest                                  │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  File Storage (Backend Server)                         │    │
│  │  • Uploaded images                                     │    │
│  │  • Organized directories                               │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Request/Response Cycle

### Example: Customer Submits Repair Request

```
1. Customer fills form on index.html
   ↓
2. JavaScript validates input (main.js)
   ↓
3. FormData created with text fields + images
   ↓
4. POST request to /api/repair-requests
   ↓
5. Backend receives request (server.js)
   ↓
6. Multer middleware processes images
   ↓
7. Route handler validates data (repairRequests.js)
   ↓
8. Images saved to uploads/repairs/
   ↓
9. Request data saved to MongoDB (RepairRequest model)
   ↓
10. Success response sent to frontend
    ↓
11. Frontend displays success message
    ↓
12. Form resets, images cleared
```

## 📈 Scalability Considerations

```
Current Architecture:
┌──────────────┐
│   Frontend   │ ──┐
└──────────────┘   │
                   ├──> ┌──────────┐    ┌──────────┐
┌──────────────┐   │    │ Backend  │───>│ Database │
│   Frontend   │ ──┤    │ (Single) │    └──────────┘
└──────────────┘   │    └──────────┘
                   │
┌──────────────┐   │
│   Frontend   │ ──┘
└──────────────┘

Scalable Architecture:
┌──────────────┐
│   Frontend   │ ──┐
└──────────────┘   │
                   ├──> ┌─────────────┐    ┌──────────┐
┌──────────────┐   │    │Load Balancer│───>│ Database │
│   Frontend   │ ──┤    └─────────────┘    │ Cluster  │
└──────────────┘   │           │            └──────────┘
                   │           ├──> Backend 1
┌──────────────┐   │           ├──> Backend 2
│   Frontend   │ ──┘           └──> Backend 3
└──────────────┘
```

---

**Architecture Status**: ✅ Production-Ready
**Last Updated**: January 2024
