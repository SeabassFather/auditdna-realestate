# AuditDNA Frontend - Fresh Restart Script
# Clears all caches and restarts dev server

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AuditDNA Frontend Fresh Restart" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Stop any running React dev servers
Write-Host "`n[1/5] Stopping running Node processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Navigate to frontend directory (adjust path as needed)
$frontendPath = "C:\Users\Saul\auditdna-frontend"
if (Test-Path $frontendPath) {
    Set-Location $frontendPath
    Write-Host "      Working in: $frontendPath" -ForegroundColor Gray
} else {
    Write-Host "      Using current directory" -ForegroundColor Gray
}

# Clear node_modules cache
Write-Host "`n[2/5] Clearing node_modules cache..." -ForegroundColor Yellow
if (Test-Path "node_modules\.cache") {
    Remove-Item -Recurse -Force "node_modules\.cache"
    Write-Host "      Deleted node_modules\.cache" -ForegroundColor Green
}

# Clear React build cache
Write-Host "`n[3/5] Clearing build folder..." -ForegroundColor Yellow
if (Test-Path "build") {
    Remove-Item -Recurse -Force "build"
    Write-Host "      Deleted build folder" -ForegroundColor Green
}

# Clear .cache if exists
Write-Host "`n[4/5] Clearing .cache folder..." -ForegroundColor Yellow
if (Test-Path ".cache") {
    Remove-Item -Recurse -Force ".cache"
    Write-Host "      Deleted .cache folder" -ForegroundColor Green
}

# Clear browser cache reminder
Write-Host "`n[!] IMPORTANT: Also clear browser cache (Ctrl+Shift+R in Chrome)" -ForegroundColor Magenta

# Start fresh dev server
Write-Host "`n[5/5] Starting fresh dev server..." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Server starting on http://localhost:3000" -ForegroundColor Green
Write-Host "  Press Ctrl+C to stop" -ForegroundColor Gray
Write-Host "========================================`n" -ForegroundColor Cyan

npm start