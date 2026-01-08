const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
  res.json({ success: true, message: 'Agent registered' });
});

router.post('/login', (req, res) => {
  res.json({ success: true, token: 'mock-token-123' });
});

module.exports = router;