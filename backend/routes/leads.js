const express = require('express');
const router = express.Router();

let leads = [];

router.post('/', (req, res) => {
  const lead = { id: leads.length + 1, ...req.body, createdAt: new Date() };
  leads.push(lead);
  res.status(201).json({ success: true, lead });
});

router.get('/', (req, res) => {
  res.json({ success: true, count: leads.length, leads });
});

module.exports = router;