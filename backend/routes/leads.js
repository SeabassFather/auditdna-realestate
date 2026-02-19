const express = require('express');
const router = express.Router();

let leads = [];

router.get('/stats', (req, res) => {
  const total = leads.length;
  const hot   = leads.filter(l => l.status === 'hot').length;
  const warm  = leads.filter(l => l.status === 'warm').length;
  const today = leads.filter(l => {
    if (!l.lastCall) return false;
    return new Date(l.lastCall).toDateString() === new Date().toDateString();
  }).length;
  const totalVal = leads.reduce((s, l) => s + (l.value || 0), 0);
  const closed   = leads.filter(l => l.status === 'closed').length;
  res.json({
    total,
    hot,
    warm,
    cold:      leads.filter(l => l.status === 'cold').length,
    callsToday: today,
    pipeline:  totalVal > 0 ? `$${(totalVal / 1000000).toFixed(1)}M` : '$0',
    convRate:  total > 0 ? `${Math.round((closed / total) * 100)}%` : '0%',
  });
});

router.get('/', (req, res) => {
  res.json({ success: true, count: leads.length, leads });
});

router.post('/', (req, res) => {
  const lead = { id: leads.length + 1, ...req.body, createdAt: new Date() };
  leads.push(lead);
  res.status(201).json({ success: true, lead });
});

module.exports = router;