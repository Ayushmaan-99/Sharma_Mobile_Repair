@echo off
echo ============================================
echo    Migrate Existing Repair Requests
echo    Sharma Mobile Repair
echo ============================================
echo.
echo This will add isDeleted and deletedAt fields
echo to all existing repair requests in the database.
echo.
echo Press any key to continue or Ctrl+C to cancel...
pause > nul

cd backend
node migrate-existing-requests.js

echo.
echo Press any key to exit...
pause > nul
