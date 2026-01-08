# =============================================================================
# AUDITDNA MULTI-LINGUAL FINTECH CONTACT SYSTEM - AUTO INSTALLER
# Installs ContactCard component + Zadarma CRM backend
# =============================================================================

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  🔥 AUDITDNA MULTI-LINGUAL FINTECH CONTACT SYSTEM" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "Features:" -ForegroundColor White
Write-Host "  ✅ Instant Call (Click-to-Call via Zadarma)" -ForegroundColor Green
Write-Host "  ✅ WhatsApp Integration" -ForegroundColor Green
Write-Host "  ✅ SMS Messaging" -ForegroundColor Green
Write-Host "  ✅ Multi-lingual (English/Spanish)" -ForegroundColor Green
Write-Host "  ✅ Lead Capture & CRM" -ForegroundColor Green
Write-Host "  ✅ Call Recording" -ForegroundColor Green
Write-Host "  ✅ Real-time Notifications" -ForegroundColor Green
Write-Host ""

$projectRoot = "C:\AuditDNA\auditdna-realestate"
$utf8NoBOM = New-Object System.Text.UTF8Encoding $false

# =============================================================================
# CHECK IF FILES EXIST
# =============================================================================
Write-Host "Checking for required files..." -ForegroundColor Yellow

$requiredFiles = @(
    "ContactCard.jsx",
    "zadarma-server.js",
    "package.json"
)

$missingFiles = @()
foreach ($file in $requiredFiles) {
    if (-not (Test-Path $file)) {
        $missingFiles += $file
    }
}

