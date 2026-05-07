@echo off
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                                                              ║
echo ║         Sharma Mobile Repair - Start Server with PM2        ║
echo ║                                                              ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

cd backend

echo Checking if server is already running...
pm2 describe sharma-mobile-repair >nul 2>&1

if %errorlevel% equ 0 (
    echo.
    echo ✓ Server is already running!
    echo.
    pm2 list
    echo.
    echo Server Status: ONLINE
    echo.
    echo To view logs: pm2 logs sharma-mobile-repair
    echo To stop: pm2 stop sharma-mobile-repair
    echo To restart: pm2 restart sharma-mobile-repair
) else (
    echo.
    echo Starting server with PM2...
    pm2 start server.js --name sharma-mobile-repair
    pm2 save
    echo.
    echo ✓ Server started successfully!
    echo.
    pm2 list
    echo.
    echo Server is now running in the background!
    echo It will auto-restart if it crashes.
    echo.
    echo Useful commands:
    echo   pm2 list                      - View all processes
    echo   pm2 logs sharma-mobile-repair - View logs
    echo   pm2 stop sharma-mobile-repair - Stop server
    echo   pm2 restart sharma-mobile-repair - Restart server
)

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo Your server is running at: http://localhost:3000
echo Admin panel: http://localhost:3000/admin.html
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
pause
