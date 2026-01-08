# LIFESTYLE SECTION - INTEGRATION GUIDE

## Files Created:
 public/lifestyle-data/*.json (5 files)
 src/components/LifestyleSection.jsx

## How to Use:

### Option 1: Add to existing page
```javascript
import LifestyleSection from './components/LifestyleSection';

function PropertyPage() {
  return (
    <div>
      {/* Your existing content */}
      <LifestyleSection />
    </div>
  );
}
```

### Option 2: Create dedicated lifestyle page
```javascript
// src/pages/LifestylePage.jsx
import LifestyleSection from '../components/LifestyleSection';

function LifestylePage() {
  return <LifestyleSection />;
}

export default LifestylePage;
```

## Data Structure:
Each business has:
- id, name, type, category
- lat, lng (GPS coordinates)
- city, phone, website
- description, price, fee
- reservation (boolean)
- michelin (0 or 1+)

## Customization:
- Edit colors in component (currently soft cream/green)
- Add Google Maps integration
- Add photo galleries
- Add contact forms

## Next Steps:
1. Import component where needed
2. Style to match your brand
3. Add more businesses (edit JSON files)
4. Consider premium tier badges

## Premium Tier Ideas:
- Featured badge on card
- Larger card size
- Top of list placement
- "Contact Us" button
- Photo gallery
