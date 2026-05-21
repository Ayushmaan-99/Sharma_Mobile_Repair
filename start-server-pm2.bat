@echo off
setlocal

cd /d "%~dp0"

set "PM2_CMD=pm2"
where pm2 >nul 2>&1
if errorlevel 1 set "PM2_CMD=%APPDATA%\npm\pm2.cmd"

if not exist "%PM2_CMD%" if "%PM2_CMD%" neq "pm2" (
    echo PM2 is not installed.
    echo Install it once with: npm install -g pm2
    exit /b 1
)

echo Starting Sharma Mobile Repair with PM2...
"%PM2_CMD%" start ecosystem.config.cjs --only sharma-mobile-repair
if errorlevel 1 exit /b 1

"%PM2_CMD%" save
"%PM2_CMD%" list

echo.
echo Server is managed by PM2 and will auto-restart if it crashes.
echo Website: http://localhost:3000
echo Admin:   http://localhost:3000/admin.html
echo API:     http://localhost:3000/api
echo.
echo Useful commands:
echo   pm2 logs sharma-mobile-repair
echo   pm2 restart sharma-mobile-repair
echo   pm2 stop sharma-mobile-repair

endlocal
