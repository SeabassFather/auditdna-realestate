@echo off
title AUDITDNA FILE INVENTORY
color 0A
echo.
echo ============================================================
echo   AUDITDNA - FULL FILE INVENTORY
echo ============================================================
echo.

powershell -ExecutionPolicy Bypass -Command ^
"$out = 'C:\AuditDNA\INVENTORY.txt'; ^
'' | Out-File $out; ^
'======== BACKEND ROUTES ========' | Out-File $out -Append; ^
Get-ChildItem 'C:\AuditDNA\auditdna-realestate\backend\routes' -File 2>$null | ForEach-Object { '  ' + $_.Name + '  [' + [math]::Round($_.Length/1KB,1) + ' KB]' } | Out-File $out -Append; ^
'' | Out-File $out -Append; ^
'======== BACKEND ALL FILES (no node_modules) ========' | Out-File $out -Append; ^
Get-ChildItem 'C:\AuditDNA\auditdna-realestate\backend' -Recurse -File | Where-Object { $_.FullName -notlike '*node_modules*' } | ForEach-Object { '  ' + $_.FullName.Replace('C:\AuditDNA\auditdna-realestate\backend\','') + '  [' + [math]::Round($_.Length/1KB,1) + ' KB]' } | Out-File $out -Append; ^
'' | Out-File $out -Append; ^
'======== FULL C:\AuditDNA FOLDER TREE (no node_modules) ========' | Out-File $out -Append; ^
Get-ChildItem 'C:\AuditDNA' -Recurse | Where-Object { $_.FullName -notlike '*node_modules*' } | ForEach-Object { $_.FullName.Replace('C:\AuditDNA\','') + $(if (-not $_.PSIsContainer) { '  [' + [math]::Round($_.Length/1KB,1) + ' KB]' }) } | Out-File $out -Append; ^
'' | Out-File $out -Append; ^
'======== AUDIT JSX FILES ========' | Out-File $out -Append; ^
Get-ChildItem 'C:\AuditDNA' -Recurse -File | Where-Object { $_.FullName -notlike '*node_modules*' -and ($_.Name -like '*Audit*' -or $_.Name -like '*Recovery*' -or $_.Name -like '*audit*' -or $_.Name -like '*Brain*' -or $_.Name -like '*server*') } | ForEach-Object { '  ' + $_.FullName + '  [' + [math]::Round($_.Length/1KB,1) + ' KB]' } | Out-File $out -Append; ^
Write-Host 'DONE - Saved to C:\AuditDNA\INVENTORY.txt' -ForegroundColor Green"

echo.
echo ============================================================
echo   SAVED TO: C:\AuditDNA\INVENTORY.txt
echo ============================================================
echo.
echo Opening file now...
notepad C:\AuditDNA\INVENTORY.txt
echo.
echo Copy the contents of Notepad and paste to Claude!
echo.
pause