const express = require('express');
const router = express.Router();

let properties = [
  { id: 1, title: 'Luxury Oceanfront Villa', city: 'Ensenada', region: 'Baja California Norte', price: 890000, beds: 5, baths: 4, sqft: 4200, status: 'approved', type: 'listing', uploadedBy: 'agent', views: 1204 }
];

router.get('/stats', (req, res) => {
  res.json({
    total:        properties.length,
    fsbo:         properties.filter(p => p.type === 'fsbo').length,
    agentUploads: properties.filter(p => p.uploadedBy === 'agent').length,
    pending:      properties.filter(p => p.status === 'pending').length,
    views:        properties.reduce((s, p) => s + (p.views || 0), 0),
  });
});

router.get('/', (req, res) => {
  res.json({ success: true, count: properties.length, properties });
});

router.post('/', (req, res) => {
  const property = { id: properties.length + 1, ...req.body };
  properties.push(property);
  res.status(201).json({ success: true, property });
});

module.exports = router;