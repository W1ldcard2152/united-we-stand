@echo off
REM United We Stand CAC - Quick Start Script for Windows
REM This script helps you get the development environment up and running quickly

echo 🚀 Starting United We Stand CAC Development Environment
echo ==================================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js (v14 or higher) and try again.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js found: %NODE_VERSION%

REM Check if npm is installed
npm --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm is not installed. Please install npm and try again.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm found: %NPM_VERSION%

REM Install backend dependencies
echo.
echo 📦 Installing backend dependencies...
cd backend
if not exist "node_modules" (
    npm install
    if %ERRORLEVEL% EQU 0 (
        echo ✅ Backend dependencies installed successfully
    ) else (
        echo ❌ Failed to install backend dependencies
        pause
        exit /b 1
    )
) else (
    echo ✅ Backend dependencies already installed
)

REM Install frontend dependencies
echo.
echo 📦 Installing frontend dependencies...
cd ..\frontend
if not exist "node_modules" (
    npm install
    if %ERRORLEVEL% EQU 0 (
        echo ✅ Frontend dependencies installed successfully
    ) else (
        echo ❌ Failed to install frontend dependencies
        pause
        exit /b 1
    )
) else (
    echo ✅ Frontend dependencies already installed
)

echo.
echo 🎉 Setup complete!
echo.
echo To start the development servers:
echo.
echo 1. Backend (in one terminal):
echo    cd backend
echo    npm start
echo.
echo 2. Frontend (in another terminal):
echo    cd frontend
echo    npm start
echo.
echo The backend will run on http://localhost:5000
echo The frontend will run on http://localhost:3000
echo.
echo Happy coding! 🎊
echo.
pause
