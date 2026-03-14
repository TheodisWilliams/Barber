@echo off
echo ========================================================
echo COMPLETE STRAPI RESET - This will delete your database!
echo ========================================================
echo.
echo This will:
echo - Stop Strapi
echo - Delete the database (you'll lose all data)
echo - Clear cache and build
echo - Rebuild and restart Strapi
echo - You'll need to create a new admin account
echo.
pause

echo.
echo Stopping Strapi...
taskkill /F /IM node.exe 2>nul

timeout /t 3 /nobreak >nul

echo.
echo Deleting database...
if exist .tmp\data.db del /f .tmp\data.db
if exist .tmp rmdir /s /q .tmp

echo Clearing cache and build...
if exist .cache rmdir /s /q .cache
if exist build rmdir /s /q build

echo.
echo Rebuilding Strapi...
call npm run build

echo.
echo Starting Strapi...
echo After it starts, create a new admin account
echo Then check Settings - Roles - Authenticated
echo.
call npm run develop

pause
