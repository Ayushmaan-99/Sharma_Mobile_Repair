# 🗑️ Recycle Bin Feature Guide
## Sharma Mobile Repair - Admin Panel

Complete guide to the recycle bin feature for repair requests.

---

## 📋 Overview

The **Recycle Bin** feature provides a safety net for deleted repair requests. Instead of permanently deleting requests immediately, they are moved to a recycle bin where they can be restored within **15 days**. After 15 days, requests are automatically and permanently deleted.

---

## 🎯 Key Features

### Safety Features
- ✅ **Soft Delete**: Requests moved to recycle bin, not permanently deleted
- ✅ **15-Day Grace Period**: Restore requests within 15 days
- ✅ **Automatic Cleanup**: Old requests auto-deleted after 15 days
- ✅ **Restore Capability**: Easily restore accidentally deleted requests
- ✅ **Days Remaining Counter**: See how long before permanent deletion
- ✅ **Double Confirmation**: Prevents accidental permanent deletion

### User Experience
- ✅ **Dedicated Section**: Separate recycle bin page in admin panel
- ✅ **Visual Indicators**: Days remaining badges
- ✅ **Bulk Actions**: Empty entire recycle bin at once
- ✅ **Clear Warnings**: Prominent alerts for permanent actions

---

## 🚀 How to Use

### Deleting a Repair Request

1. **Navigate** to "Repair Requests" section
2. Find the request you want to delete
3. Click the **trash icon** (🗑️) in the Actions column
4. **Confirm** the deletion
5. Request is moved to recycle bin

**Result**: Request disappears from main list and appears in recycle bin with 15-day countdown.

### Viewing Recycle Bin

1. Click **"Recycle Bin"** in the sidebar
2. See all deleted requests
3. View **days remaining** for each request
4. See **deletion date** for each request

### Restoring a Request

1. Go to **"Recycle Bin"** section
2. Find the request to restore
3. Click the **restore icon** (↶) in the Actions column
4. **Confirm** the restoration
5. Request returns to main repair requests list

**Result**: Request is restored with all original data intact.

### Permanently Deleting a Request

1. Go to **"Recycle Bin"** section
2. Find the request to permanently delete
3. Click the **permanent delete icon** (🗑️) in the Actions column
4. **Confirm** twice (double confirmation required)
5. Request is permanently deleted

**⚠️ Warning**: This action CANNOT be undone! All data including images will be permanently deleted.

### Emptying Recycle Bin

1. Go to **"Recycle Bin"** section
2. Click **"Empty Recycle Bin"** button at the top
3. **Confirm** twice (double confirmation required)
4. All requests in recycle bin are permanently deleted

**⚠️ Warning**: This deletes ALL requests in the recycle bin permanently!

---

## ⏰ Automatic Cleanup

### How It Works

The system automatically runs a cleanup job **every day at 2:00 AM** that:

1. Finds all requests deleted more than 15 days ago
2. Permanently deletes those requests
3. Removes associated images from server
4. Logs the cleanup activity

### Cleanup Schedule

- **Frequency**: Daily
- **Time**: 2:00 AM server time
- **Grace Period**: 15 days
- **What Gets Deleted**: Requests + Images

### Manual Cleanup

Admins can also trigger manual cleanup via API:
```
POST /api/repair-requests/cleanup/old
Authorization: Bearer <token>
```

---

## 🔧 Technical Implementation

### Database Schema

**RepairRequest Model** now includes:
```javascript
{
  isDeleted: Boolean,      // false = active, true = in recycle bin
  deletedAt: Date,         // timestamp when deleted
  // ... other fields
}
```

### API Endpoints

#### 1. Get Active Requests
```
GET /api/repair-requests
Returns: Only non-deleted requests (isDeleted: false)
```

#### 2. Get Recycle Bin
```
GET /api/repair-requests/recycle-bin/all
Returns: Deleted requests with days remaining
```

