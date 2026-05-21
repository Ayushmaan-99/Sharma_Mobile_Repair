@echo off
setlocal

set "PM2_CMD=pm2"
where pm2 >nul 2>&1
if errorlevel 1 set "PM2_CMD=%APPDATA%\npm\pm2.cmd"

if not exist "%PM2_CMD%" if "%PM2_CMD%" neq "pm2" (
    echo PM2 is not installed.
    exit /b 1
)

"%PM2_CMD%" stop sharma-mobile-repair
"%PM2_CMD%" save
"%PM2_CMD%" list

endlocal