if ($missingFiles.Count -gt 0) {
    Write-Host ""
    Write-Host "❌ Missing required files:" -ForegroundColor Red
    foreach ($file in $missingFiles) {
        Write-Host "   - $file" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "Please download all files before running installer!" -ForegroundColor Yellow
    Write-Host "Press any key to exit..." -ForegroundColor Yellow
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

Write-Host "✅ All required files found!" -ForegroundColor Green
Write-Host ""

# =============================================================================
# STEP 1: CREATE BACKEND DIRECTORY
# =============================================================================
Write-Host "STEP 1: Creating backend directory..." -ForegroundColor Yellow

$backendDir = "$projectRoot\backend"
New-Item -ItemType Directory -Path $backendDir -Force | Out-Null

Write-Host "✅ Backend directory created: $backendDir" -ForegroundColor Green
Write-Host ""

# =============================================================================
# STEP 2: COPY BACKEND FILES
# =============================================================================
Write-Host "STEP 2: Installing backend files..." -ForegroundColor Yellow

Copy-Item "zadarma-server.js" -Destination "$backendDir\zadarma-server.js" -Force
Copy-Item "package.json" -Destination "$backendDir\package.json" -Force

Write-Host "✅ Backend files installed!" -ForegroundColor Green
Write-Host ""

# =============================================================================
# STEP 3: INSTALL BACKEND DEPENDENCIES
# =============================================================================
Write-Host "STEP 3: Installing backend dependencies..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Gray

Push-Location $backendDir
try {
    npm install --silent
    Write-Host "✅ Backend dependencies installed!" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to install backend dependencies!" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Pop-Location
    exit 1
}
Pop-Location
Write-Host ""

# =============================================================================
# STEP 4: CREATE FRONTEND COMPONENT DIRECTORY
# =============================================================================
Write-Host "STEP 4: Creating frontend component directory..." -ForegroundColor Yellow

$componentDir = "$projectRoot\src\components\contact"
New-Item -ItemType Directory -Path $componentDir -Force | Out-Null

Write-Host "✅ Component directory created!" -ForegroundColor Green
Write-Host ""

# =============================================================================
# STEP 5: INSTALL FRONTEND COMPONENT
# =============================================================================
Write-Host "STEP 5: Installing ContactCard component..." -ForegroundColor Yellow

Copy-Item "ContactCard.jsx" -Destination "$componentDir\ContactCard.jsx" -Force

Write-Host "✅ ContactCard component installed!" -ForegroundColor Green
Write-Host ""

# =============================================================================
# STEP 6: UPDATE MEXICOREALESTATE.JSX
# =============================================================================
Write-Host "STEP 6: Updating MexicoRealEstate.jsx..." -ForegroundColor Yellow

$mexFile = "$projectRoot\src\pages\MexicoRealEstate.jsx"

if (Test-Path $mexFile) {
    $content = Get-Content $mexFile -Raw -Encoding UTF8
    
    # Add import if not exists
    if ($content -notmatch "import ContactCard") {
        $importLine = "import ContactCard from '../components/contact/ContactCard';`n"
        $content = $content -replace "(import React.*from 'react';)", "`$1`n$importLine"
        
        [System.IO.File]::WriteAllText($mexFile, $content, $utf8NoBOM)
        Write-Host "✅ Added ContactCard import to MexicoRealEstate.jsx" -ForegroundColor Green
    } else {
        Write-Host "✅ ContactCard already imported in MexicoRealEstate.jsx" -ForegroundColor Green
    }
} else {
    Write-Host "⚠️  MexicoRealEstate.jsx not found! Skipping..." -ForegroundColor Yellow
}
Write-Host ""

# =============================================================================
# STEP 7: UPDATE BAJALUXURYGUIDE.JSX
# =============================================================================
Write-Host "STEP 7: Updating BajaLuxuryGuide.jsx..." -ForegroundColor Yellow

$bajaFile = "$projectRoot\src\components\BajaLuxuryGuide.jsx"

if (Test-Path $bajaFile) {
    $content = Get-Content $bajaFile -Raw -Encoding UTF8
    
    # Add import if not exists
    if ($content -notmatch "import ContactCard") {
        $importLine = "import ContactCard from './contact/ContactCard';`n"
        $content = $content -replace "(import React.*from 'react';)", "`$1`n$importLine"
        
        [System.IO.File]::WriteAllText($bajaFile, $content, $utf8NoBOM)
        Write-Host "✅ Added ContactCard import to BajaLuxuryGuide.jsx" -ForegroundColor Green
    } else {
        Write-Host "✅ ContactCard already imported in BajaLuxuryGuide.jsx" -ForegroundColor Green
    }
} else {
    Write-Host "⚠️  BajaLuxuryGuide.jsx not found! Skipping..." -ForegroundColor Yellow
}
Write-Host ""

# =============================================================================
# INSTALLATION COMPLETE
# =============================================================================
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  ✅ INSTALLATION COMPLETE!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Write-Host "📁 Files Installed:" -ForegroundColor White
Write-Host "   Backend:" -ForegroundColor Cyan
Write-Host "     $backendDir\zadarma-server.js" -ForegroundColor Gray
Write-Host "     $backendDir\package.json" -ForegroundColor Gray
Write-Host ""
Write-Host "   Frontend:" -ForegroundColor Cyan
Write-Host "     $componentDir\ContactCard.jsx" -ForegroundColor Gray
Write-Host ""

Write-Host "🔑 Zadarma Configuration:" -ForegroundColor White
Write-Host "   API Key: a2aaea04d645d80e739c" -ForegroundColor Gray
Write-Host "   WhatsApp: +52-646-340-2686" -ForegroundColor Gray
Write-Host ""

Write-Host "🚀 Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Start Backend Server:" -ForegroundColor White
Write-Host "   cd $backendDir" -ForegroundColor Gray
Write-Host "   npm start" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Start Frontend (in new terminal):" -ForegroundColor White
Write-Host "   cd $projectRoot" -ForegroundColor Gray
Write-Host "   npm start" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Test Contact Card:" -ForegroundColor White
Write-Host "   - Go to any page (Properties/Team/Lifestyle)" -ForegroundColor Gray
Write-Host "   - Click 'Contact Us' button" -ForegroundColor Gray
Write-Host "   - Test Instant Call / WhatsApp / SMS" -ForegroundColor Gray
Write-Host ""
Write-Host "4. View CRM Dashboard:" -ForegroundColor White
Write-Host "   http://localhost:5000/api/crm/leads" -ForegroundColor Cyan
Write-Host "   http://localhost:5000/api/crm/metrics" -ForegroundColor Cyan
Write-Host ""

Write-Host "📚 Documentation:" -ForegroundColor White
Write-Host "   Read INSTALLATION_GUIDE.md for complete setup" -ForegroundColor Gray
Write-Host ""

Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Ask to start backend now
Write-Host "Would you like to start the backend server now? (Y/N): " -NoNewline -ForegroundColor Yellow
$response = Read-Host

if ($response -eq 'Y' -or $response -eq 'y') {
    Write-Host ""
    Write-Host "Starting backend server..." -ForegroundColor Green
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
    Write-Host ""
    
    Push-Location $backendDir
    npm start
    Pop-Location
} else {
    Write-Host ""
    Write-Host "Installation complete! Start the backend manually when ready." -ForegroundColor Green
    Write-Host ""
}
