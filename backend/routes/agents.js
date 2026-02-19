const express = require('express');
const router = express.Router();

let agents = [];

router.get('/stats', (req, res) => {
  res.json({
    total:   agents.length,
    active:  agents.filter(a => a.status === 'active').length,
    pending: agents.filter(a => a.status === 'pending').length,
    inHouse: agents.filter(a => a.type === 'in-house').length,
  });
});

router.get('/', (req, res) => {
  res.json({ success: true, count: agents.length, agents });
});

router.post('/register', (req, res) => {
  const agent = { id: agents.length + 1, ...req.body, status: 'pending', createdAt: new Date() };
  agents.push(agent);
  res.json({ success: true, message: 'Agent registered', agent });
});

router.post('/login', (req, res) => {
  res.json({ success: true, token: 'mock-token-123' });
});

module.exports = router;