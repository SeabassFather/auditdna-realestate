$ErrorActionPreference = "Stop"
$projectRoot = "C:\AuditDNA\auditdna-realestate"

Write-Host ""
Write-Host "🏌️ INSTALLING PEBBLE BEACH LUXURY GUIDE..." -ForegroundColor Yellow
Write-Host ""

# Copy component
Copy-Item "PEBBLE_BEACH_LUXURY.jsx" -Destination "$projectRoot\src\components\BajaLuxuryGuide.jsx" -Force

Write-Host "✅ INSTALLED!" -ForegroundColor Green
Write-Host ""
Write-Host "WHAT YOU GOT:" -ForegroundColor Cyan
Write-Host "  🏌️ Pebble Beach luxury aesthetic" -ForegroundColor Gray
Write-Host "  🗺️ Google Maps integration" -ForegroundColor Gray
Write-Host "  📅 2026 Events Calendar" -ForegroundColor Gray
Write-Host "  💎 Business listing tiers" -ForegroundColor Gray
Write-Host "  🎨 Visual estate cards (not accordions!)" -ForegroundColor Gray
Write-Host "  🍷 Premium typography & colors" -ForegroundColor Gray
Write-Host ""
Write-Host "🔄 RESTART: npm start then Ctrl+Shift+R" -ForegroundColor Yellow