@echo off
echo ========================================
echo   Sharma Mobile Repair - Backend Server
echo ========================================
echo.

cd backend

echo Checking dependencies...
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting backend server...
echo.
echo Backend will be available at: http://localhost:3000
echo Admin panel: Open admin.html in your browser
echo.
echo Press Ctrl+C to stop the server
echo.

call npm start
