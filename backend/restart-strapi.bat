@echo off
echo ================================================
echo Stopping Strapi and Cleaning Build
echo ================================================

REM Kill all node processes
echo Stopping all Node processes...
taskkill /F /IM node.exe 2>nul

timeout /t 2 /nobreak >nul

echo.
echo Cleaning cache and build directories...
if exist .cache rmdir /s /q .cache
if exist build rmdir /s /q build
if exist .tmp rmdir /s /q .tmp

echo.
echo ================================================
echo Rebuilding Strapi...
echo ================================================
call npm run build

echo.
echo ================================================
echo Starting Strapi in Development Mode...
echo ================================================
call npm run develop

pause