#### 3. Soft Delete (Move to Recycle Bin)
```
DELETE /api/repair-requests/:id
Action: Sets isDeleted=true, deletedAt=now
```

#### 4. Restore from Recycle Bin
```
POST /api/repair-requests/:id/restore
Action: Sets isDeleted=false, deletedAt=null
```

#### 5. Permanent Delete
```
DELETE /api/repair-requests/:id/permanent
Action: Deletes from database + removes images
```

#### 6. Cleanup Old Requests
```
POST /api/repair-requests/cleanup/old
Action: Permanently deletes requests older than 15 days
```

### Automatic Scheduler

**File**: `backend/cleanup-scheduler.js`

Uses **node-cron** to schedule daily cleanup:
```javascript
cron.schedule('0 2 * * *', async () => {
  // Run cleanup at 2:00 AM daily
  await cleanupOldRequests();
});
```

---

## 📊 Recycle Bin Interface

### Table Columns

| Column | Description |
|--------|-------------|
| **Customer** | Customer name |
| **Phone** | Contact number |
| **Device** | Device model |
| **Deleted On** | Date when moved to recycle bin |
| **Days Remaining** | Countdown to permanent deletion |
| **Actions** | Restore or permanently delete |

### Visual Indicators

**Days Remaining Badge**:
- 🔴 Red background
- ⏰ Clock icon
- Shows exact days left

**Info Banner**:
- 🔵 Blue info icon
- Explains 15-day policy
- Prominent at top of page

---

## 🛡️ Safety Measures

### Soft Delete Protection
- Requests not immediately deleted
- 15-day grace period for recovery
- Automatic cleanup prevents database bloat

### Double Confirmation
- Permanent delete requires 2 confirmations
- Empty recycle bin requires 2 confirmations
- Clear warning messages

### Data Integrity
- Original data preserved during soft delete
- All fields restored when recovering
- Images remain on server until permanent delete

### Audit Trail
- `deletedAt` timestamp recorded
- Days remaining calculated dynamically
- Cleanup actions logged to console

---

## 📱 Responsive Design

The recycle bin is fully responsive:

### Desktop
- Full table with all columns
- Large action buttons
- Detailed information display

### Tablet
- Adjusted column widths
- Touch-friendly buttons
- Optimized spacing

### Mobile
- Horizontal scroll for table
- Compact display
- Large tap targets

---

## 🎨 UI Components

### Recycle Bin Info Banner
```css
- Background: Red gradient
- Border: Red
- Icon: Info circle
- Text: Bold 15 days
```

### Days Remaining Badge
```css
- Background: Light red
- Color: Red
- Icon: Clock
- Font: Bold, small
```

### Action Buttons
- **Restore**: Blue/Edit color with undo icon
- **Delete**: Red with trash icon
- **Empty Bin**: Primary button at top

---

## 🔄 Workflow Diagram

```
[Active Request]
      ↓
  [Delete] ← User clicks delete
      ↓
[Recycle Bin] ← isDeleted=true, deletedAt=now
      ↓
   15 Days
      ↓
[Auto Cleanup] ← Runs daily at 2 AM
      ↓
[Permanently Deleted] ← Removed from database + images deleted
```

**Alternative Path**:
```
[Recycle Bin]
      ↓
  [Restore] ← User clicks restore
      ↓
[Active Request] ← isDeleted=false, deletedAt=null
```

---

## 📝 Best Practices

### For Admins

1. **Review Before Deleting**: Check request details before deleting
2. **Use Recycle Bin**: Don't permanently delete immediately
3. **Regular Checks**: Review recycle bin periodically
4. **Restore Quickly**: Restore important requests within 15 days
5. **Empty Carefully**: Only empty recycle bin when sure

### For System Administrators

1. **Monitor Cleanup**: Check logs for cleanup activity
2. **Backup Database**: Regular backups before cleanup
3. **Disk Space**: Monitor storage for uploaded images
4. **Cron Job**: Ensure scheduler is running
5. **Test Restore**: Periodically test restore functionality

