# Sharma Mobile Repair

Responsive mobile repair website with an Express API, MongoDB database, admin panel, accessory management, repair request uploads, recycle bin, and PM2 background server support.

## Features

- Public responsive website for phones, tablets, laptops, and desktops
- Repair booking form with optional image uploads
- Accessories catalog loaded from the backend
- Admin login with JWT authentication
- Admin dashboard for analytics, accessories, repair requests, recycle bin, and settings
- MongoDB persistence with validation and indexes
- Soft delete and restore flow for repair requests
- Automatic cleanup scheduler for old deleted requests
- PM2 process config for long-running local server

## Project Structure

```text
.
├── index.html
├── admin.html
├── css/
│   ├── styles.css
│   └── admin.css
├── js/
│   ├── config.js
│   ├── main.js
│   └── admin.js
├── backend/
│   ├── server.js
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── .env
├── ecosystem.config.cjs
├── start-server-pm2.bat
└── stop-server-pm2.bat
```

## Requirements

- Node.js
- npm
- MongoDB Atlas or local MongoDB
- PM2 for always-running local server

Install PM2 once if needed:

```bash
npm install -g pm2
```

## Environment

Create or update `backend/.env`:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=use_a_long_random_secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=use_a_strong_password
```

Do not commit real secrets. Keep production credentials private.

## Install

Install root test dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
cd backend
npm install
```

## Run Locally

Start the backend and website:

```bash
cd backend
npm start
```

Open:

- Website: `http://localhost:3000`
- Admin panel: `http://localhost:3000/admin.html`
- API health: `http://localhost:3000/api/health`

## Keep Server Running

Start with PM2:

```bash
start-server-pm2.bat
```

Useful PM2 commands:

```bash
pm2 list
pm2 logs sharma-mobile-repair
pm2 restart sharma-mobile-repair
pm2 stop sharma-mobile-repair
```

Stop with:

```bash
stop-server-pm2.bat
```

## Admin Login

Use the credentials stored in `backend/.env`:

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

If login fails after changing `.env`, sync the database admin user by running:

```bash
cd backend
node update-admin.js
```

Then restart PM2:

```bash
pm2 restart sharma-mobile-repair
```

## API Overview

Base URL:

```text
http://localhost:3000/api
```

Main endpoints:

- `GET /health`
- `POST /admin/login`
- `POST /admin/change-password`
- `POST /admin/change-username`
- `GET /accessories`
- `POST /accessories`
- `PUT /accessories/:id`
- `DELETE /accessories/:id`
- `POST /repair-requests`
- `GET /repair-requests`
- `PATCH /repair-requests/:id`
- `DELETE /repair-requests/:id`
- `GET /repair-requests/recycle-bin/all`
- `POST /repair-requests/:id/restore`
- `DELETE /repair-requests/:id/permanent`

Admin-only endpoints require:

```text
Authorization: Bearer <token>
```

## Testing

Run frontend service tests:

```bash
npm test
```

Check backend JavaScript syntax:

```bash
node --check backend/server.js
node --check backend/routes/admin.js
node --check backend/routes/accessories.js
node --check backend/routes/repairRequests.js
```

## Responsive Design

The public website and admin panel include responsive layouts for:

- Small phones
- Large phones
- Tablets
- Small laptops
- Desktop screens

Admin tables become readable labeled cards on phone screens, so repair requests and accessories remain usable without horizontal scrolling.

## Troubleshooting

If admin login fails:

1. Confirm `backend/.env` has `JWT_SECRET`, `ADMIN_USERNAME`, and `ADMIN_PASSWORD`.
2. Sync the admin user with `node backend/update-admin.js`.
3. Restart the server or PM2.
4. Check logs with `pm2 logs sharma-mobile-repair`.

If MongoDB fails:

1. Check `MONGODB_URI`.
2. Confirm your MongoDB Atlas IP whitelist.
3. Check `http://localhost:3000/api/health`.

If the website loads but API calls fail:

1. Confirm the backend is running on port `3000`.
2. Check `js/config.js`.
3. Open `http://localhost:3000/api/health`.

## Deployment Notes

- Backend can deploy to Render or any Node.js host.
- Frontend can be served by the same Express server or deployed separately.
- Set production environment variables on the hosting platform.
- Use a strong `JWT_SECRET`.
- Never expose `.env` contents publicly.
