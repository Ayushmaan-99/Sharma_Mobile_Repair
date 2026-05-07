@echo off
echo ========================================
echo   Create Admin User
echo ========================================
echo.

cd backend

echo Checking dependencies...
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Creating admin user...
echo.

node setup-admin.js

echo.
echo Press any key to exit...
pause > nul
