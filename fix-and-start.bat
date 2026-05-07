@echo off
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                                                              ║
echo ║         Sharma Mobile Repair - Quick Fix Script             ║
echo ║                                                              ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo This script will:
echo 1. Check if backend dependencies are installed
echo 2. Start the backend server
echo 3. Help you create admin user
echo.
pause
echo.

echo [1/3] Checking backend dependencies...
cd backend
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies!
        echo Please run: npm install
        pause
        exit /b 1
    )
    echo ✓ Dependencies installed successfully!
) else (
    echo ✓ Dependencies already installed
)
echo.

echo [2/3] Starting backend server...
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║  IMPORTANT: Keep this window open!                          ║
echo ║  The backend server must keep running.                      ║
echo ║                                                              ║
echo ║  To create admin user:                                      ║
echo ║  1. Open a NEW terminal                                     ║
echo ║  2. Run: cd backend                                         ║
echo ║  3. Run: node setup-admin.js                                ║
echo ║                                                              ║
echo ║  Or double-click: create-admin.bat                          ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo Starting server in 3 seconds...
timeout /t 3 /nobreak >nul
echo.

call npm start

pause
