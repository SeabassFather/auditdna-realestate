# ============================================================
# COMPLETE DEPLOYMENT - ALL FILES + YOUR CREDENTIALS
# Email: saul@enjoybaja.com | Password: Admin! | PIN: 060905
# ============================================================

$ErrorActionPreference = "Stop"

Write-Host "`n" -NoNewline
Write-Host "████████████████████████████████████████████████████████████████" -ForegroundColor Cyan
Write-Host "█                                                              █" -ForegroundColor Cyan
Write-Host "█   AUDITDNA COMPLETE DEPLOYMENT                              █" -ForegroundColor Cyan
Write-Host "█   WITH YOUR CREDENTIALS                                      █" -ForegroundColor Cyan
Write-Host "█                                                              █" -ForegroundColor Cyan
Write-Host "████████████████████████████████████████████████████████████████" -ForegroundColor Cyan
Write-Host "`n"

cd C:\AuditDNA\auditdna-realestate

# Kill servers
Write-Host "🔄 Stopping servers..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Write-Host "✓ Servers stopped`n" -ForegroundColor Green

# Create pages directory
if (!(Test-Path "src\pages")) {
    New-Item -ItemType Directory -Path "src\pages" -Force | Out-Null
    Write-Host "✓ Created src\pages`n" -ForegroundColor Green
}

# Deploy App.js with YOUR credentials
Write-Host "📋 Deploying App.js with YOUR credentials..." -ForegroundColor Yellow
Copy-Item ".\App_WITH_YOUR_CREDENTIALS.js" ".\src\App.js" -Force
Write-Host "✓ App.js deployed`n" -ForegroundColor Green

# Deploy all AuditDNA components
Write-Host "📋 Deploying AuditDNA components..." -ForegroundColor Yellow
Copy-Item ".\AuditDNADirect_COMPLETE.jsx" ".\src\pages\AuditDNADirect.jsx" -Force
Copy-Item ".\AuditRecovery.jsx" ".\src\pages\AuditRecovery.jsx" -Force
Copy-Item ".\ProfessionalNetwork.jsx" ".\src\pages\ProfessionalNetwork.jsx" -Force
Copy-Item ".\MonitoringService.jsx" ".\src\pages\MonitoringService.jsx" -Force
Copy-Item ".\SecurityVerification.jsx" ".\src\pages\SecurityVerification.jsx" -Force
Write-Host "✓ All components deployed`n" -ForegroundColor Green

# Clear cache
Write-Host "🧹 Clearing cache..." -ForegroundColor Yellow
npm cache clean --force 2>&1 | Out-Null
Write-Host "✓ Cache cleared`n" -ForegroundColor Green

Write-Host "████████████████████████████████████████████████████████████████" -ForegroundColor Green
Write-Host "█                                                              █" -ForegroundColor Green
Write-Host "█                  ✅ DEPLOYMENT COMPLETE! ✅                   █" -ForegroundColor Green
Write-Host "█                                                              █" -ForegroundColor Green
Write-Host "████████████████████████████████████████████████████████████████" -ForegroundColor Green
Write-Host "`n"

Write-Host "🔐 YOUR CREDENTIALS:" -ForegroundColor Cyan
Write-Host "   📧 Email: saul@enjoybaja.com" -ForegroundColor White
Write-Host "   🔑 Password: Admin!" -ForegroundColor White
Write-Host "   📌 Owner PIN: 060905" -ForegroundColor White
Write-Host "`n"

Write-Host "📦 DEPLOYED:" -ForegroundColor Cyan
Write-Host "   ✓ App.js with YOUR credentials" -ForegroundColor White
Write-Host "   ✓ AuditDNADirect (Full system)" -ForegroundColor White
Write-Host "   ✓ AuditRecovery (35%/39% pathways)" -ForegroundColor White
Write-Host "   ✓ ProfessionalNetwork (15% commission)" -ForegroundColor White
Write-Host "   ✓ MonitoringService ($24.99/mo)" -ForegroundColor White
Write-Host "   ✓ SecurityVerification (7-layer)" -ForegroundColor White
Write-Host "`n"

Write-Host "🚀 STARTING SERVER IN NEW WINDOW...`n" -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm start"

Write-Host "✅ SERVER STARTING!" -ForegroundColor Green
Write-Host "`n"
Write-Host "🌐 NEXT STEPS:" -ForegroundColor Cyan
Write-Host "   1. Wait 30-60 sec for compilation" -ForegroundColor White
Write-Host "   2. Open: http://localhost:3000" -ForegroundColor White
Write-Host "   3. Press: CTRL+F5" -ForegroundColor White
Write-Host "   4. Login with: saul@enjoybaja.com / Admin!" -ForegroundColor White
Write-Host "   5. PIN when prompted: 060905" -ForegroundColor White
Write-Host "`n"

Write-Host "████████████████████████████████████████████████████████████████" -ForegroundColor Green
Write-Host "█              💰 LET'S MAKE SOME MONEY! 💰                   █" -ForegroundColor Green
Write-Host "████████████████████████████████████████████████████████████████" -ForegroundColor Green
Write-Host "`n"