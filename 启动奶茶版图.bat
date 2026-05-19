@echo off
title Milk Tea Map

cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found.
  echo Please install Node.js first, then double-click this launcher again.
  echo.
  pause
  exit /b 1
)

if exist "%~dp0关闭奶茶版图.bat" (
  call "%~dp0关闭奶茶版图.bat" --no-pause
  echo.
)

echo Starting Milk Tea Map...
echo The page will open automatically. If it does not, use the printed URL below.
echo.

set "OPEN_BROWSER=1"
node server.mjs

echo.
echo Server stopped.
pause
