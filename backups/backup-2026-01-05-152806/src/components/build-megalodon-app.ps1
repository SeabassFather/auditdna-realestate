# ========================================
# 🦈 MEGALODON APP.JS BUILDER
# ========================================

$basePath = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend\src"
$modulesPath = "$basePath\modules"
$outputPath = "$basePath\App.js"

Write-Host "🦈 MEGALODON APP.JS BUILDER STARTING..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Step 1: Scan all modules
Write-Host "`n📦 Step 1: Scanning modules..." -ForegroundColor Yellow
$modules = Get-ChildItem -Path $modulesPath -Directory
Write-Host "✅ Found $($modules.Count) modules!" -ForegroundColor Green

# Step 2: Extract routes from each module
Write-Host "`n🔍 Step 2: Extracting routes..." -ForegroundColor Yellow
$allRoutes = @()
$imports = @()
$importCounter = 0

foreach ($module in $modules) {
    $moduleName = $module.Name
    Write-Host "  Scanning:  $moduleName" -ForegroundColor Gray
    
    # Look for route files (routes.js, index.js, or *Routes.js)
    $routeFiles = Get-ChildItem -Path $module.FullName -Recurse -Include "*routes.js", "*Routes.js", "index.js", "*.md" -ErrorAction SilentlyContinue
    
    # Look for page components
    $pageFiles = Get-ChildItem -Path $module.FullName -Recurse -Include "*.jsx", "*.js" -Exclude "*.test.js", "*.spec.js" -ErrorAction SilentlyContinue
    
    foreach ($file in $pageFiles) {
        $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
        
        # Check if file contains route definitions or is a page component
        if ($content -match "Route|path:|<Route|export default|function.*Page|const.*Page") {
            $relativePath = $file. FullName.Replace($basePath + "\", "").Replace("\", "/")
            $componentName = $file.BaseName -replace "[^a-zA-Z0-9]", ""
            
            # Skip if already added
            if ($imports -notcontains $componentName) {
                $imports += "import $componentName from '. /$($relativePath. Replace('. js', '').Replace('.jsx', ''))';"
                
                # Try to extract path from content
                if ($content -match "path:\s*[`"']([^`"']+)[`"']") {
                    $routePath = $matches[1]
                } else {
                    # Generate path from module and file name
                    $routePath = "/$($moduleName. ToLower())/$($file.BaseName.ToLower() -replace 'page|component', '')"
                }
                
                $allRoutes += @{
                    Module = $moduleName
                    Component = $componentName
                    Path = $routePath
                    File = $relativePath
                }
                
                $importCounter++
            }
        }
    }
}

Write-Host "✅ Found $importCounter route components!" -ForegroundColor Green

# Step 3: Read existing App.js structure (if exists)
Write-Host "`n📄 Step 3: Checking existing App.js..." -ForegroundColor Yellow
$hasExistingApp = Test-Path $outputPath
if ($hasExistingApp) {
    Write-Host "✅ Found existing App.js - will create backup" -ForegroundColor Green
    Copy-Item $outputPath "$outputPath.backup. $(Get-Date -Format 'yyyyMMdd-HHmmss')" -Force
} else {
    Write-Host "⚠️  No existing App.js - creating from scratch" -ForegroundColor Yellow
}

# Step 4: Build the MEGALODON App.js
Write-Host "`n🦈 Step 4: Building MEGALODON App.js..." -ForegroundColor Yellow

$appJsContent = @"
// ========================================
// 🦈 MEGALODON APP.JS
// Auto-generated:  $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
// Total Routes: $importCounter
// Total Modules: $($modules.Count)
// ========================================

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// ========================================
// 🎨 CORE COMPONENTS
// ========================================
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import PrivateRoute from './components/PrivateRoute';

// ========================================
// 📦 MODULE IMPORTS
// ========================================
$($imports -join "`n")

// ========================================
// 🦈 MEGALODON APP COMPONENT
// ========================================
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <Router>
          <Layout>
            <Routes>
              {/* ========================================
                  🏠 HOME & PUBLIC ROUTES
                  ======================================== */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* ========================================
                  📦 MODULE ROUTES
                  ======================================== */}
"@

# Group routes by module
$groupedRoutes = $allRoutes | Group-Object -Property Module

foreach ($group in $groupedRoutes) {
    $appJsContent += "`n              {/* $($group.Name. ToUpper()) MODULE */}`n"
    
    foreach ($route in $group.Group) {
        $appJsContent += "              <Route path=`"$($route.Path)`" element={<$($route.Component) />} />`n"
    }
}

$appJsContent += @"

              {/* ========================================
                  🚫 404 NOT FOUND
                  ======================================== */}
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Layout>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;

// ========================================
// 📋 ROUTE MANIFEST
// ========================================
// Total Routes: $importCounter
// Modules: $($modules.Count)
// Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
// ========================================
"@

# Step 5: Write the file
Write-Host "`n💾 Step 5: Writing App.js..." -ForegroundColor Yellow
Set-Content -Path $outputPath -Value $appJsContent -Encoding UTF8
Write-Host "✅ App.js created at:  $outputPath" -ForegroundColor Green

# Step 6: Create route manifest
Write-Host "`n📋 Step 6: Creating route manifest..." -ForegroundColor Yellow
$manifestPath = "$basePath\route-manifest.json"
$manifest = @{
    generated = Get-Date -Format 'yyyy-MM-dd HH:mm: ss'
    totalRoutes = $importCounter
    totalModules = $modules.Count
    modules = @{}
}

foreach ($group in $groupedRoutes) {
    $manifest.modules[$group.Name] = @{
        routes = $group.Group | ForEach-Object { 
            @{
                path = $_.Path
                component = $_.Component
                file = $_.File
            }
        }
    }
}

$manifest | ConvertTo-Json -Depth 10 | Set-Content -Path $manifestPath -Encoding UTF8
Write-Host "✅ Route manifest created:  $manifestPath" -ForegroundColor Green

# Step 7: Summary
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "🦈 MEGALODON APP. JS BUILD COMPLETE!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "📦 Modules scanned: $($modules.Count)" -ForegroundColor White
Write-Host "🛣️  Routes created: $importCounter" -ForegroundColor White
Write-Host "📄 App.js: $outputPath" -ForegroundColor White
Write-Host "📋 Manifest: $manifestPath" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "`n🎯 NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Review App.js for any missing imports" -ForegroundColor White
Write-Host "2. Create missing components (Layout, ErrorBoundary, PrivateRoute)" -ForegroundColor White
Write-Host "3. Run: npm install react-router-dom @mui/material" -ForegroundColor White
Write-Host "4. Run: npm start" -ForegroundColor White
Write-Host "`n🚀 LET'S GOOOO!" -ForegroundColor Green