---

## 🐛 Troubleshooting

### Request Not Appearing in Recycle Bin
**Problem**: Deleted request doesn't show in recycle bin  
**Solution**: 
- Check if request was permanently deleted
- Verify API endpoint is correct
- Check browser console for errors

### Cannot Restore Request
**Problem**: Restore button doesn't work  
**Solution**:
- Verify admin authentication token
- Check if request still exists in database
- Ensure request is marked as deleted

### Automatic Cleanup Not Running
**Problem**: Old requests not being deleted  
**Solution**:
- Check if server is running continuously
- Verify node-cron is installed
- Check server logs for scheduler initialization
- Ensure server timezone is correct

### Days Remaining Shows 0
**Problem**: Request shows 0 days but still in bin  
**Solution**:
- This is normal for requests on their last day
- Will be deleted in next cleanup run (2 AM)
- Can manually permanently delete if needed

---

## 🔐 Security Considerations

### Authentication Required
- All recycle bin operations require JWT token
- Only authenticated admins can access
- Token verified on every request

### Permission Checks
- Soft delete: Admin only
- Restore: Admin only
- Permanent delete: Admin only
- Cleanup: Admin only

### Data Protection
- Images deleted only on permanent delete
- Soft delete preserves all data
- No data loss during restore

---

## 📈 Statistics & Monitoring

### What to Monitor

1. **Recycle Bin Size**: Number of deleted requests
2. **Cleanup Frequency**: How often cleanup runs
3. **Restore Rate**: How many requests are restored
4. **Storage Usage**: Disk space for deleted request images
5. **Oldest Request**: Days remaining for oldest item

### Logging

The system logs:
- ✅ Cleanup job start/completion
- ✅ Number of requests deleted
- ✅ Image deletion success/failure
- ✅ Errors during cleanup

---

## 🚀 Future Enhancements

Potential improvements:

- [ ] **Configurable Grace Period**: Change from 15 days
- [ ] **Email Notifications**: Alert before permanent deletion
- [ ] **Bulk Restore**: Restore multiple requests at once
- [ ] **Search in Recycle Bin**: Find specific deleted requests
- [ ] **Export Before Delete**: Download data before permanent deletion
- [ ] **Deletion Reason**: Record why request was deleted
- [ ] **Restore History**: Track restore actions
- [ ] **Storage Optimization**: Compress images in recycle bin

---

## 📞 Support

### Common Questions

**Q: Can I change the 15-day period?**  
A: Yes, modify the cleanup scheduler and API logic.

**Q: What happens to images?**  
A: Images are kept until permanent deletion, then removed from server.

**Q: Can I restore after 15 days?**  
A: No, requests are automatically and permanently deleted after 15 days.

**Q: Is there a limit to recycle bin size?**  
A: No limit, but old items are auto-deleted after 15 days.

**Q: Can customers see deleted requests?**  
A: No, only admins can access the recycle bin.

---

## 📄 Related Files

### Backend
- `backend/models/RepairRequest.js` - Model with isDeleted fields
- `backend/routes/repairRequests.js` - API endpoints
- `backend/cleanup-scheduler.js` - Automatic cleanup
- `backend/server.js` - Scheduler initialization
- `backend/package.json` - node-cron dependency

### Frontend
- `admin.html` - Recycle bin UI
- `js/admin.js` - Recycle bin logic
- `css/admin.css` - Recycle bin styles

---

**Last Updated**: May 7, 2026  
**Version**: 1.0  
**Status**: ✅ Fully Implemented

## 🎉 Summary

The Recycle Bin feature provides:
- ✅ **Safety**: 15-day grace period before permanent deletion
- ✅ **Convenience**: Easy restore with one click
- ✅ **Automation**: Automatic cleanup of old requests
- ✅ **Transparency**: Clear days remaining counter
- ✅ **Security**: Double confirmation for permanent actions

Never lose important repair requests by accident again! 🗑️✨
