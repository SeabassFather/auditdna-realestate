$ErrorActionPreference = "Stop"

# Kill any node processes
Get-Process node -ErrorAction SilentlyContinue | ForEach-Object { $_.Kill() }
Start-Sleep -Seconds 2

# Start backend MiniAPI (5050)
Start-Process powershell -ArgumentList 'cd C:\AuditDNA\MiniAPI; Remove-Item Env:PORT -ErrorAction SilentlyContinue; $env:PORT=5050; npm start' -WindowStyle Normal

# Start frontend (3000)
Start-Process powershell -ArgumentList 'cd C:\AuditDNA\AuditDNA_UI_Clean; npm install; npm run dev' -WindowStyle Normal

# Open browser
Start-Process "http://localhost:3000"
