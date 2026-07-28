@echo off
setlocal
cd /d "%~dp0"
set "PORT=4174"
if exist "C:\Users\Glory\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" (
  start "Yohana's Kitchenette Server" /min "C:\Users\Glory\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" server.js
) else (
  start "Yohana's Kitchenette Server" /min node server.js
)
timeout /t 1 /nobreak >nul
start "Yohana's Kitchenette" http://localhost:4174/
