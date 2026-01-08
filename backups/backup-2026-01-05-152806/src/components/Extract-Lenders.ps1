# PowerShell script to extract lenders from PDF using Node.js
# Make sure pdf-parse is installed: npm i pdf-parse

$PdfPath = "Lenders_List_Everwise.pdf"
$NodeScript = "parse-lenders.js"
$ReactPublic = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend\public\lenders.json" # Edit if needed

Write-Host "Extracting lenders from $PdfPath ..."
node $NodeScript $PdfPath lenders.json

if (Test-Path "lenders.json") {
    Write-Host "Copying lenders.json to React CRA public directory..."
    Copy-Item -Path "lenders.json" -Destination $ReactPublic -Force
    Write-Host "Done! lenders.json now available for your CRA frontend."
} else {
    Write-Error "lenders.json not generated!"
}