# 🔧 Fix Recycle Bin Issue - Troubleshooting Guide

## Problem: Deleted requests don't appear in recycle bin

---

## ✅ Solution Steps

### Step 1: Run Migration Script

Existing requests in your database don't have the `isDeleted` and `deletedAt` fields. Run the migration to add them:

**Option A: Using Batch File (Easy)**
1. **Double-click** `migrate-requests.bat`
2. Press any key to continue
3. Wait for completion message

**Option B: Using Command Line**
```bash
cd backend
node migrate-existing-requests.js
```

**Expected Output:**
```
===========================================
   Migrating Existing Repair Requests
   Adding isDeleted and deletedAt fields
===========================================

Connecting to MongoDB...
✓ Connected to MongoDB

Found X requests to update

✓ Updated request 507f1f77bcf86cd799439011
✓ Updated request 507f1f77bcf86cd799439012
...

===========================================
✓ Migration completed successfully!
✓ Updated X repair requests
===========================================
```

### Step 2: Restart Backend Server

After migration, restart the backend:

1. **Stop** current server (Ctrl+C in the terminal)
2. **Start** again:
   ```bash
   cd backend
   npm start
   ```
   
   Or use batch file:
   ```bash
   start-backend.bat
   ```

### Step 3: Clear Browser Cache

1. Open browser **Developer Tools** (F12)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Click **Clear storage** or **Clear site data**
4. **Refresh** the page (Ctrl+F5)

### Step 4: Test the Feature

1. **Login** to admin panel
2. Go to **"Repair Requests"**
3. Click **delete icon** (trash) on any request
4. You should see confirmation: "Repair request moved to recycle bin (Will be permanently deleted in 15 days)"
5. Go to **"Recycle Bin"** section
6. The deleted request should appear with days remaining

---

## 🔍 Debugging Steps

### Check Backend Logs

When you delete a request, check the backend console for these logs:

```
Delete request received for ID: 507f1f77bcf86cd799439011
Request found, current isDeleted: false
Request soft deleted successfully: 507f1f77bcf86cd799439011
New isDeleted value: true
DeletedAt: 2026-05-07T10:30:00.000Z
```

When you load recycle bin:

```
Fetching recycle bin requests...
Found 1 deleted requests in recycle bin
```

### Check Browser Console

1. Open **Developer Tools** (F12)
2. Go to **Console** tab
3. Look for errors when:
   - Deleting a request
   - Loading recycle bin

### Check Network Requests

1. Open **Developer Tools** (F12)
2. Go to **Network** tab
3. Delete a request
4. Look for:
   - `DELETE /api/repair-requests/:id` - Should return 200 OK
   - Response: `{"message":"Repair request moved to recycle bin","daysUntilPermanentDelete":15}`

5. Go to Recycle Bin
6. Look for:
   - `GET /api/repair-requests/recycle-bin/all` - Should return 200 OK
   - Response: Array of deleted requests

---

## 🐛 Common Issues & Solutions

### Issue 1: "Request not found" error

**Cause**: Invalid request ID  
**Solution**: 
- Check if request exists in database
- Verify the ID is correct
- Try with a different request

### Issue 2: Recycle bin shows empty but requests were deleted

**Cause**: Migration not run or backend not restarted  
**Solution**:
1. Run migration script: `migrate-requests.bat`
2. Restart backend server
3. Clear browser cache
4. Try again

### Issue 3: Backend console shows "Found 0 deleted requests"

**Cause**: Requests don't have `isDeleted: true`  
**Solution**:
1. Check database directly (MongoDB Compass or Atlas)
2. Verify migration ran successfully
3. Check if `isDeleted` field exists on documents
4. Re-run migration if needed

### Issue 4: "Cannot find module 'node-cron'" error

**Cause**: node-cron not installed  
**Solution**:
```bash
cd backend
npm install node-cron
npm start
```

### Issue 5: Delete button doesn't work

**Cause**: JavaScript error or authentication issue  
**Solution**:
1. Check browser console for errors
2. Verify you're logged in as admin
3. Check if JWT token is valid
4. Try logging out and back in

---

## 🔬 Manual Database Check

### Using MongoDB Compass

1. Open **MongoDB Compass**
2. Connect to your database
3. Go to **sharma-mobile-repair** database
4. Open **repairrequests** collection
5. Check if documents have:
   - `isDeleted: false` (for active requests)
   - `isDeleted: true` (for deleted requests)
   - `deletedAt: Date` (for deleted requests)

### Using MongoDB Atlas

1. Login to **MongoDB Atlas**
2. Go to **Clusters** → **Browse Collections**
3. Select **sharma-mobile-repair** → **repairrequests**
4. Check document structure

### Expected Document Structure

**Active Request:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "customerName": "John Doe",
  "phone": "1234567890",
  "deviceModel": "iPhone 12",
  "issueDescription": "Screen broken",
  "status": "pending",
  "isDeleted": false,
  "deletedAt": null,
  "createdAt": "2026-05-01T10:00:00.000Z"
}
```

**Deleted Request:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "customerName": "Jane Smith",
  "phone": "9876543210",
  "deviceModel": "Samsung S21",
  "issueDescription": "Battery issue",
  "status": "pending",
  "isDeleted": true,
  "deletedAt": "2026-05-07T10:30:00.000Z",
  "createdAt": "2026-05-02T11:00:00.000Z"
}
```

---

## 📝 Verification Checklist

After following the steps above, verify:

- [ ] Migration script ran successfully
- [ ] Backend server restarted
- [ ] Browser cache cleared
- [ ] Can see delete button on repair requests
- [ ] Delete button shows confirmation dialog
- [ ] Backend logs show "Request soft deleted successfully"
- [ ] Recycle bin section loads without errors
- [ ] Deleted requests appear in recycle bin
- [ ] Days remaining counter shows correct value
- [ ] Can restore requests from recycle bin
- [ ] Restored requests appear back in main list

---

## 🆘 Still Not Working?

### Check These Files

1. **backend/models/RepairRequest.js**
   - Should have `isDeleted` and `deletedAt` fields

2. **backend/routes/repairRequests.js**
   - GET `/` should filter `isDeleted: false`
   - GET `/recycle-bin/all` should filter `isDeleted: true`
   - DELETE `/:id` should set `isDeleted: true`

3. **js/admin.js**
   - Should have `deleteRequest()` function
   - Should have `loadRecycleBin()` function
   - Should have `displayRecycleBin()` function

### Get Detailed Logs

Add this to your backend console to see all requests:

```javascript
// In backend/routes/repairRequests.js, add this temporary route:
router.get('/debug/all', auth, async (req, res) => {
    const all = await RepairRequest.find();
    res.json(all.map(r => ({
        id: r._id,
        customer: r.customerName,
        isDeleted: r.isDeleted,
        deletedAt: r.deletedAt
    })));
});
```

Then visit: `http://localhost:3000/api/repair-requests/debug/all`

---

## 📞 Contact Support

If the issue persists after following all steps:

1. **Check backend logs** for errors
2. **Check browser console** for errors
3. **Verify database connection** is working
4. **Test with a new repair request** (create one from the website)
5. **Try deleting the new request**

---

## 🎯 Quick Fix Summary

```bash
# 1. Run migration
cd backend
node migrate-existing-requests.js

# 2. Install dependencies (if needed)
npm install node-cron

# 3. Restart server
npm start

# 4. Clear browser cache (Ctrl+Shift+Delete)

# 5. Test in admin panel
```

---

**Last Updated**: May 7, 2026  
**Status**: Troubleshooting Guide
