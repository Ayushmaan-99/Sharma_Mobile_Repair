@echo off
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                                                              ║
echo ║         Sharma Mobile Repair - Stop Server (PM2)            ║
echo ║                                                              ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

cd backend

echo Stopping server...
pm2 stop sharma-mobile-repair
pm2 save

echo.
echo ✓ Server stopped successfully!
echo.
pm2 list
echo.
echo To start again: Double-click start-server-pm2.bat
echo.
pause
