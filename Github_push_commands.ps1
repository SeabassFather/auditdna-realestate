# ================================================================================
#                    ENJOYBAJA.COM - GITHUB PUSH COMMANDS
#                         CM Products International
# ================================================================================

# ================================================================================
# STEP 1: SAVE FILES TO PROJECT
# ================================================================================

# Save these files BEFORE running git commands:

# FILE 1: BajaLuxuryGuide.jsx
# Download from Claude → Save to: C:\AuditDNA\auditdna-realestate\src\components\BajaLuxuryGuide.jsx

# FILE 2: EnjoyBaja_Login_Credentials.txt (optional - for reference)
# FILE 3: EnjoyBaja_File_Structure.txt (optional - for reference)


# ================================================================================
# STEP 2: POWERSHELL COMMANDS
# ================================================================================

# Navigate to project directory
cd C:\AuditDNA\auditdna-realestate

# Check current status
git status

# Stage all changes
git add .

# Commit with descriptive message
git commit -m "ADD: ADVERTISE tab to BajaLuxuryGuide - 6 tabs complete

CHANGES:
- Added ADVERTISE tab (6th tab) to Lifestyle Guide
- Tabs now: Guide | Magazine | Journal | Partners | Collection | ADVERTISE
- ADVERTISE tab embeds SelfServiceAdPortal component
- Bilingual support (EN: Advertise / ES: Anunciar)
- Updated imports for SelfServiceAdPortal
- No changes to existing functionality"

# Push to GitHub
git push origin main


# ================================================================================
# QUICK ONE-LINER (after saving files)
# ================================================================================

cd C:\AuditDNA\auditdna-realestate; git add .; git commit -m "ADD: ADVERTISE tab to BajaLuxuryGuide - 6 tabs complete"; git push origin main


# ================================================================================
# VERIFY DEPLOYMENT
# ================================================================================

# After push, check:
# 1. GitHub: github.com/[username]/auditdna-realestate → verify commit
# 2. Netlify: Check deploy status (auto-deploys on push)
# 3. Live site: www.enjoybaja.com/lifestyle → click ADVERTISE tab


# ================================================================================
# TROUBLESHOOTING
# ================================================================================

# If git push fails with authentication:
git config --global credential.helper manager

# If remote is not set:
git remote add origin https://github.com/[username]/auditdna-realestate.git

# If branch doesn't exist:
git branch -M main
git push -u origin main

# Force push (use with caution):
git push -f origin main


# ================================================================================
#                    CM PRODUCTS INTERNATIONAL | ENJOYBAJA.COM
# ================================================================================