$ErrorActionPreference = "SilentlyContinue"

Clear-Host
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AUDITDNA SERVER RESTART SCRIPT" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Kill any existing processes on ports 3000 and 5000
Write-Host "Killing existing processes..." -ForegroundColor Yellow

$port3000 = netstat -ano | findstr ":3000" | ForEach-Object { ($_ -split '\s+')[-1] } | Sort-Object -Unique
$port5000 = netstat -ano | findstr ":5000" | ForEach-Object { ($_ -split '\s+')[-1] } | Sort-Object -Unique

foreach ($pid in $port3000) {
    if ($pid -match '^\d+$') {
        taskkill /PID $pid /F 2>$null
        Write-Host "  Killed process on port 3000 (PID: $pid)" -ForegroundColor Gray
    }
}

foreach ($pid in $port5000) {
    if ($pid -match '^\d+$') {
        taskkill /PID $pid /F 2>$null
        Write-Host "  Killed process on port 5000 (PID: $pid)" -ForegroundColor Gray
    }
}

Start-Sleep -Seconds 2

Write-Host ""
Write-Host "Starting Backend Server..." -ForegroundColor Yellow
Write-Host ""

# Start Backend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd C:\AuditDNA\auditdna-realestate\backend; Write-Host 'BACKEND SERVER' -ForegroundColor Green; npm start"

Start-Sleep -Seconds 3

Write-Host "Starting Frontend Server..." -ForegroundColor Yellow
Write-Host ""

# Start Frontend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd C:\AuditDNA\auditdna-realestate; Write-Host 'FRONTEND SERVER' -ForegroundColor Cyan; npm start"

Start-Sleep -Seconds 2

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  SERVERS STARTED!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Backend:  http://localhost:5000" -ForegroundColor White
Write-Host "  Frontend: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "  Two new PowerShell windows opened." -ForegroundColor Gray
Write-Host "  Keep them open to keep servers running." -ForegroundColor Gray
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Open browser after short delay
Start-Sleep -Seconds 5
Start-Process "http://localhost:3000"

Write-Host "Browser opened to localhost:3000" -ForegroundColor Green
Write-Host ""
Read-Host "Press Enter to close this window"