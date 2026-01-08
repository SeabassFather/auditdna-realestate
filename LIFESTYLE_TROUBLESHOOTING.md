# HOW TO TEST LIFESTYLE SECTION

## STEP 1: Add test page to App.jsx

Open: src/App.jsx

Add this import at the top:
```javascript
import LifestyleTest from './components/LifestyleTest';
```

Then add the component somewhere in your JSX:
```javascript
<LifestyleTest />
```

## STEP 2: Restart dev server

IMPORTANT: You MUST restart the dev server after adding files to public/ folder!
```bash
# Stop server (Ctrl+C)
npm start
# or
npm run dev
```

## STEP 3: Check browser console

Open your app in browser, press F12, go to Console tab.
You should see:
- "Fetching lifestyle data..."
- "Response status: 200"
- "Loaded businesses: 90"

## STEP 4: If you see errors

### Error: "Failed to fetch" or "404"
- Files are in wrong location
- Dev server needs restart
- Check: public/lifestyle-data/all-businesses.json exists

### Error: "Unexpected token"
- JSON file is corrupted
- Re-run the PowerShell script to regenerate

### Nothing renders at all
- Import statement wrong
- Component not added to JSX
- Check browser console for errors

## STEP 5: Once test works

Replace LifestyleTest with LifestyleSection:
```javascript
import LifestyleSection from './components/LifestyleSection';

<LifestyleSection />
```

## Quick Fix Script

If nothing works, run this in PowerShell:
```powershell
# Check files exist
Get-ChildItem "C:\AuditDNA\auditdna-realestate\public\lifestyle-data\" -Recurse

# Verify JSON is valid
Get-Content "C:\AuditDNA\auditdna-realestate\public\lifestyle-data\all-businesses.json" | ConvertFrom-Json | Measure-Object
```
